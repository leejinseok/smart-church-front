import "./EditModeNav.scss";

export default function EditModeNav() {
  const handleClickRegisterButton = () => {
    window.location.reload();
  };
  return (
    <div id="edit-mode-nav-component">
      <div className={`edit-mode-nav-container container font-size-m`}>
        <div className="d-flex justify-content-space-between">
          <div className="d-flex align-items-center">
            {/* <a href="#">Smart Church</a> */}
            스마스처치 홈페이지 편집 모드
          </div>

          <div className="d-flex align-items-center">
            <button
              type="button"
              className="font-size-m"
              onClick={handleClickRegisterButton}
            >
              생성하기
            </button>
            <button type="button" className="font-size-m">
              나가기
            </button>
            {/* <span>Copyright ©RainyHeaven</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
