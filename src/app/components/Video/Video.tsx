"use client";

import "./Video.scss";
import { useEffect, useState } from "react";
import { ChurchVideo } from "../../../api/smart-church/smart-church-api-response";
import { loadScript } from "../../../util/script-utils";

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
                height: "380",
                width: "610",
                videoId,
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
  return (
    <div id="video-component">
      <ul className="clearfix">
        {video.map((item, itemIndex) => {
          return (
            <li key={itemIndex} className="col">
              <div className="d-flex justify-content-center">
                <div id={`church-video-${itemIndex}`}></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
