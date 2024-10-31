import "./ChurchIntro.scss";

import { nanumBarunGothicBold } from "../../../layout";
import QuillRenderer from "../../Quill/QuillRenderer";
import HomepageEditTools from "../../HomepageEdit/HomepageEditTools";
import { useState } from "react";
import ChurchIntroEditModal from "./ChurchIntroEditModal/ChurchIntroEditModal";
import { ChurchIntro as ChurchIntroInterface } from "../../../../type/homepage/homepage-type-a";

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

  return (
    <div id="church-intro-section">
      <h3
        className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold d-flex align-items-center ${isEdit && "edit-tools-container"}`}
      >
        {churchIntroState.title}
        <HomepageEditTools
          visibilitlyControl={false}
          handleClick={() => setChurchIntroEditModalVisible(true)}
        />
      </h3>

      <div className={`font-size-m pre-line `} style={{ position: "relative" }}>
        <QuillRenderer ops={churchIntroState.contents} />
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
    </div>
  );
}
