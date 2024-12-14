import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import "./LogoEditModal.scss";
import {
  ChurchLogo,
  ChurchLogoType,
} from "../../../../../type/homepage/homepage-type-a";
import { homepageTypeADefault } from "../../../../../type/homepage/homepage-type-a-mock";
import {
  getChurchAdminAccessTokenCookie,
  getCookie,
  getHomepageUuidCookie,
} from "../../../../../util/cookie-utils";
import { homepageTypeAApiRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-api-repository";
import { authApiRepository } from "../../../../../repository/smart-church/smart-church-auth-api-repository";
import { smartChurchFileApiRepository } from "../../../../../repository/smart-church/smart-church-file-api-repository";

export default function LogoEditModal({
  churchLogo,
  updateChurchLogo,
  hide,
}: {
  churchLogo: ChurchLogo;
  updateChurchLogo: Dispatch<SetStateAction<ChurchLogo>>;
  hide: () => void;
}) {
  const [churchLogoState, setChurchLogoState] =
    useState<ChurchLogo>(churchLogo);

  const handleClickLogoType = (logoType: ChurchLogoType) => {
    setChurchLogoState((prev) => ({
      ...prev,
      type: logoType,
    }));
  };

  const handleChangeLogoImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", "CHURCH_LOGO");

    const res = await smartChurchFileApiRepository.uploadFile(formData);
    const json = await res.json();

    setChurchLogoState((prev) => ({
      ...prev,
      image: json.url,
    }));
  };

  const handleChangeLogoText = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChurchLogoState((prev) => ({ ...prev, text: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const homepageUuid = getHomepageUuidCookie();
    if (!homepageUuid) {
      return;
    }

    const churchAdminAccessToken = getChurchAdminAccessTokenCookie();
    if (churchAdminAccessToken) {
      const session = await authApiRepository.session(churchAdminAccessToken);
      await homepageTypeAApiRepository.updateHomepage(
        homepageUuid,
        session.uuid || "",
        {
          churchLogo: churchLogoState,
        },
      );
    }

    updateChurchLogo((prev) => ({
      ...prev,
      ...churchLogoState,
    }));

    hide();
  };

  const handleReset = () => {
    setChurchLogoState(() => ({ ...homepageTypeADefault.churchLogo }));
  };

  return (
    <div
      id="logo-edit-modal-component"
      className="modal-container edit-modal vertical-center font-size-m"
      onClick={hide}
    >
      <div className="modal__inner">
        <div className="modal__box" onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">
            <h3 className="font-size-l font-weight-bold modal-body__header">
              로고 편집
            </h3>
          </div>
          <div className="modal__body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <span className="form-group__header font-weight-bold">
                  유형
                </span>
                <div>
                  <div>
                    <div>
                      <input
                        id="logoType-imageAndChurchName"
                        type="radio"
                        value={"LOGO_AND_TEXT" as ChurchLogoType}
                        checked={churchLogoState.type === "LOGO_AND_TEXT"}
                        onChange={() => handleClickLogoType("LOGO_AND_TEXT")}
                      />
                      <label
                        htmlFor="logoType-imageAndChurchName"
                        style={{ marginLeft: 4 }}
                      >
                        로고 이미지 + 문자열
                      </label>
                    </div>
                  </div>

                  <div>
                    <div>
                      <input
                        id="logoType-image"
                        type="radio"
                        value={"LOGO" as ChurchLogoType}
                        checked={churchLogoState.type === "LOGO"}
                        onChange={() => handleClickLogoType("LOGO")}
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

                  <div>
                    <div>
                      <input
                        id="logoType-churchName"
                        type="radio"
                        value={"TEXT" as ChurchLogoType}
                        checked={churchLogoState.type === "TEXT"}
                        onChange={() => handleClickLogoType("TEXT")}
                      />
                      <label
                        htmlFor="logoType-churchName"
                        style={{ marginLeft: 4 }}
                      >
                        문자열
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {churchLogoState.type !== "TEXT" && (
                <div className="form-group form-group-logoImage">
                  <span className="font-weight-bold form-group__header">
                    로고 이미지
                  </span>

                  <div>
                    <div>
                      <label htmlFor="logoImageFile">
                        <img
                          src={
                            churchLogoState.image ||
                            "/images/sample-church-logo.png"
                          }
                          alt=""
                        />
                      </label>
                    </div>

                    <input
                      type="file"
                      id="logoImageFile"
                      placeholder="로고 이미지를 선택해주세요"
                      accept="image/*"
                      onChange={(e) => handleChangeLogoImage(e)}
                    />
                  </div>
                </div>
              )}

              {["TEXT", "LOGO_AND_TEXT"].includes(churchLogoState.type) && (
                <div className="form-group form-group-logoImage">
                  <span className="font-weight-bold form-group__header">
                    문자열
                  </span>

                  <div>
                    <input
                      type="text"
                      className="width-100"
                      placeholder="문자열을 입력해주세요"
                      onChange={(e) => handleChangeLogoText(e)}
                      value={churchLogoState.text}
                    />
                  </div>
                </div>
              )}

              <div className="form-group form-group-submit d-flex">
                <button type="button" onClick={handleReset}>
                  초기화
                </button>
                <button type="submit">적용</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
