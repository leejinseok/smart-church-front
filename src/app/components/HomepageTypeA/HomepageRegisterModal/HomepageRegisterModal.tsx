import "./HomepageRegisterModal.scss";
import { useRecoilState } from "recoil";
import { homepageRegisterModalState } from "../../../../atom/ui";
import { useEffect, useState } from "react";
import { getCookie } from "../../../../util/cookie-utils";
import { ChurchResponse } from "../../../../api/smart-church/smart-church-api-response";

export default function HomepageRegisterModal() {
  const [, setHomepageRegisterModal] = useRecoilState(
    homepageRegisterModalState,
  );

  const [churchState, setChurchState] = useState<ChurchResponse>();
  useEffect(() => {
    const churchTemporaryCookie = getCookie("churchTemporary");
    if (!churchTemporaryCookie) {
      return;
    }

    const churchTemporary = JSON.parse(
      decodeURIComponent(churchTemporaryCookie),
    ) as ChurchResponse;
    setChurchState(churchTemporary);
  }, []);
  return (
    <div
      id="homepage-register-modal"
      className="modal-container"
      onClick={() => setHomepageRegisterModal({ visible: false })}
    >
      <div className="modal__inner" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3>홈페이지 생성하기</h3>
        </div>
        <div className="modal__body">
          <div className="modal__body-group">
            <h4 className="font-size-m">회원정보</h4>
            <div>
              <label htmlFor="">이메일</label>
              <input type="email" />
            </div>
            <div>
              <label htmlFor="">패스워드</label>
              <input type="password" />
            </div>
            <div>
              <label htmlFor="">인증번호</label>
              <input type="number" />
            </div>
          </div>

          <div className="modal__body-group">
            <h4 className="font-size-m">교회정보</h4>
            <div>
              <label htmlFor="">이름</label>
              <input type="text" value={churchState?.name} />
            </div>
            <div>
              <label htmlFor="">주소</label>
              <input type="text" value={churchState?.address} />
              <input type="text" value={churchState?.addressDetail || ""} />
            </div>
            <div>
              <label htmlFor="">연락처</label>
              <input type="text" value={churchState?.tel || ""} />
            </div>
          </div>
        </div>
        <div className="modal__footer">sdf</div>
      </div>
    </div>
  );
}
