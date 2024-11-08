import "./ServicesEditModal.scss";

import { useState } from "react";
import { WorshipServicesAndMeetingsInformationGroup } from "../../../../../type/homepage/homepage-type-a";

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
            <h3 className="font-size-m font-weight-bold">
              예배 및 모임안내 편집
            </h3>
          </div>

          <div className="modal__body">
            <div className="form-group">
              <ul className="groups">
                {worshipServicesAndMeetingsState.map((item, itemIndex) => {
                  return (
                    <li
                      key={itemIndex}
                      className={`${item.groupName === selectedGroup && "active"}`}
                    >
                      <span>{item.groupName}</span>
                    </li>
                  );
                })}
              </ul>

              <div>
                {worshipServicesAndMeetingsState
                  .find((item) => item.groupName === selectedGroup)
                  ?.items.map((selectedItem, selectedItems) => {
                    return <div key={selectedItems}>{selectedItem.name}</div>;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
