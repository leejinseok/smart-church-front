import "./ServicesEditModal.scss";

import { useEffect, useState } from "react";
import { WorshipServicesAndMeetingsInformationGroup } from "../../../../../type/homepage/homepage-type-a";
import TrashIcon from "../../../../../components/Icon/TrashIcon";
import Sortable from "sortablejs";
import DragpanIcon from "../../../../../components/Icon/DragpanIcon";

export default function ServicesEditModal({
  hide,
  worshipServicesAndMeetings,
}: {
  hide: () => void;
  worshipServicesAndMeetings: WorshipServicesAndMeetingsInformationGroup[];
}) {
  const [worshipServicesAndMeetingsState, setWorshipServicesAndMeetingsState] =
    useState([...worshipServicesAndMeetings]);

  useEffect(() => {
    const groupsLength = worshipServicesAndMeetingsState.length;
    for (let i = 0; i < groupsLength; i++) {
      const element = document.querySelector(
        `#services-and-meetins`,
      ) as HTMLElement;

      if (element) {
        new Sortable(element, {
          handle: "#services-and-meetins .group-handle",
        });

        const itemsElement = element.querySelector(
          `#services-and-meetins-${i}`,
        ) as HTMLElement;

        if (itemsElement) {
          new Sortable(itemsElement, {
            handle: `#services-and-meetins-${i} .group-item-handle`,
          });
        }
      }
    }
  }, [worshipServicesAndMeetingsState]);

  const addGroupItem = (groupIndex: number) => {
    const newValue = [...worshipServicesAndMeetingsState];
    newValue[groupIndex].items.push({
      location: "",
      name: "",
      time: "",
    });
    setWorshipServicesAndMeetingsState(newValue);
  };

  const handleChangeName = (
    value: string,
    groupIndex: number,
    groupItemIndex: number,
  ) => {
    const newValue = [...worshipServicesAndMeetingsState];
    const cur = newValue[groupIndex].items[groupItemIndex];
    newValue[groupIndex].items[groupItemIndex] = {
      ...cur,
      name: value,
    };

    setWorshipServicesAndMeetingsState(newValue);
  };

  const handleChangeTime = (
    value: string,
    groupIndex: number,
    groupItemIndex: number,
  ) => {
    const newValue = [...worshipServicesAndMeetingsState];
    const cur = newValue[groupIndex].items[groupItemIndex];
    newValue[groupIndex].items[groupItemIndex] = {
      ...cur,
      time: value,
    };

    setWorshipServicesAndMeetingsState(newValue);
  };

  const handleChangeLocation = (
    value: string,
    groupIndex: number,
    groupItemIndex: number,
  ) => {
    const newValue = [...worshipServicesAndMeetingsState];
    const cur = newValue[groupIndex].items[groupItemIndex];
    newValue[groupIndex].items[groupItemIndex] = {
      ...cur,
      location: value,
    };

    setWorshipServicesAndMeetingsState(newValue);
  };

  const deleteGroupItem = (groupIndex: number, groupItemIndex: number) => {
    if (!confirm("삭제하시겠습니까?")) {
      return;
    }

    const newValue = [...worshipServicesAndMeetingsState];
    newValue[groupIndex].items.splice(groupItemIndex, 1);

    setWorshipServicesAndMeetingsState(newValue);
  };

  return (
    <div
      id="services-edit-modal"
      className="modal-container edit-modal"
      onClick={hide}
    >
      <div className="modal__inner">
        <div className="modal__box" onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">
            <h3 className="font-size-l font-weight-bold">
              예배 및 모임안내 편집
            </h3>
          </div>

          <div className="modal__body">
            <div className="form-group">
              <ul id="services-and-meetins">
                {worshipServicesAndMeetingsState.map((group, groupIndex) => {
                  return (
                    <li key={groupIndex}>
                      <div className="d-flex">
                        <div
                          style={{ justifyContent: "flex-start" }}
                          className="d-flex align-items-center"
                        >
                          <div
                            style={{ transform: "translateY(2px)" }}
                            className="cursor-pointer group-handle"
                            title="이동"
                          >
                            <DragpanIcon maxWidth={18} fill="#888" />
                          </div>
                          <div
                            style={{ transform: "translateY(2px)" }}
                            className="cursor-pointer"
                            title="삭제"
                          >
                            <TrashIcon maxWidth={18} fill="#888" />
                          </div>
                        </div>

                        <input
                          type="text"
                          value={group.groupName}
                          className="no-border"
                          style={{
                            paddingLeft: 0,
                            marginLeft: 12,
                          }}
                        />
                      </div>

                      <div className="group-items-container">
                        <ul
                          className="group-item"
                          id={`services-and-meetins-${groupIndex}`}
                        >
                          <li className="head">
                            <div>구분</div>
                            <div>시간</div>
                            <div>장소</div>
                            <div>설정</div>
                          </li>
                          {group.items.map((item, itemIndex) => {
                            return (
                              <li key={itemIndex}>
                                <div>
                                  <input
                                    className="no-border text-align-center"
                                    type="text"
                                    placeholder="구분"
                                    value={item.name}
                                    onChange={(e) =>
                                      handleChangeName(
                                        e.target.value,
                                        groupIndex,
                                        itemIndex,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <input
                                    className="no-border text-align-center"
                                    type="text"
                                    placeholder="시간"
                                    value={item.time}
                                    onChange={(e) =>
                                      handleChangeTime(
                                        e.target.value,
                                        groupIndex,
                                        itemIndex,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <input
                                    className="no-border text-align-center"
                                    type="text"
                                    placeholder="장소"
                                    value={item.location}
                                    onChange={(e) =>
                                      handleChangeLocation(
                                        e.target.value,
                                        groupIndex,
                                        itemIndex,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <button
                                    type="button"
                                    className="group-item-handle no-border transparent"
                                    title="이동"
                                  >
                                    <DragpanIcon maxWidth={20} fill="#555555" />
                                  </button>
                                  <button
                                    type="button"
                                    className="no-border transparent"
                                    title="삭제"
                                    onClick={() =>
                                      deleteGroupItem(groupIndex, itemIndex)
                                    }
                                  >
                                    <TrashIcon maxWidth={20} fill="#555555" />
                                  </button>
                                </div>
                              </li>
                            );
                          })}
                        </ul>

                        <div className="d-flex button-container">
                          <button
                            className="button-4"
                            onClick={() => addGroupItem(groupIndex)}
                          >
                            추가 +
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
