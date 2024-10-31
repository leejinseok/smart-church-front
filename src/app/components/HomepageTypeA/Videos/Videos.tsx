import { useEffect, useState } from "react";
import { ChurchVideos } from "../../../../type/homepage/homepage-type-a";
import { nanumBarunGothicBold } from "../../../layout";
import Video from "./Video";
import HomepageEditTools from "../../HomepageEdit/HomepageEditTools";
import VideosEditModal from "./VideosEditModal/VideosEditModal";

export default function Videos({ videos }: { videos: ChurchVideos }) {
  const [videosState, setVideosState] = useState<ChurchVideos>({ ...videos });
  const [videosEditModalVisible, setVideosEditModalVisible] = useState(false);

  useEffect(() => {
    setVideosState(videos);
  }, [videos]);
  return (
    <div id="videos">
      <h3
        className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold edit-tools-container`}
      >
        {videosState?.title}
        <HomepageEditTools
          handleClick={() => {
            setVideosEditModalVisible(true);
          }}
          visibilitlyControl={false}
        />
      </h3>

      <div>
        <Video video={videosState?.page?.data || []} />
      </div>

      {videosEditModalVisible && (
        <VideosEditModal
          videos={videosState}
          updateVideos={() => {}}
          hide={() => setVideosEditModalVisible(false)}
        />
      )}
    </div>
  );
}
