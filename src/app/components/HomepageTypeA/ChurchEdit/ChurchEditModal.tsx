import "./ChurchEditModal.scss";

import { useEffect, useState } from "react";
import { ChurchResponse } from "../../../../api/smart-church/smart-church-api-response";
import ApplyButton from "../../../../components/common/ApplyButton";
import { setCookie } from "../../../../util/cookie-utils";
import { loadScript } from "../../../../util/script-utils";

export default function ChurchEditModal({
  church,
}: {
  church: ChurchResponse;
}) {
  const [churchState, setChurchState] = useState({ ...church });
  const [visible, setVisible] = useState(churchState.name === "");

  useEffect(() => {
    if (visible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [visible]);

  const clientId = "2xkw517mhy";
  const clientSecret = "fdyRV2M4EAh3vr1tA5jiTyFzzBPbHvbbtv6AgeqZ";

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
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
          // 예제를 참고하여 다양한 활용법을 확인해 보세요.

          console.log("data: ", data);
          searchAddress(data.address);
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

  const handleSubmit = () => {
    setCookie(
      "churchTemporary",
      encodeURIComponent(JSON.stringify(churchState)),
    );
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div id="church-edit-modal" className="edit-modal modal-container">
          <div className="modal__inner">
            <div className="modal__box" onClick={(e) => e.stopPropagation()}>
              <div className="modal__header">
                <h3 className="font-size-l font-weight-bold">교회정보 편집</h3>
              </div>

              <div className="modal__body">
                <div className="form-group">
                  <p
                    className="font-weight-bold font-size-m"
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
                    className="font-weight-bold font-size-m"
                    style={{ marginBottom: 0 }}
                  >
                    주소
                  </p>

                  <input
                    type="text"
                    className="font-size-m no-border"
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

                <div className="form-group">
                  <p
                    className="font-weight-bold font-size-m"
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
      )}
    </>
  );
}
