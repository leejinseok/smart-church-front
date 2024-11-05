import "./ChurchDepartmentEditModal.scss";

import { useEffect, useState } from "react";
import { ChurchDepartmentsAndMinisties } from "../../../../../type/homepage/homepage-type-a";
import { getCookie } from "../../../../../util/cookie-utils";
import { homepageTypeAMockApiRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-api-repository";
import TrashIcon from "../../../../../components/Icon/TrashIcon";

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

  const handleChangeDepartmentName = (value: string, index: number) => {
    const newItems = [...churchDepartmentState.items];

    newItems[index] = {
      ...newItems[index],
      name: value,
    };

    setChurchIntroState((prev) => ({
      ...prev,
      items: [...newItems],
    }));
  };

  const handleChangeDepartmentDescription = (value: string, index: number) => {
    const newItems = [...churchDepartmentState.items];

    newItems[index] = {
      ...newItems[index],
      description: value,
    };

    setChurchIntroState((prev) => ({
      ...prev,
      items: [...newItems],
    }));
  };

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
                style={{ marginBottom: 0 }}
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
              <p
                className="font-weight-bold font-size-m"
                style={{ marginBottom: 12 }}
              >
                항목
              </p>
              {/* <ul className="font-size-m">
                {churchDepartmentState.items.map((item, itemIndex) => {
                  return (
                    <li key={itemIndex}>
                      <div
                        className="d-flex align-items-center"
                        style={{ marginBottom: 12, gap: 24 }}
                      >
                        <input
                          type="text"
                          className="input"
                          style={{
                            flex: 1,
                          }}
                          value={item.name}
                          onChange={(e) =>
                            handleChangeDepartmentName(
                              e.target.value,
                              itemIndex,
                            )
                          }
                        />
                      </div>

                      <div
                        className="d-flex align-items-center"
                        style={{
                          gap: 24,
                        }}
                      >
                        <textarea
                          value={item.description}
                          className="width-100"
                          onChange={(e) => {
                            handleChangeDepartmentDescription(
                              e.target.value,
                              itemIndex,
                            );
                          }}
                        />
                      </div>
                    </li>
                  );
                })}

                <li>
                  <button type="button" className="button-4 width-100">
                    추가+
                  </button>
                </li>
              </ul> */}

              <ul>
                {churchDepartmentState.items.map((item, itemIndex) => {
                  return (
                    <li key={itemIndex}>
                      <div className="d-flex" style={{ gap: 22 }}>
                        <div style={{ flex: 1 }}>
                          <div>
                            <input
                              type="text"
                              className="width-100"
                              value={item.name}
                            />
                          </div>
                          <div className="d-flex">
                            <textarea
                              className=""
                              style={{ maxWidth: 788, maxHeight: 200 }}
                            >
                              {item.description}
                            </textarea>
                          </div>
                        </div>
                        <div
                          className="d-flex align-items-center"
                          style={{ flexDirection: "column" }}
                        >
                          <div>
                            <button type="button" className="button-4">
                              삭제
                            </button>
                          </div>
                          <div>
                            <button type="button" className="button-4">
                              이동
                            </button>
                          </div>
                        </div>
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
                추가 +
              </button>
            </div>
          </div>
          <div className="modal__footer">
            <div>
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
