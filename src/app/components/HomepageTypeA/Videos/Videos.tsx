import { useEffect, useState } from "react";
import { ChurchVideos } from "../../../../type/homepage/homepage-type-a";
import { nanumBarunGothicBold } from "../../../layout";
import Video from "./Video";
import HomepageEditTools from "../../HomepageEdit/HomepageEditTools";
import VideosEditModal from "./VideosEditModal/VideosEditModal";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";

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
    setVideosState(videos);
  }, [videos]);

  const handleClickEditOverlay = () => {
    setVideosEditModalVisible(true);
  };
  return (
    <>
      <div id="videos" className="edit-overlay-container">
        <h3
          className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold`}
        >
          {videosState?.title}
          {/* <HomepageEditTools
          handleClick={() => {
            setVideosEditModalVisible(true);
          }}
          visibilitlyControl={false}
        /> */}
        </h3>

        <div>
          <Video video={videosState?.page?.data || []} />
        </div>

        {isEdit && (
          <HomepageEditOverlay onClickListener={handleClickEditOverlay} />
        )}
      </div>

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
