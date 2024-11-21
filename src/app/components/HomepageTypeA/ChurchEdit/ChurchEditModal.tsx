import "./ChurchEditModal.scss";

import { useEffect, useState } from "react";
import { ChurchResponse } from "../../../../api/smart-church/smart-church-api-response";
import ApplyButton from "../../../../components/common/ApplyButton";
import { setCookie } from "../../../../util/cookie-utils";

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
                    style={{ marginBottom: 10 }}
                  >
                    교회이름
                  </p>
                  <input
                    type="text"
                    className="font-size-m no-border"
                    value={churchState.name}
                    onChange={(e) =>
                      setChurchState((prev) => ({
                        ...prev,
                        name: e.target.value,
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
