import { StaffGroup as StaffGroupInterface } from "../../../../api/smart-church/smart-church-api-response";
import { nanumBarunGothicLight } from "../../../layout";
import Staffs from "./Staffs";

export default function StaffGroup({
  staffGroup,
}: {
  staffGroup: StaffGroupInterface;
}) {
  return (
    <div>
      {/* <h5
        className={`${nanumBarunGothicLight.className} font-size-l`}
        style={{
          marginBottom: 14,
        }}
      >
        {staffGroup.type}
      </h5> */}
      <div>
        <Staffs staffs={staffGroup.staffs} />
      </div>
    </div>
  );
}
