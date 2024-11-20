import "./ChurchDepartmentEditModal.scss";

import { useEffect, useRef, useState } from "react";
import {
  ChurchDepartmentAndMinistry,
  ChurchDepartmentsAndMinisties,
} from "../../../../../type/homepage/homepage-type-a";
import { getCookie } from "../../../../../util/cookie-utils";
import TrashIcon from "../../../../../components/Icon/TrashIcon";
import Sortable from "sortablejs";
import DragpanIcon from "../../../../../components/Icon/DragpanIcon";
import Toggle from "../../../Toggle/Toggle";
import { homepageTypeAApiRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-api-repository";

export default function ChurchDepartmentEditModal({
  churchDepartmentsAndMinistries,
  updateChurchDepartment,
  hide,
}: {
  churchDepartmentsAndMinistries: ChurchDepartmentsAndMinisties;
  updateChurchDepartment: (churchIntro: ChurchDepartmentsAndMinisties) => void;
  hide: () => void;
}) {
  const itemsElementRef = useRef<HTMLUListElement>(null);
  const [churchDepartmentState, setChurchDepartmentState] = useState({
    ...churchDepartmentsAndMinistries,
  });
  const [itemsSortable] = useState<Sortable>();

  useEffect(() => {
    const itemsElement = itemsElementRef.current;
    if (!itemsElement) {
      return;
    }

    if (!itemsSortable) {
      new Sortable(itemsElement, {
        animation: 150,
        handle: ".handle",
      });
    }
  }, [itemsSortable]);

  const handleChangeDepartmentName = (value: string, index: number) => {
    const newItems = [...churchDepartmentState.items];

    newItems[index] = {
      ...newItems[index],
      name: value,
    };

    setChurchDepartmentState((prev) => ({
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

    setChurchDepartmentState((prev) => ({
      ...prev,
      items: [...newItems],
    }));
  };

  const handleSubmit = async () => {
    const homepageUuid = getCookie("homepageUuid");
    if (!homepageUuid) {
      return;
    }

    const itemsElement = itemsElementRef.current;
    if (!itemsElement) {
      return;
    }

    const newChurchDepartmentsAndMinistries: ChurchDepartmentsAndMinisties = {
      ...churchDepartmentState,
      items: [],
    };
    for (let i = 0; i < itemsElement.children.length; i++) {
      const cur = itemsElement.children[i];
      const dataIndex = cur.getAttribute("data-index");
      newChurchDepartmentsAndMinistries.items.push(
        churchDepartmentState.items[+dataIndex!],
      );
    }

    const userUuid = getCookie("userUuid");
    await homepageTypeAApiRepository.updateHomepage(
      homepageUuid,
      userUuid || "",
      {
        churchDepartmentsAndMinistries: newChurchDepartmentsAndMinistries,
      },
    );

    updateChurchDepartment({
      ...newChurchDepartmentsAndMinistries,
    });
    hide();
  };

  const handleAdd = () => {
    const newItem: ChurchDepartmentAndMinistry = {
      id: churchDepartmentState.items.length + 1,
      name: "",
      description: "",
    };

    setChurchDepartmentState((prev) => {
      return {
        ...prev,
        items: [...prev.items, newItem],
      };
    });
  };

  const handleRemoveItem = (itemIndex: number): void => {
    const newItems = [...churchDepartmentState.items];
    newItems.splice(itemIndex, 1);
    setChurchDepartmentState((prev) => ({ ...prev, items: [...newItems] }));
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
                style={{ marginBottom: 12 }}
              >
                노출여부
              </p>
              <div>
                <Toggle
                  isActive={churchDepartmentState.visible}
                  onClick={() => {
                    setChurchDepartmentState((prev) => {
                      return {
                        ...prev,
                        visible: !prev.visible,
                      };
                    });
                  }}
                />
              </div>
            </div>

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
                  setChurchDepartmentState((prev) => ({
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

              <ul ref={itemsElementRef}>
                {churchDepartmentState.items.map((item, itemIndex) => {
                  return (
                    <li
                      key={itemIndex}
                      data-id={item.id}
                      data-index={itemIndex}
                    >
                      <div className="d-flex" style={{ gap: 22 }}>
                        <div style={{ flex: 1 }}>
                          <div>
                            <input
                              type="text"
                              className="width-100"
                              value={item.name}
                              onChange={(e) =>
                                handleChangeDepartmentName(
                                  e.target.value,
                                  itemIndex,
                                )
                              }
                            />
                          </div>
                          <div className="d-flex">
                            <textarea
                              style={{ maxWidth: 788, maxHeight: 200 }}
                              onChange={(e) => {
                                handleChangeDepartmentDescription(
                                  e.target.value,
                                  itemIndex,
                                );
                              }}
                              value={item.description}
                            ></textarea>
                          </div>
                        </div>
                        <div
                          className="d-flex align-items-center button-container"
                          style={{ flexDirection: "column" }}
                        >
                          <div>
                            <button type="button" className="handle no-border">
                              <DragpanIcon maxWidth={20} fill="#888" />
                            </button>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="no-border"
                              onClick={() => handleRemoveItem(itemIndex)}
                            >
                              <TrashIcon maxWidth={20} fill="#888" />
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
                onClick={handleAdd}
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
