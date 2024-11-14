import { useState } from "react";
import { ChurchStaffs as ChurchStaffsType } from "../../../../type/homepage/homepage-type-a";
import { nanumBarunGothicBold } from "../../../layout";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";
import StaffGroup from "./StaffGroup";
import StaffsEditModal from "./EditModal/StaffsEditModal";

export default function ChurchStaffs({
  isEdit,
  churchStaffs,
}: {
  isEdit: boolean;
  churchStaffs: ChurchStaffsType;
}) {
  const [churchStaffsState, setChurchStaffsState] = useState({
    ...churchStaffs,
  });
  const [editModalVisible, setEditModalVisible] = useState(false);

  return (
    <>
      <div
        id="church-staffs-component"
        className={`${isEdit && "edit-overlay-container"}`}
      >
        <h3
          className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold`}
        >
          {churchStaffs.title}
        </h3>

        <div>
          <div>
            {churchStaffsState.groups.map((staffGroup, staffGroupIndex) => {
              return (
                <StaffGroup key={staffGroupIndex} staffGroup={staffGroup} />
              );
            })}
          </div>
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
        <StaffsEditModal
          hide={() => setEditModalVisible(false)}
          churchStaffs={churchStaffsState}
          updateStaffs={(churchStaffs) => {
            setChurchStaffsState(churchStaffs);
          }}
        />
      )}
    </>
  );
}
