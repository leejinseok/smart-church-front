import { StaffGroup as StaffGroupInterface } from "@/api/smart-church/smart-church-api-response";
import Staffs from "./Staffs";
import { nanumBarunGothic, nanumBarunGothicLight } from "@/app/layout";

export default function StaffGroup({
  staffGroup,
}: {
  staffGroup: StaffGroupInterface;
}) {
  return (
    <div>
      <h5
        className={`${nanumBarunGothicLight.className} font-size-xxxl`}
        style={{
          marginBottom: 14,
        }}
      >
        {staffGroup.type}
      </h5>
      <div>
        <Staffs staffs={staffGroup.staffs} />
      </div>
    </div>
  );
}
