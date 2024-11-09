import "./ServicesEditModal.scss";

import { useState } from "react";
import { WorshipServicesAndMeetingsInformationGroup } from "../../../../../type/homepage/homepage-type-a";
import TrashIcon from "../../../../../components/Icon/TrashIcon";

export default function ServicesEditModal({
  hide,
  worshipServicesAndMeetings,
}: {
  hide: () => void;
  worshipServicesAndMeetings: WorshipServicesAndMeetingsInformationGroup[];
}) {
  const [worshipServicesAndMeetingsState, setWorshipServicesAndMeetingsState] =
    useState([...worshipServicesAndMeetings]);

  const [selectedGroup, setSelectedGroup] = useState(
    worshipServicesAndMeetingsState[0].groupName,
  );

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
              <ul className="groups d-flex">
                {worshipServicesAndMeetingsState.map((item, itemIndex) => {
                  return (
                    <li
                      style={{ flex: 1 }}
                      key={itemIndex}
                      className={`${item.groupName === selectedGroup && "active"}`}
                      onClick={() => {
                        setSelectedGroup(item.groupName);
                      }}
                    >
                      <div className="position-relative">
                        {selectedGroup === item.groupName ? (
                          <input
                            type="text"
                            style={{ paddingRight: 0, padding: 0 }}
                            value={item.groupName}
                            size={item.groupName.length + 1}
                            className="no-border transparent"
                            onChange={(e) => {
                              setWorshipServicesAndMeetingsState((prev) => {
                                const newGroupName = e.target.value;
                                const newValue = [...prev];
                                const groupName = newValue[itemIndex].groupName;
                                newValue[itemIndex].groupName = newGroupName;
                                if (selectedGroup === groupName) {
                                  setSelectedGroup(newGroupName);
                                }
                                return newValue;
                              });
                            }}
                          />
                        ) : (
                          <span>{item.groupName}</span>
                        )}

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            position: "absolute",
                            top: "50%",
                            right: 0,
                            transform: "translateY(-50%)",
                          }}
                        >
                          <TrashIcon maxWidth={20} />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div>
                <div
                  style={{
                    paddingBottom: 10,
                    border: "1px solid #ccc",
                  }}
                >
                  <table
                    style={{ borderCollapse: "collapse" }}
                    className="width-100"
                  >
                    <thead>
                      <tr>
                        <th>구분</th>
                        <th>시간</th>
                        <th>장소</th>
                        <th>설정</th>
                      </tr>
                    </thead>
                    <tbody>
                      {worshipServicesAndMeetingsState
                        .find((item) => item.groupName === selectedGroup)
                        ?.items.map((selectedItem, selectedItems) => {
                          return (
                            <tr key={selectedItems}>
                              <td>
                                <input
                                  className="no-border text-align-center"
                                  type="text"
                                  value={selectedItem.name}
                                />
                              </td>
                              <td>
                                <input
                                  className="no-border text-align-center"
                                  type="text"
                                  value={selectedItem.time}
                                />
                              </td>
                              <td>
                                <input
                                  className="no-border text-align-center"
                                  type="text"
                                  value={selectedItem.location}
                                />
                              </td>
                              <td className="text-align-center">
                                <button>삭제</button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
