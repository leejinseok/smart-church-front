import { useRecoilState } from "recoil";
import { churchEditModalState } from "../../../../../atom/ui";
import "./EditModeNav.scss";
import { getCookie } from "../../../../../util/cookie-utils";

export default function EditModeNav({
  homepageChurchUuid,
}: {
  homepageChurchUuid: string | null | undefined;
}) {
  const [, setChurchEditModal] = useRecoilState(churchEditModalState);

  const handleClickRegisterButton = () => {
    const userUuid = getCookie("userUuid");
    console.log("생성");
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
              <a
                href={`?uuid=47236142-4c14-4830-941a-7b79879669a6`}
                target="_blank"
              >
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

              {!homepageChurchUuid && (
                <button
                  type="button"
                  className="font-size-m button-4 d-flex align-items-center"
                  onClick={handleClickRegisterButton}
                >
                  생성
                </button>
              )}
              {/* <span>Copyright ©RainyHeaven</span> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
