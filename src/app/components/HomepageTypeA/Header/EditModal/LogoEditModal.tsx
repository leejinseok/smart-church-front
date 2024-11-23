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
import { getCookie } from "../../../../../util/cookie-utils";
import { homepageTypeAApiRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-api-repository";

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

  const handleChangeLogoImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    // TODO Upload to real backend server.
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (progressEvent: ProgressEvent<FileReader>) => {
      const dataURL = progressEvent.target?.result;
      if (dataURL) {
        setChurchLogoState((prev) => ({
          ...prev,
          image: dataURL.toString(),
        }));
      }
    };

    reader.readAsDataURL(file); // Read the file as a data URL
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const homepageUuid = getCookie("homepageUuid");
    if (!homepageUuid) {
      return;
    }

    const userUuid = getCookie("userUuid");
    await homepageTypeAApiRepository.updateHomepage(
      homepageUuid,
      userUuid || "",
      {
        churchLogo: churchLogoState,
      },
    );

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
                        value={"LOGO_AND_CHURCH_NAME" as ChurchLogoType}
                        checked={
                          churchLogoState.type === "LOGO_AND_CHURCH_NAME"
                        }
                        onChange={() =>
                          handleClickLogoType("LOGO_AND_CHURCH_NAME")
                        }
                      />
                      <label
                        htmlFor="logoType-imageAndChurchName"
                        style={{ marginLeft: 4 }}
                      >
                        로고 이미지 + 교회이름
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
                        value={"CHURCH_NAME" as ChurchLogoType}
                        checked={churchLogoState.type === "CHURCH_NAME"}
                        onChange={() => handleClickLogoType("CHURCH_NAME")}
                      />
                      <label
                        htmlFor="logoType-churchName"
                        style={{ marginLeft: 4 }}
                      >
                        교회이름
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {churchLogoState.type !== "CHURCH_NAME" && (
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
