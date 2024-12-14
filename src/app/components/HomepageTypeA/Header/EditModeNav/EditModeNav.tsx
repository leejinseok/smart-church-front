import { useRecoilState } from "recoil";
import {
  churchEditModalState,
  homepageRegisterModalState,
} from "../../../../../atom/ui";
import "./EditModeNav.scss";
import {
  getCookie,
  getHomepageUuidCookie,
} from "../../../../../util/cookie-utils";
import { HomepageStatus } from "../../../../../type/homepage/homepage";
import { useEffect, useState } from "react";

export default function EditModeNav({
  homepageStatus,
}: {
  homepageStatus: HomepageStatus | null;
}) {
  const [, setChurchEditModal] = useRecoilState(churchEditModalState);
  const [, setHomepageRegisterModal] = useRecoilState(
    homepageRegisterModalState,
  );
  const [homepageUuid, setHomepageUuid] = useState("");

  useEffect(() => {
    const homepageUuidCookie = getHomepageUuidCookie();
    if (homepageUuidCookie) {
      setHomepageUuid(homepageUuidCookie as string);
    }
  }, []);

  const handleClickRegisterButton = () => {
    setHomepageRegisterModal({ visible: true });
  };

  const handleClickChurchEditButton = () => {
    setChurchEditModal({
      visible: true,
    });
  };

  return (
    <>
      <div id="edit-mode-nav-component">
        <div className={`edit-mode-nav-container container font-size-m`}>
          <div className="d-flex justify-content-space-between">
            <div className="d-flex align-items-center">
              {/* <a href="#">Smart Church</a> */}
              스마트처치 홈페이지 편집 모드
            </div>

            <div className="d-flex align-items-center">
              <a href={`?uuid=${homepageUuid}`} target="_blank">
                <button
                  type="button"
                  className="font-size-m button-4 d-flex align-items-center"
                >
                  미리보기
                </button>
              </a>
              <button
                type="button"
                className="font-size-m button-4 d-flex align-items-center"
                onClick={handleClickChurchEditButton}
              >
                교회정보
              </button>
              <button
                type="button"
                className="font-size-m button-4 d-flex align-items-center"
                onClick={handleClickRegisterButton}
              >
                {homepageStatus === "TEMPORARY" ? "생성" : "수정"}
              </button>
              {/* <span>Copyright ©RainyHeaven</span> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
