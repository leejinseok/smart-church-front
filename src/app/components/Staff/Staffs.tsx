import { Staff as StaffInterface } from "@/api/smart-church/smart-church-api-response";
import Image from "next/image";

const Staff = ({ staff }: { staff: StaffInterface }) => {
  return (
    <div>
      <Image
        src={staff.profileImageUrl!}
        width={160}
        height={160}
        alt="sdf"
        style={{
          borderRadius: 100,
        }}
      />

      <div>
        <p className="font-size-xl">{staff.name}</p>
      </div>
    </div>
  );
};

export default function Staffs({ staffs }: { staffs: StaffInterface[] }) {
  return (
    <div>
      {staffs.map((staff, staffIndex) => {
        return <Staff key={staffIndex} staff={staff} />;
      })}
    </div>
  );
}
