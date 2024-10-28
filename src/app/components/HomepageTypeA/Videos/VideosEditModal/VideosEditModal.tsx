import "./VideosEditModal.scss";

import { useEffect, useState } from "react";
import { ChurchVideo } from "../../../../../type/homepage/homepage-type-a";
import { loadScript } from "../../../../../util/script-utils";

const videoOriginalWidth = 610 / 2;
const videoOriginalHeight = 380 / 2;
const videoAspectRatio = videoOriginalHeight / videoOriginalWidth;

export default function VideosEditModal({
  hide,
  videos,
  updateVideos,
}: {
  hide: () => void;
  videos: ChurchVideo[];
  updateVideos: (videos: ChurchVideo[]) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [videosState, setVideosState] = useState<ChurchVideo[]>([]);

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
      let videoIndex = 0;
      for (const item of videosState) {
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
            <h3 className="font-size-m font-weight-bold">영상리스트 편집</h3>
          </div>

          <div className="modal__body d-flex">
            <div style={{ flex: "1" }}>
              <ul className="church-videos-in-edit-modal">
                {videosState.map((video, videoIndex) => {
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

            <div
              className="d-flex church-video-register-form"
              style={{
                alignItems: "flex-start",
                flex: 1,
              }}
            >
              <div className="church-register-video-container">
                <div id="church-register-video"></div>
              </div>
              <div>
                <input type="text" className="width-100" />
                <button className="button-4 width-100">생성</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
