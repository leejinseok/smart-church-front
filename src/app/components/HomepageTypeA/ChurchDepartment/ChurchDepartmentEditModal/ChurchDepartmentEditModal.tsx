import "./ChurchDepartmentEditModal.scss";

import { useEffect, useState } from "react";
import { ChurchDepartmentsAndMinisties } from "../../../../../type/homepage/homepage-type-a";
import { getCookie } from "../../../../../util/cookie-utils";
import { homepageTypeAMockApiRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-api-repository";

export default function ChurchDepartmentEditModal({
  churchDepartmentsAndMinistries,
  updateChurchDepartment,
  hide,
}: {
  churchDepartmentsAndMinistries: ChurchDepartmentsAndMinisties;
  updateChurchDepartment: (churchIntro: ChurchDepartmentsAndMinisties) => void;
  hide: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [churchDepartmentState, setChurchIntroState] = useState({
    ...churchDepartmentsAndMinistries,
  });

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  const handleSubmit = async () => {
    const homepageTypeAId = getCookie("homepageTypeAId");
    if (!homepageTypeAId) {
      return;
    }

    await homepageTypeAMockApiRepository.updateChurchDepartmentsAndMinistries(
      +homepageTypeAId,
      churchDepartmentState,
    );

    updateChurchDepartment(churchDepartmentState);
    hide();
  };

  return (
    <div
      id="church-department-edit-modal-component"
      className="modal-container edit-modal vertical-center"
      onClick={hide}
    >
      <div className="modal__inner">
        <div className="modal__box" onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">
            <h3 className="font-size-l font-weight-bold">
              사역 및 부서소개 편집
            </h3>
          </div>
          <div className="modal__body">
            <div className="form-group">
              <p
                className="font-weight-bold font-size-m"
                style={{ marginBottom: 10 }}
              >
                제목
              </p>
              <input
                type="text"
                className="font-size-m no-border"
                value={churchDepartmentState.title}
                onChange={(e) =>
                  setChurchIntroState((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>

            <div className="form-group">
              <ul className="font-size-m">
                {churchDepartmentState.items.map((item, itemIndex) => {
                  return (
                    <li key={itemIndex}>
                      <div
                        className="d-flex align-items-center"
                        style={{ marginBottom: 12, gap: 24 }}
                      >
                        <span className="d-flex">제목</span>
                        <input
                          type="text"
                          className="input"
                          style={{
                            flex: 1,
                          }}
                          value={item.name}
                        />
                      </div>

                      <div
                        className="d-flex align-items-center"
                        style={{
                          gap: 24,
                        }}
                      >
                        <span className="nowrap">설명</span>
                        <textarea
                          value={item.description}
                          className="width-100"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div style={{ paddingTop: 14 }}>
              <button
                className="button-4 width-100"
                type="button"
                onClick={handleSubmit}
              >
                변경
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
