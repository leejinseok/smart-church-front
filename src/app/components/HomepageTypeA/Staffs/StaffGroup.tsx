import { StaffGroup as StaffGroupInterface } from "../../../../api/smart-church/smart-church-api-response";
import Staffs from "./Staffs";

export default function StaffGroup({
  staffGroup,
}: {
  staffGroup: StaffGroupInterface;
}) {
  return (
    <div>
      <div>
        <Staffs staffs={staffGroup.staffs} />
      </div>
    </div>
  );
}
