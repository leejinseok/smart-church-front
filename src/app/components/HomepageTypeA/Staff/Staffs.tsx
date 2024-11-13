"use client";

import "./Staffs.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Staff as StaffInterface } from "../../../../api/smart-church/smart-church-api-response";
import { useEffect, useState } from "react";
import StaffModal from "./StaffModal";

const Staff = ({
  staff,
  handleClickStaff,
}: {
  staff: StaffInterface;
  handleClickStaff: (staff: StaffInterface) => void;
}) => {
  return (
    <li className="staff">
      <div>
        <div className={`image-container d-flex justify-content-center`}>
          {staff.profileImageUrl ? (
            <img
              src={staff.profileImageUrl!}
              alt={`${staff.name} ${staff.role} 사진`}
              onClick={() => handleClickStaff(staff)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              width={100}
              color="gray"
              onClick={() => handleClickStaff(staff)}
            />
          )}
        </div>

        <div className={`content-container`}>
          <p className="font-size-m text-align-center">
            {staff.name} {staff.role}
          </p>
        </div>
      </div>
    </li>
  );
};

export default function Staffs({ staffs }: { staffs: StaffInterface[] }) {
  const [staffModal, setStaffModal] = useState({
    visible: false,
    data: null,
  } as {
    visible: boolean;
    data: StaffInterface | null;
  });

  const handleClickStaff = (staff: StaffInterface) => {
    setStaffModal({
      visible: true,
      data: staff,
    });
  };

  const hideModal = () => {
    setStaffModal({
      visible: false,
      data: null,
    });
  };

  useEffect(() => {
    if (staffModal.visible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [staffModal]);

  return (
    <>
      <div id="staffs-component">
        <ul className="clearfix staff-list">
          {staffs.map((staff, staffIndex) => {
            return (
              <Staff
                key={staffIndex}
                staff={staff}
                handleClickStaff={handleClickStaff}
              />
            );
          })}
        </ul>

        {staffModal.visible && (
          <StaffModal staff={staffModal.data!} hideModal={hideModal} />
        )}
      </div>
    </>
  );
}
