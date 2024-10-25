import "./ChurchIntro.scss";

import { Op } from "quill/core";
import { nanumBarunGothicBold } from "../../../layout";
import QuillRenderer from "../../Quill/QuillRenderer";
import HomepageEditTools from "../../HomepageEdit/HomepageEditTools";

export default function ChurchIntro({
  isEdit,
  churchIntro,
}: {
  isEdit: boolean;
  churchIntro: Op[];
}) {
  return (
    <div id="church-intro-section">
      <h3
        className={`${nanumBarunGothicBold.className} font-size-xl font-weight-bold ${isEdit && "edit-tools-container"}`}
      >
        교회소개
        <HomepageEditTools />
      </h3>

      <div className={`font-size-l pre-line `} style={{ position: "relative" }}>
        <QuillRenderer ops={churchIntro} />
      </div>
    </div>
  );
}
