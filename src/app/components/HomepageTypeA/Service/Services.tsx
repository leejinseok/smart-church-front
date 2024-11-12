import { useEffect, useState } from "react";
import { WorshipServicesAndMeetings } from "../../../../type/homepage/homepage-type-a";
import { nanumBarunGothicBold } from "../../../layout";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";
import Service from "./Service";
import ServicesEditModal from "./EditModal/ServicesEditModal";

export default function Services({
  isEdit,
  worshipServicesAndMeetings,
}: {
  isEdit: boolean;
  worshipServicesAndMeetings: WorshipServicesAndMeetings;
}) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [worshipServicesAndMeetingsState, setWorshipServicesAndMeetingsState] =
    useState({ ...worshipServicesAndMeetings });

  useEffect(() => {
    if (editModalVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [editModalVisible]);
  return (
    <>
      <div className={`${isEdit && "edit-overlay-container"}`}>
        <h3
          className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold`}
        >
          {worshipServicesAndMeetingsState.title || "예배 및 모임안내"}
        </h3>

        <div>
          {worshipServicesAndMeetingsState.groups.map(
            (service, serviceIndex) => {
              return <Service key={serviceIndex} service={service} />;
            },
          )}
        </div>

        {isEdit && (
          <HomepageEditOverlay
            onClickListener={() => {
              setEditModalVisible(true);
            }}
          />
        )}
      </div>

      {isEdit && editModalVisible && (
        <ServicesEditModal
          worshipServicesAndMeetings={worshipServicesAndMeetingsState}
          updateWorshipServicesAndMeetings={(
            newValue: WorshipServicesAndMeetings,
          ) => {
            setWorshipServicesAndMeetingsState(newValue);
          }}
          hide={() => {
            setEditModalVisible(false);
          }}
        />
      )}
    </>
  );
}
