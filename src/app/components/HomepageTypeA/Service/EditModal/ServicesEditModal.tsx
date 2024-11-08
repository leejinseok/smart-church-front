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
  return (
    <div
      id="services-edit-modal"
      className="modal-container edit-modal"
      onClick={hide}
    >
      <div className="modal__inner">
        <div className="modal__box" onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">예배 및 모임안내</div>

          <div className="modal__body">
            <div className="form-group"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
