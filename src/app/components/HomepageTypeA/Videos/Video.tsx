"use client";

import "./Video.scss";
import { useEffect, useState } from "react";
import { loadScript } from "../../../../util/script-utils";
import { ChurchVideo } from "../../../../type/homepage/homepage-type-a";

const videoOriginalWidth = 482;
const videoOriginalHeight = 320;
const videoAspectRatio = videoOriginalHeight / videoOriginalWidth;

export default function Video({ video }: { video: ChurchVideo[] }) {
  const [mounted, setMounted] = useState(false);

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
      for (const item of video) {
        const url = item.url;
        const videoId = url.split("v=")[1];

        const loadingYoutubeIframe = (videoIndex: number) => {
          const iframeElementId = `church-video-${videoIndex}`;
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

    if (typeof YT === "undefined") {
      loadScript("https://www.youtube.com/iframe_api", callback);
    } else {
      callback();
    }
  }, [mounted, video]);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    let timer: number | null = null;

    const videoResize = () => {
      if (timer) {
        window.clearTimeout(timer);
      }

      const videoElements = document.querySelectorAll(
        "#video-component ul li iframe",
      ) as NodeListOf<HTMLElement>;

      timer = window.setTimeout(() => {
        videoElements.forEach((videoElement) => {
          const newHeight = videoElement.clientWidth * videoAspectRatio;
          videoElement.style.height = `${newHeight}px`;
        });
      }, 30);
    };

    window.addEventListener("resize", videoResize);
    setTimeout(() => {
      videoResize();
    }, 1000);
    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
      window.removeEventListener("resize", videoResize);
    };
  }, [video]);

  const generateVideoLengthClassName = (videoLength: number) => {
    return null;
  };

  return (
    <div
      id="video-component"
      className={`${generateVideoLengthClassName(video.length)}`}
    >
      <ul className="clearfix">
        {video.map((item, itemIndex) => {
          return (
            <li key={itemIndex} className="col">
              <div className="d-flex justify-content-center church-video-iframe-container">
                <div
                  id={`church-video-${itemIndex}`}
                  className="church-vedio-container"
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
