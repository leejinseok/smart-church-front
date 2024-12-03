import "./VideosEditModal.scss";

import { useEffect, useState } from "react";
import { ChurchVideos } from "../../../../../type/homepage/homepage-type-a";
import { loadScript } from "../../../../../util/script-utils";
import TrashIcon from "../../../../../components/Icon/TrashIcon";
import {
  getChurchAdminAccessTokenCookie,
  getCookie,
  getHomepageUuidCookie,
} from "../../../../../util/cookie-utils";
import Toggle from "../../../Toggle/Toggle";
import { homepageTypeAApiRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-api-repository";
import EditModalWrapper from "../../../Modal/EditModalWrapper";
import ApplyButton from "../../../../../components/common/ApplyButton";
import { authApiRepository } from "../../../../../repository/smart-church/smart-church-auth-api-repository";

const videoOriginalWidth = 610;
const videoOriginalHeight = 380;
const videoAspectRatio = videoOriginalHeight / videoOriginalWidth;

export default function VideosEditModal({
  hide,
  videos,
  updateVideos,
}: {
  hide: () => void;
  videos: ChurchVideos;
  updateVideos: (videos: ChurchVideos) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [videosState, setVideosState] = useState<ChurchVideos>({ ...videos });
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    setVideosState({ ...videos });
  }, [videos]);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    const callback = () => {
      const resetIframe = (iframeElementId: string) => {
        const iframe = document.getElementById(iframeElementId);
        if (!iframe) {
          return;
        }

        const parentElement = iframe.parentElement;
        if (!parentElement) {
          return;
        }
        parentElement.removeChild(iframe);

        const newIframe = document.createElement("div");
        newIframe.id = iframeElementId;
        newIframe.classList.add("church-vedio-container");
        parentElement.appendChild(newIframe);
      };

      let videoIndex = 0;
      for (const item of videosState.page.data) {
        const url = item.url;
        const videoId = url.split("v=")[1];

        const loadingYoutubeIframe = (videoIndex: number) => {
          const iframeElementId = `church-video-in-edit-modal-${videoIndex}`;
          resetIframe(iframeElementId);

          YT.ready(() => {
            new YT.Player(iframeElementId, {
              height: videoOriginalHeight,
              width: videoOriginalWidth,
              videoId,
              playerVars: {},
            });
          });
        };

        loadingYoutubeIframe(videoIndex);
        videoIndex++;
      }
    };

    if (typeof YT === "undefined" && mounted) {
      loadScript("https://www.youtube.com/iframe_api", callback);
    } else if (typeof YT === "object") {
      callback();
    }
  }, [mounted, videosState.page]);

  useEffect(() => {
    if (typeof YT === "undefined") {
      return;
    }

    if (!videoUrl) {
      return;
    }

    const newVideoContainer = document.querySelector("#new-video-container");
    const newVideoRemovedElement =
      newVideoContainer?.querySelector("#new-video");
    newVideoRemovedElement?.remove();

    const newVideoElement = document.createElement("div");
    newVideoElement.id = "new-video";
    newVideoContainer?.appendChild(newVideoElement);

    const videoId = videoUrl.split("v=")[1];
    YT.ready(() => {
      new YT.Player(`new-video`, {
        height: videoOriginalHeight,
        width: videoOriginalWidth,
        videoId,
        playerVars: {},
      });
    });
  }, [videoUrl]);

  const removeVideo = (videoIndex: number) => {
    if (!videosState?.page.data) {
      return;
    }

    const oldData = [...videosState.page.data];
    oldData.splice(videoIndex, 1);

    setVideosState((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        page: {
          ...prev.page,
          data: [...oldData],
        },
      };
    });

    setVideoUrl("");
  };

  const addVideo = () => {
    setVideosState((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        page: {
          ...prev.page,
          data: [
            ...prev.page.data,
            {
              order: 0,
              url: videoUrl,
            },
          ],
        },
      };
    });
  };

  const handleChangeVideoUrl = (value: string, index: number) => {
    const data = videosState?.page.data;
    if (!data) {
      return;
    }

    const newData = [...data];
    newData[index].url = value;

    setVideosState((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        page: {
          ...prev?.page,
          data: [...newData],
        },
      };
    });
  };

  const handleSubmit = async () => {
    if (!videosState) {
      return;
    }
    updateVideos(videosState);

    const homepageUuid = getHomepageUuidCookie();
    if (!homepageUuid) {
      return;
    }

    const churchAdminAccessToken = getChurchAdminAccessTokenCookie();
    if (churchAdminAccessToken) {
      const session = await authApiRepository.session(churchAdminAccessToken);
      await homepageTypeAApiRepository.updateHomepage(
        homepageUuid,
        session.uuid || "",
        {
          videos: videosState,
        },
      );
    }

    hide();
  };

  return (
    <EditModalWrapper
      id="church-videos-edit-modal"
      className="modal-container edit-modal"
      onClick={hide}
    >
      <div className="modal__header">
        <h3 className="font-size-l font-weight-bold">교회영상 편집</h3>
        <p>
          교회를 대표할 수 있는 영상 한두가지를 추가해보세요 (설교영상,
          소개영상, 행사영상 ...)
        </p>
      </div>

      <div className="modal__body">
        <div className="form-group">
          <p className="font-weight-bold font-size-m form-group__header">
            제목
          </p>
          <input
            type="text"
            className="font-size-m no-border"
            value={videosState.title}
            onChange={(e) => {
              if (videosState) {
                setVideosState((prev) => {
                  if (!prev) {
                    return;
                  }

                  return { ...prev, title: e.target.value };
                });
              }
            }}
          />
        </div>
        <div className="form-group">
          <p className="font-weight-bold font-size-m form-group__header">
            노출여부
          </p>
          <Toggle
            isActive={videosState.visible}
            onClick={() => {
              setVideosState((prev) => {
                return {
                  ...prev,
                  visible: !prev.visible,
                };
              });
            }}
          />
        </div>
        <div className="form-group church-videos">
          <p className="font-weight-bold font-size-m form-group__header">
            항목
          </p>
          <ul className="church-videos-in-edit-modal width-100">
            {videosState?.page.data.map((video, videoIndex) => {
              return (
                <li key={videoIndex}>
                  <div className="church-video-iframe-container">
                    <div
                      id={`church-video-in-edit-modal-${videoIndex}`}
                      className="church-vedio-container"
                    ></div>
                  </div>

                  <div style={{ marginBottom: 6 }}>
                    <input
                      type="text"
                      value={video.url || ""}
                      onChange={(e) =>
                        handleChangeVideoUrl(e.target.value, videoIndex)
                      }
                      className="width-100 font-size-l input-underline"
                    />
                  </div>
                  <div>
                    <button
                      className="button-4 width-100 d-flex align-items-center justify-content-center"
                      onClick={() => removeVideo(videoIndex)}
                    >
                      삭제 <TrashIcon maxWidth={16} fill="#888" />
                    </button>
                  </div>
                </li>
              );
            })}

            {videosState?.page && videosState?.page.data.length < 2 && (
              <li>
                <div style={{ marginBottom: 6 }}>
                  <div id="new-video-container">
                    <div id="new-video"></div>
                  </div>
                </div>
                <div className="d-flex" style={{ gap: 6 }}>
                  <div style={{ marginBottom: 6, flex: 1 }}>
                    <input
                      type="text"
                      value={videoUrl}
                      className="width-100 font-size-l input-underline"
                      placeholder="유튜브 링크를 입력해주세요"
                      onChange={(e) => setVideoUrl(e.target.value)}
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="button-4" onClick={() => addVideo()}>
                      추가
                    </button>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="modal__footer text-align-right">
        <ApplyButton handleClick={handleSubmit} />
      </div>
    </EditModalWrapper>
  );
}
