import "./ChurchIntro.scss";

import { Op } from "quill/core";
import { nanumBarunGothicBold } from "../../../layout";
import QuillRenderer from "../../Quill/QuillRenderer";
import HomepageEditTools from "../../HomepageEdit/HomepageEditTools";
import { useState } from "react";
import ChurchIntroEditModal from "./ChurchIntroEditModal/ChurchIntroEditModal";
import TestModal from "./ChurchIntroEditModal/TestModal";

export default function ChurchIntro({
  isEdit,
  churchIntro,
}: {
  isEdit: boolean;
  churchIntro: Op[];
}) {
  const [churchIntroEditModalVisible, setChurchIntroEditModalVisible] =
    useState(false);

  return (
    <div id="church-intro-section">
      <h3
        className={`${nanumBarunGothicBold.className} font-size-xl font-weight-bold d-flex align-items-center ${isEdit && "edit-tools-container"}`}
      >
        교회소개
        <HomepageEditTools
          visibilitlyControl={false}
          handleClick={() => setChurchIntroEditModalVisible(true)}
        />
      </h3>

      <div className={`font-size-l pre-line `} style={{ position: "relative" }}>
        <QuillRenderer ops={churchIntro} />
      </div>
      {churchIntroEditModalVisible && <TestModal />}

      {churchIntroEditModalVisible && (
        <ChurchIntroEditModal
          hide={() => setChurchIntroEditModalVisible(false)}
          churchIntro={churchIntro}
        />
      )}
    </div>
  );
}
