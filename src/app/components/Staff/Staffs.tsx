import "./Staffs.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Staff as StaffInterface } from "../../../api/smart-church/smart-church-api-response";

const Staff = ({ staff }: { staff: StaffInterface }) => {
  return (
    <li className="staff">
      <div className={`image-container d-flex justify-content-center`}>
        {staff.profileImageUrl ? (
          <img
            src={staff.profileImageUrl!}
            alt={`${staff.name} ${staff.role} 사진`}
          />
        ) : (
          <FontAwesomeIcon icon={faUser} width={100} color="gray" />
        )}
      </div>

      <div className={`content-container`}>
        <p className="font-size-l text-align-center">
          {staff.name} {staff.role}
        </p>
      </div>
    </li>
  );
};

export default function Staffs({ staffs }: { staffs: StaffInterface[] }) {
  return (
    <div id="staffs-component">
      <ul className="clearfix staff-list">
        {staffs.map((staff, staffIndex) => {
          return <Staff key={staffIndex} staff={staff} />;
        })}
      </ul>
    </div>
  );
}
