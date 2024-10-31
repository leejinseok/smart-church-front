import "./VideosEditModal.scss";

import { useEffect, useState } from "react";
import {
  ChurchVideo,
  ChurchVideos,
} from "../../../../../type/homepage/homepage-type-a";
import { loadScript } from "../../../../../util/script-utils";

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
  updateVideos: (videos: ChurchVideo[]) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [videosState, setVideosState] = useState<ChurchVideos>();

  useEffect(() => {
    setVideosState(videos);
  }, [videos]);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    const callback = () => {
      if (!videosState) {
        return;
      }

      let videoIndex = 0;
      for (const item of videosState.page.data) {
        const url = item.url;
        const videoId = url.split("v=")[1];

        const loadingYoutubeIframe = (videoIndex: number) => {
          YT.ready(() => {
            new YT.Player(`church-video-in-edit-modal-${videoIndex}`, {
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
    } else {
      callback();
    }
  }, [mounted, videosState]);
  return (
    <div
      id="church-videos-edit-modal"
      className="modal-container edit-modal"
      onClick={hide}
    >
      <div className="modal__inner">
        <div className="modal__box" onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">
            <h3 className="font-size-m font-weight-bold">교회영상 편집</h3>
            <p>
              교회를 대표할 수 있는 영상 한두가지를 추가해보세요 (설교영상,
              소개영상, 행사영상 ...)
            </p>
          </div>

          <div className="modal__body">
            <div className="form-group">
              <p
                className="font-weight-bold font-size-m"
                style={{ marginBottom: 10 }}
              >
                제목
              </p>
              <input
                type="text"
                className="font-size-m no-border"
                value={videosState?.title}
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
            <div className="form-group church-videos">
              <ul className="church-videos-in-edit-modal">
                {videosState?.page.data.map((video, videoIndex) => {
                  return (
                    <li key={videoIndex}>
                      <div
                        id={`church-video-in-edit-modal-${videoIndex}`}
                        className="church-vedio-container"
                      ></div>

                      <div style={{}}>
                        <input
                          type="text"
                          value={video.url}
                          className="width-100"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="form-group">
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
