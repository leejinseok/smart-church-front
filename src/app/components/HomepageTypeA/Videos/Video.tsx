"use client";

import "./Video.scss";
import { useEffect, useState } from "react";
import { loadScript } from "../../../../util/script-utils";
import { ChurchVideo } from "../../../../type/homepage/homepage-type-a";

const videoOriginalWidth = 610;
const videoOriginalHeight = 370;
const videoAspectRatio = videoOriginalHeight / videoOriginalWidth;

export default function Video({ video }: { video: ChurchVideo[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof YT === "undefined" && mounted) {
      loadScript("https://www.youtube.com/iframe_api", () => {
        let videoIndex = 0;
        for (const item of video) {
          const url = item.url;
          const videoId = url.split("v=")[1];

          const loadingYoutubeIframe = (videoIndex: number) => {
            YT.ready(() => {
              new YT.Player(`church-video-${videoIndex}`, {
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
      });
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
  }, []);

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
              <div className="d-flex justify-content-center">
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
