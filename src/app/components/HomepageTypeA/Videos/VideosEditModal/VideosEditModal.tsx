import { useEffect, useState } from "react";
import { ChurchVideo } from "../../../../../type/homepage/homepage-type-a";

export default function VideosEditModal({
  hide,
  videos,
  updateVideos,
}: {
  hide: () => void;
  videos: ChurchVideo[];
  updateVideos: (videos: ChurchVideo[]) => void;
}) {
  const [videosState, setVideosState] = useState<ChurchVideo[]>([]);

  useEffect(() => {
    setVideosState(videos);
  }, [videos]);
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

          <div className="modal__body">
            <ul>
              {videosState.map((video, videoIndex) => {
                return (
                  <li key={videoIndex}>
                    <input type="text" value={video.url} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
