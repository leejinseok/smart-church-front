import "./ChurchIntro.scss";

import { nanumBarunGothicBold } from "../../../layout";
import QuillRenderer from "../../Quill/QuillRenderer";
import { useEffect, useState } from "react";
import ChurchIntroEditModal from "./ChurchIntroEditModal/ChurchIntroEditModal";
import { ChurchIntro as ChurchIntroInterface } from "../../../../type/homepage/homepage-type-a";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";

export default function ChurchIntro({
  isEdit,
  churchIntro,
}: {
  isEdit: boolean;
  churchIntro: ChurchIntroInterface;
}) {
  const [churchIntroEditModalVisible, setChurchIntroEditModalVisible] =
    useState(false);

  const [churchIntroState, setChurchIntroState] = useState({ ...churchIntro });

  useEffect(() => {
    if (churchIntroEditModalVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [churchIntroEditModalVisible]);

  return (
    <>
      <div
        id="church-intro-section"
        className={`${isEdit && "edit-overlay-container"}`}
      >
        <h3
          className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold d-flex align-items-center`}
        >
          {churchIntroState.title}
          {/* <HomepageEditTools
            visibilitlyControl={false}
            handleClick={() => setChurchIntroEditModalVisible(true)}
          /> */}
        </h3>

        <div
          className={`font-size-m pre-line `}
          style={{ position: "relative" }}
        >
          <QuillRenderer ops={churchIntroState.contents} />
        </div>

        <HomepageEditOverlay
          onClickListener={() => {
            setChurchIntroEditModalVisible(true);
          }}
        />
      </div>

      {churchIntroEditModalVisible && (
        <ChurchIntroEditModal
          hide={() => setChurchIntroEditModalVisible(false)}
          churchIntro={churchIntroState}
          updateChurchIntro={(churchIntro) => {
            setChurchIntroState(churchIntro);
          }}
        />
      )}
    </>
  );
}
