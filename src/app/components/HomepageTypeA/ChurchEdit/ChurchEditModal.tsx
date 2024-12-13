import "./ChurchEditModal.scss";

import { useState } from "react";
import { ChurchResponse } from "../../../../api/smart-church/smart-church-api-response";
import ApplyButton from "../../../../components/common/ApplyButton";
import {
  getChurchAdminAccessTokenCookie,
  setCookie,
} from "../../../../util/cookie-utils";
import { loadScript } from "../../../../util/script-utils";
import { useRecoilState } from "recoil";
import { churchEditModalState } from "../../../../atom/ui";
import { smartChurchChurchApiRepository } from "../../../../repository/smart-church/smart-church-church-api-repository";
import { authApiRepository } from "../../../../repository/smart-church/smart-church-auth-api-repository";

export default function ChurchEditModal({
  church,
  updateChurch,
}: {
  church: ChurchResponse;
  updateChurch: (church: ChurchResponse) => void;
}) {
  const [churchState, setChurchState] = useState({ ...church });
  const [, setChurchEditModal] = useRecoilState(churchEditModalState);

  const handleAddressClick = () => {
    const searchAddress = async (address: string) => {
      try {
        const response = await fetch(
          `/api/geocode?address=${encodeURIComponent(address)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch geocode data");
        }

        const data = await response.json();

        if (data.addresses && data.addresses.length > 0) {
          const { x, y } = data.addresses[0]; // x: 경도, y: 위도
          setChurchState((prev) => ({ ...prev, latitude: y, longitude: x }));
        } else {
          alert("주소를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("Error fetching geocode data:", error);
        alert("오류가 발생했습니다.");
      }
    };

    const callback = () => {
      new daum.Postcode({
        oncomplete: function (data) {
          console.log("data: ", data);
          searchAddress(data.address);

          if (data.userSelectedType === "J") {
            setChurchState((prev) => ({ ...prev, address: data.jibunAddress }));
          } else {
            setChurchState((prev) => ({ ...prev, address: data.roadAddress }));
          }
        },
      }).open();
    };
    if (typeof daum === "undefined") {
      loadScript(
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js",
        callback,
      );
    } else {
      callback();
    }
  };

  const hide = () => {
    if (!churchState.name) {
      return;
    }

    setChurchEditModal({ visible: false });
  };

  const handleSubmit = async () => {
    if (!churchState.id) {
      setCookie(
        "churchTemporary",
        encodeURIComponent(JSON.stringify(churchState)),
        3,
      );
    } else if (churchState.id && churchState.uuid) {
      const churchAdminAccessToken = getChurchAdminAccessTokenCookie();
      if (churchAdminAccessToken) {
        const session = await authApiRepository.session(churchAdminAccessToken);
        smartChurchChurchApiRepository.updateChurch(
          churchAdminAccessToken,
          churchState.uuid,
          {
            ...churchState,
            ownerId: session.id,
          },
        );
      }
    }

    updateChurch(churchState);
    setChurchEditModal({ visible: false });
  };

  return (
    <>
      <div
        id="church-edit-modal"
        className="edit-modal modal-container"
        onClick={hide}
      >
        <div className="modal__inner">
          <div className="modal__box" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3 className="font-size-l font-weight-bold">교회정보 편집</h3>
            </div>

            <div className="modal__body">
              <div className="form-group">
                <p
                  className="font-weight-bold font-size-m form-group__header required"
                  style={{ marginBottom: 0 }}
                >
                  이름
                </p>
                <input
                  type="text"
                  className="font-size-m no-border"
                  value={churchState.name}
                  placeholder="교회이름을 입력해주세요"
                  onChange={(e) =>
                    setChurchState((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-group">
                <p
                  className="font-weight-bold font-size-m form-group__header required"
                  style={{ marginBottom: 0 }}
                >
                  주소
                </p>

                <div>
                  <input
                    type="text"
                    className="font-size-m no-border width-100"
                    value={churchState.address}
                    placeholder="교회주소를 입력해주세요"
                    readOnly
                    onClick={handleAddressClick}
                    onChange={(e) =>
                      setChurchState((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <input
                    type="text"
                    className="font-size-m no-border width-100"
                    value={churchState.addressDetail || ""}
                    placeholder="상세주소를 입력해주세요"
                    onChange={(e) =>
                      setChurchState((prev) => ({
                        ...prev,
                        addressDetail: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <p
                  className="font-weight-bold font-size-m form-group__header"
                  style={{ marginBottom: 0 }}
                >
                  전화번호
                </p>

                <input
                  type="text"
                  className="font-size-m no-border width-100"
                  value={churchState.tel || ""}
                  placeholder="교회 전화번호를 입력해주세요"
                  onChange={(e) =>
                    setChurchState((prev) => ({
                      ...prev,
                      tel: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="modal__footer text-align-center">
              <ApplyButton handleClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
