import { useState } from "react";
import "./LogoEditModal.scss";
import {
  ChurchLogo,
  ChurchLogoType,
} from "../../../../../type/homepage/homepage-type-a";

export default function LogoEditModal({
  churchLogo,
}: {
  churchLogo: ChurchLogo;
}) {
  const [churchLogoState, setChurchLogoState] = useState({ ...churchLogo });
  return (
    <div
      id="logo-edit-modal-component"
      className="modal-container vertical-center font-size-m"
    >
      <div className="modal__inner">
        <div className="modal__body">
          <p
            className="font-size-m font-weight-bold"
            style={{
              marginBottom: 6,
            }}
          >
            로고 설정
          </p>

          <div className="form-group">
            <span className="font-weight-bold">유형</span>
            <div className="d-flex">
              <div>
                <div>
                  <input
                    id="logoType-image"
                    type="radio"
                    value={"LOGO" as ChurchLogoType}
                    checked={churchLogoState.type === "LOGO"}
                  />
                  <label
                    htmlFor="logoType-image"
                    style={{
                      marginLeft: 4,
                    }}
                  >
                    로고 이미지
                  </label>
                </div>
              </div>

              <div style={{ marginLeft: 6 }}>
                <div>
                  <input
                    id="logoType-imageAndChurchName"
                    type="radio"
                    value={"LOGO_AND_CHURCH_NAME" as ChurchLogoType}
                    checked={churchLogoState.type === "LOGO_AND_CHURCH_NAME"}
                  />
                  <label
                    htmlFor="logoType-imageAndChurchName"
                    style={{ marginLeft: 4 }}
                  >
                    로고이미지 + 교회명
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group form-group-logoImage">
            <div></div>
            <div>
              <div>
                <img
                  src={
                    churchLogoState.image || "/images/sample-church-logo.png"
                  }
                  alt=""
                />
              </div>

              <input type="file" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
