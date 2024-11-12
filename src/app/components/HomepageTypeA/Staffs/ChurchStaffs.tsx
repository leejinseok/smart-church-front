import { ChurchStaffs as ChurchStaffsType } from "../../../../type/homepage/homepage-type-a";
import { nanumBarunGothicBold } from "../../../layout";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";
import StaffGroup from "../Staff/StaffGroup";

export default function ChurchStaffs({
  isEdit,
  churchStaffs,
}: {
  isEdit: boolean;
  churchStaffs: ChurchStaffsType;
}) {
  return (
    <>
      <div
        id="church-staffs-component"
        className={`${isEdit && "edit-overlay-container"}`}
      >
        <h3
          className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold`}
        >
          섬기는 사람들
        </h3>

        <div>
          <div>
            {churchStaffs.groups.map((staffGroup, staffGroupIndex) => {
              return (
                <StaffGroup key={staffGroupIndex} staffGroup={staffGroup} />
              );
            })}
          </div>
        </div>

        {isEdit && <HomepageEditOverlay onClickListener={() => {}} />}
      </div>
    </>
  );
}
