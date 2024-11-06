import "./ChurchDepartmentEditModal.scss";

import { useEffect, useRef, useState } from "react";
import {
  ChurchDepartmentAndMinistry,
  ChurchDepartmentsAndMinisties,
} from "../../../../../type/homepage/homepage-type-a";
import { getCookie } from "../../../../../util/cookie-utils";
import { homepageTypeAMockApiRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-api-repository";
import TrashIcon from "../../../../../components/Icon/TrashIcon";
import Sortable from "sortablejs";
import DragpanIcon from "../../../../../components/Icon/DragpanIcon";

export default function ChurchDepartmentEditModal({
  churchDepartmentsAndMinistries,
  updateChurchDepartment,
  hide,
}: {
  churchDepartmentsAndMinistries: ChurchDepartmentsAndMinisties;
  updateChurchDepartment: (churchIntro: ChurchDepartmentsAndMinisties) => void;
  hide: () => void;
}) {
  const itemsElementRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [churchDepartmentState, setChurchDepartmentState] = useState({
    ...churchDepartmentsAndMinistries,
  });
  const [itemsSorted, setItemsSorted] = useState<ChurchDepartmentAndMinistry[]>(
    [...churchDepartmentsAndMinistries.items],
  );
  const [itemsSortable, setItemsSortable] = useState<Sortable>();

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    const itemsElement = itemsElementRef.current;
    if (!itemsElement) {
      return;
    }

    if (!itemsSortable) {
      setItemsSortable(
        new Sortable(itemsElement, {
          animation: 150,
          handle: ".handle",
          onEnd(evt) {
            const oldIndex = evt.oldIndex;
            const newIndex = evt.newIndex;
            if (oldIndex === undefined || newIndex === undefined) {
              return;
            }
            const updatedItems = [...churchDepartmentState.items];
            const [movedItem] = updatedItems.splice(oldIndex, 1); // Remove item from old position
            updatedItems.splice(newIndex, 0, movedItem); // Insert item into new position
            setItemsSorted(updatedItems);
          },
        }),
      );
    }
  }, [churchDepartmentState.items, itemsSortable]);

  useEffect(() => {
    for (const item of churchDepartmentState.items) {
      setItemsSorted((prev) => {
        const newSortedItems = [];
        let matched = false;
        for (const cur of prev) {
          if (cur.id === item.id) {
            matched = true;
            newSortedItems.push({
              ...item,
            });
          } else {
            newSortedItems.push(cur);
          }
        }

        if (matched) {
          return newSortedItems;
        }

        newSortedItems.push(item);

        return newSortedItems;
      });
    }
  }, [churchDepartmentState.items]);

  const handleChangeDepartmentName = (value: string, index: number) => {
    const newItems = [...churchDepartmentState.items];

    newItems[index] = {
      ...newItems[index],
      name: value,
    };

    setItemsSorted((prev) => {
      const newItemsSorted = [];
      for (const cur of prev) {
        if (cur.id === newItems[index].id) {
          newItemsSorted.push({ ...newItems[index] });
        } else {
          newItemsSorted.push(cur);
        }
      }

      return newItemsSorted;
    });

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

    setItemsSorted((prev) => {
      const newItemsSorted = [];
      for (const cur of prev) {
        if (cur.id === newItems[index].id) {
          newItemsSorted.push(newItems[index]);
        } else {
          newItemsSorted.push(cur);
        }
      }

      return newItemsSorted;
    });

    setChurchDepartmentState((prev) => ({
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

    updateChurchDepartment({
      ...churchDepartmentState,
      items: [...itemsSorted],
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

              <pre>{JSON.stringify(itemsSorted, null, 4)}</pre>

              <ul ref={itemsElementRef}>
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
