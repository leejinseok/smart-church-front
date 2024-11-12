import { useEffect, useState } from "react";
import { ChurchVideos } from "../../../../type/homepage/homepage-type-a";
import { nanumBarunGothicBold } from "../../../layout";
import Video from "./Video";
import VideosEditModal from "./VideosEditModal/VideosEditModal";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";
import InvisibleContentGuide from "../../InvisibleContentGuide/InvisibleContentGuide";

export default function Videos({
  isEdit,
  videos,
}: {
  isEdit: boolean;
  videos: ChurchVideos;
}) {
  const [videosState, setVideosState] = useState<ChurchVideos>({ ...videos });
  const [videosEditModalVisible, setVideosEditModalVisible] = useState(false);

  useEffect(() => {
    if (videosEditModalVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [videosEditModalVisible]);

  const handleClickEditOverlay = () => {
    setVideosEditModalVisible(true);
  };
  return (
    <>
      {videosState.visible ? (
        <div id="videos" className="edit-overlay-container">
          <h3
            className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold`}
          >
            {videosState.title}
          </h3>

          <div>
            <Video video={videosState.page?.data || []} />
          </div>

          {isEdit && (
            <HomepageEditOverlay onClickListener={handleClickEditOverlay} />
          )}
        </div>
      ) : (
        isEdit && (
          <InvisibleContentGuide
            text="교회영상 항목은 현재 미공개 처리 되었습니다."
            onClick={() => {
              setVideosEditModalVisible(true);
            }}
          />
        )
      )}

      {videosEditModalVisible && (
        <VideosEditModal
          videos={videosState}
          updateVideos={(videos) => {
            setVideosState({ ...videos });
          }}
          hide={() => setVideosEditModalVisible(false)}
        />
      )}
    </>
  );
}
