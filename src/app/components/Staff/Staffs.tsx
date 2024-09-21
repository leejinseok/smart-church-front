import { Staff as StaffInterface } from "@/api/smart-church/smart-church-api-response";
import Image from "next/image";
import styles from "./Staffs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Staff = ({ staff }: { staff: StaffInterface }) => {
  return (
    <li className={`${styles["staff-list"]}`}>
      <div
        className={`${styles["image-container"]} d-flex justify-content-center`}
      >
        {staff.profileImageUrl ? (
          <img
            src={staff.profileImageUrl!}
            alt={`${staff.name} ${staff.role} 사진`}
            style={{
              width: 210,
              height: "fit-content",
            }}
          />
        ) : (
          <FontAwesomeIcon icon={faUser} width={100} color="gray" />
        )}
      </div>

      <div className={`${styles["content-container"]}`}>
        <p className="font-size-xxl text-align-center">
          {staff.name} {staff.role}
        </p>
      </div>
    </li>
  );
};

export default function Staffs({ staffs }: { staffs: StaffInterface[] }) {
  return (
    <ul className="clearfix">
      {staffs.map((staff, staffIndex) => {
        return <Staff key={staffIndex} staff={staff} />;
      })}
    </ul>
  );
}
