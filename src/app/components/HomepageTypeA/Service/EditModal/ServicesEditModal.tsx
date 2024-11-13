import "./ServicesEditModal.scss";

import { useEffect, useState } from "react";
import { WorshipServicesAndMeetings } from "../../../../../type/homepage/homepage-type-a";
import TrashIcon from "../../../../../components/Icon/TrashIcon";
import Sortable from "sortablejs";
import DragpanIcon from "../../../../../components/Icon/DragpanIcon";
import { homepageTypeAMockApiRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-api-repository";
import { getCookie } from "../../../../../util/cookie-utils";
import AddIcon from "../../../../../components/Icon/AddIcon";

export default function ServicesEditModal({
  hide,
  worshipServicesAndMeetings,
  updateWorshipServicesAndMeetings,
}: {
  hide: () => void;
  worshipServicesAndMeetings: WorshipServicesAndMeetings;
  updateWorshipServicesAndMeetings: (
    newValue: WorshipServicesAndMeetings,
  ) => void;
}) {
  const [worshipServicesAndMeetingsState, setWorshipServicesAndMeetingsState] =
    useState(
      JSON.parse(
        JSON.stringify(worshipServicesAndMeetings),
      ) as WorshipServicesAndMeetings,
    );

  useEffect(() => {
    const groupsLength = worshipServicesAndMeetingsState.groups.length;
    for (let i = 0; i < groupsLength; i++) {
      const element = document.querySelector(
        `#services-and-meetings`,
      ) as HTMLElement;

      if (element) {
        new Sortable(element, {
          handle: "#services-and-meetings .group-handle",
        });

        const itemsElement = element.querySelector(
          `#services-and-meetings-${i}`,
        ) as HTMLElement;

        if (itemsElement) {
          new Sortable(itemsElement, {
            handle: `#services-and-meetings-${i} .group-item-handle`,
          });
        }
      }
    }
  }, [worshipServicesAndMeetingsState]);

  const addGroupItem = (groupIndex: number) => {
    const newValue = { ...worshipServicesAndMeetingsState };
    newValue.groups[groupIndex].items.push({
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
    const newValue = { ...worshipServicesAndMeetingsState };
    const cur = newValue.groups[groupIndex].items[groupItemIndex];
    newValue.groups[groupIndex].items[groupItemIndex] = {
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
    const newValue = { ...worshipServicesAndMeetingsState };
    const cur = newValue.groups[groupIndex].items[groupItemIndex];
    newValue.groups[groupIndex].items[groupItemIndex] = {
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
    const newValue = { ...worshipServicesAndMeetingsState };
    const cur = newValue.groups[groupIndex].items[groupItemIndex];
    newValue.groups[groupIndex].items[groupItemIndex] = {
      ...cur,
      location: value,
    };

    setWorshipServicesAndMeetingsState(newValue);
  };

  const deleteGroup = (groupIndex: number) => {
    if (!confirm("삭제하시겠습니까?")) {
      return;
    }

    const newValue = { ...worshipServicesAndMeetingsState };
    newValue.groups.splice(groupIndex, 1);
    setWorshipServicesAndMeetingsState(newValue);
  };

  const deleteGroupItem = (groupIndex: number, groupItemIndex: number) => {
    const newValue = { ...worshipServicesAndMeetingsState };
    newValue.groups[groupIndex].items.splice(groupItemIndex, 1);

    setWorshipServicesAndMeetingsState(newValue);
  };

  const handleSubmit = async () => {
    const newWorshipServicesAndMeetings = {
      ...worshipServicesAndMeetingsState,
    };
    for (
      let groupIndex = 0;
      groupIndex < newWorshipServicesAndMeetings.groups.length;
      groupIndex++
    ) {
      const curGroup = newWorshipServicesAndMeetings.groups[groupIndex];
      const prevGroupItems = curGroup.items;
      const newGroupItems = [];

      const itemsElement = document.querySelectorAll(
        `#services-and-meetings-${groupIndex} li`,
      );

      if (itemsElement) {
        for (
          let groupItemIndex = 0;
          groupItemIndex < itemsElement.length;
          groupItemIndex++
        ) {
          const itemElement = itemsElement[groupItemIndex];
          const dataIndex = itemElement.getAttribute("data-index");

          if (dataIndex) {
            newGroupItems.push(prevGroupItems[+dataIndex!]);
          }
        }
      }

      newWorshipServicesAndMeetings.groups[groupIndex].items = [
        ...newGroupItems,
      ];
    }

    const homepageTypeAId = getCookie("homepageTypeAId");
    if (!homepageTypeAId) {
      return;
    }

    await homepageTypeAMockApiRepository.updateWorkshipServicesAndMeetings(
      homepageTypeAId,
      newWorshipServicesAndMeetings,
    );

    updateWorshipServicesAndMeetings(newWorshipServicesAndMeetings);
    hide();
  };

  const handleChangeGroupName = (value: string, groupIndex: number) => {
    const newValue = { ...worshipServicesAndMeetingsState };
    newValue.groups[groupIndex].groupName = value;
    setWorshipServicesAndMeetingsState(newValue);
  };

  const addGroup = () => {
    const newValue = { ...worshipServicesAndMeetingsState };
    newValue.groups.push({
      groupName: "",
      items: [],
    });
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
              <p
                className="font-weight-bold font-size-m"
                style={{ marginBottom: 0 }}
              >
                제목
              </p>
              <input
                type="text"
                className="font-size-m no-border"
                value={worshipServicesAndMeetingsState.title}
                onChange={(e) =>
                  setWorshipServicesAndMeetingsState((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group">
              <div className="d-flex">
                <p
                  className="font-weight-bold font-size-m"
                  style={{ marginBottom: 0 }}
                >
                  항목
                </p>

                <span
                  className="d-flex cursor-pointer"
                  style={{ marginLeft: 6 }}
                  onClick={() => addGroup()}
                >
                  <AddIcon maxWidth={18} fill="#4b4b4b" />
                </span>
              </div>

              <ul id="services-and-meetings">
                {worshipServicesAndMeetingsState.groups.map(
                  (group, groupIndex) => {
                    return (
                      <li key={groupIndex}>
                        <div className="d-flex">
                          <div
                            className="d-flex align-items-center"
                            style={{
                              flex: 1,
                            }}
                          >
                            <div
                              style={{ transform: "translateY(2px)" }}
                              className="cursor-pointer group-handle"
                              title="이동"
                            >
                              <DragpanIcon maxWidth={18} fill="#888" />
                            </div>
                            <input
                              type="text"
                              placeholder="예배, 모임"
                              value={group.groupName}
                              onChange={(e) => {
                                handleChangeGroupName(
                                  e.target.value,
                                  groupIndex,
                                );
                              }}
                              className="no-border"
                              style={{
                                paddingLeft: 0,
                                marginLeft: 4,
                              }}
                            />
                          </div>

                          <div
                            style={{
                              justifyContent: "flex-start",
                            }}
                            className="d-flex align-items-center"
                          >
                            <div
                              className="cursor-pointer"
                              onClick={() => deleteGroup(groupIndex)}
                              title="삭제"
                            >
                              <TrashIcon maxWidth={22} fill="#888" />
                            </div>
                          </div>
                        </div>

                        <div className="group-items-container">
                          <ul
                            className="group-item"
                            id={`services-and-meetings-${groupIndex}`}
                          >
                            <li className="head">
                              <div>구분</div>
                              <div>시간</div>
                              <div>장소</div>
                              <div>설정</div>
                            </li>
                            {group.items.map((groupItem, groupItemIndex) => {
                              return (
                                <li
                                  key={groupItemIndex}
                                  data-index={groupItemIndex}
                                >
                                  <div>
                                    <input
                                      className="no-border text-align-center"
                                      type="text"
                                      placeholder="구분"
                                      value={groupItem.name}
                                      onChange={(e) =>
                                        handleChangeName(
                                          e.target.value,
                                          groupIndex,
                                          groupItemIndex,
                                        )
                                      }
                                    />
                                  </div>
                                  <div>
                                    <input
                                      className="no-border text-align-center"
                                      type="text"
                                      placeholder="시간"
                                      value={groupItem.time}
                                      onChange={(e) =>
                                        handleChangeTime(
                                          e.target.value,
                                          groupIndex,
                                          groupItemIndex,
                                        )
                                      }
                                    />
                                  </div>
                                  <div>
                                    <input
                                      className="no-border text-align-center"
                                      type="text"
                                      placeholder="장소"
                                      value={groupItem.location}
                                      onChange={(e) =>
                                        handleChangeLocation(
                                          e.target.value,
                                          groupIndex,
                                          groupItemIndex,
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
                                      <DragpanIcon
                                        maxWidth={20}
                                        fill="#555555"
                                      />
                                    </button>
                                    <button
                                      type="button"
                                      className="no-border transparent"
                                      title="삭제"
                                      onClick={() =>
                                        deleteGroupItem(
                                          groupIndex,
                                          groupItemIndex,
                                        )
                                      }
                                    >
                                      <TrashIcon maxWidth={20} fill="#555555" />
                                    </button>
                                  </div>
                                </li>
                              );
                            })}

                            <li className="footer">
                              <div>
                                <button
                                  style={{
                                    display: "table-cell",
                                    marginTop: 12,
                                  }}
                                  className="button-4"
                                  onClick={() => addGroupItem(groupIndex)}
                                >
                                  {group.groupName} 추가 +
                                </button>
                              </div>
                              <div></div>
                              <div></div>
                              <div></div>
                            </li>
                          </ul>
                        </div>
                      </li>
                    );
                  },
                )}
              </ul>
            </div>
          </div>

          <div className="modal__footer">
            <button
              type="button"
              className="button-4 width-100"
              onClick={() => handleSubmit()}
            >
              적용
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
