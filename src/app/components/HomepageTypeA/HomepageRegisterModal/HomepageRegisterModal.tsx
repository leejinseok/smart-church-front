import "./HomepageRegisterModal.scss";

import { useRecoilState } from "recoil";
import { homepageRegisterModalState } from "../../../../atom/ui";
import { useEffect, useState } from "react";
import { getCookie } from "../../../../util/cookie-utils";
import { ChurchResponse } from "../../../../api/smart-church/smart-church-api-response";
import ApplyButton from "../../../../components/common/ApplyButton";
import { loadScript } from "../../../../util/script-utils";
import { openDaumPostCode } from "../../../../util/map-utils";

export default function HomepageRegisterModal() {
  const [, setHomepageRegisterModal] = useRecoilState(
    homepageRegisterModalState,
  );

  const [churchState, setChurchState] = useState<ChurchResponse | null>();
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

  const handleAddressClick = async () => {
    if (!churchState) {
      return;
    }

    try {
      const result = await openDaumPostCode();
      console.log("result: ", result);
      const { latitude, longitude, address } = result;
      setChurchState((prev) => ({ ...prev!, latitude, longitude, address }));
    } catch (err) {
      alert("주소정보를 불러올 수 업습니다");
    }
  };

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
          <div className="modal__body__group">
            <h4 className="font-size-m">회원정보</h4>
            <div className="modal__body__form">
              <div className="modal__body__form__group">
                <label htmlFor="">이메일</label>
                <input type="email" />
              </div>
              <div className="modal__body__form__group">
                <label htmlFor="">패스워드</label>
                <input type="password" />
              </div>
              <div className="modal__body__form__group">
                <label htmlFor="">인증번호</label>
                <input type="number" />
              </div>
            </div>
          </div>

          <div className="modal__body__group">
            <h4 className="font-size-m">교회정보</h4>
            <div className="modal__body__form">
              <div className="modal__body__form__group">
                <label htmlFor="">이름</label>
                <input type="text" value={churchState?.name} />
              </div>
              <div className="modal__body__form__group">
                <label htmlFor="">주소</label>
                <div>
                  <input
                    type="text"
                    value={churchState?.address}
                    readOnly
                    onClick={handleAddressClick}
                  />
                </div>
                <div>
                  <input type="text" value={churchState?.addressDetail || ""} />
                </div>
              </div>
              <div className="modal__body__form__group">
                <label htmlFor="">연락처</label>
                <input type="text" value={churchState?.tel || ""} />
              </div>
            </div>
          </div>
        </div>
        <div className="modal__footer text-align-right">
          <ApplyButton handleClick={() => {}} text="생성" />
        </div>
      </div>
    </div>
  );
}
