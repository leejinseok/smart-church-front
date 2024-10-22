import { ChangeEvent, FormEvent, useState } from "react";
import "./LogoEditModal.scss";
import {
  ChurchLogo,
  ChurchLogoType,
  HomepageTypeA,
} from "../../../../../type/homepage/homepage-type-a";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../../../../util/local-storage-utils";
import { HOMEPAGE_TYPE_A_STORAGED_DATA_KEY } from "../../../../../type/homepage/homepage";

export default function LogoEditModal({
  churchLogo,
  hide,
}: {
  churchLogo: ChurchLogo;
  hide: () => void;
}) {
  const [churchLogoState, setChurchLogoState] = useState({ ...churchLogo });

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const homepageTypeALocalStorageItem = getLocalStorageItem(
      HOMEPAGE_TYPE_A_STORAGED_DATA_KEY,
    ) as string | undefined;

    if (homepageTypeALocalStorageItem) {
      const parse = JSON.parse(
        decodeURIComponent(homepageTypeALocalStorageItem),
      ) as HomepageTypeA;
      parse.churchLogo = churchLogoState;

      setLocalStorageItem(
        HOMEPAGE_TYPE_A_STORAGED_DATA_KEY,
        encodeURIComponent(JSON.stringify(parse)),
      );

      window.location.reload();
    }
  };

  return (
    <div
      id="logo-edit-modal-component"
      className="modal-container vertical-center font-size-m"
      onClick={hide}
    >
      <div className="modal__inner">
        <div className="modal__body" onClick={(e) => e.stopPropagation()}>
          <p
            className="font-size-m font-weight-bold"
            style={{
              marginBottom: 6,
            }}
          >
            로고 편집
          </p>

          <form onSubmit={handleSubmit}>
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

                <div style={{ marginLeft: 6 }}>
                  <div>
                    <input
                      id="logoType-imageAndChurchName"
                      type="radio"
                      value={"LOGO_AND_CHURCH_NAME" as ChurchLogoType}
                      checked={churchLogoState.type === "LOGO_AND_CHURCH_NAME"}
                      onChange={() =>
                        handleClickLogoType("LOGO_AND_CHURCH_NAME")
                      }
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

                <input type="file" onChange={(e) => handleChangeLogoImage(e)} />
              </div>
            </div>

            <div className="form-group form-group-submit">
              <button type="submit" className="width-100">
                적용
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
