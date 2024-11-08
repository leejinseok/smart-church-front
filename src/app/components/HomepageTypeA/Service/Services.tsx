import { useState } from "react";
import { WorshipServicesAndMeetingsInformationGroup } from "../../../../type/homepage/homepage-type-a";
import { nanumBarunGothicBold } from "../../../layout";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";
import Service from "./Service";
import ServicesEditModal from "./EditModal/ServicesEditModal";

export default function Services({
  isEdit,
  worshipServicesAndMeetings,
}: {
  isEdit: boolean;
  worshipServicesAndMeetings: WorshipServicesAndMeetingsInformationGroup[];
}) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [worshipServicesAndMeetingsState, setWorshipServicesAndMeetingsState] =
    useState([...worshipServicesAndMeetings]);
  return (
    <>
      <div className={`${isEdit && "edit-overlay-container"}`}>
        <h3
          className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold`}
        >
          예배 및 모임안내
        </h3>

        <div>
          {worshipServicesAndMeetingsState.map((service, serviceIndex) => {
            return <Service key={serviceIndex} service={service} />;
          })}
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
          hide={() => {
            setEditModalVisible(false);
          }}
        />
      )}
    </>
  );
}
