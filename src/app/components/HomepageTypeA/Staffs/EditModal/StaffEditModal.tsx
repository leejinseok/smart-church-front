import "./StaffEditModal.scss";

import { ChurchStaff } from "../../../../../type/homepage/homepage-type-a";
import { ChangeEvent, useState } from "react";
import CheckIcon from "../../../../../components/Icon/CheckIcon";
import CloseIcon from "../../../../../components/Icon/CloseIcon";
import EditModalWrapper from "../../../Modal/EditModalWrapper";

export default function StaffEditModal({
  staff,
  updateStaff,
  hide,
}: {
  staff: ChurchStaff;
  staffIndex: number;
  updateStaff: (staff: ChurchStaff) => void;
  hide: () => void;
}) {
  const [staffState, setStaffState] = useState({ ...staff });
  const handleChangeName = (value: string) => {
    setStaffState((prev) => ({ ...prev, name: value }));
  };

  const handleChangeRole = (value: string) => {
    setStaffState((prev) => ({ ...prev, role: value }));
  };

  const handleChangeDepartment = (value: string) => {
    setStaffState((prev) => ({ ...prev, department: value }));
  };

  const handleChangeEmail = (value: string) => {
    setStaffState((prev) => ({ ...prev, email: value }));
  };

  const handleChangeDescription = (value: string) => {
    setStaffState((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit = () => {
    updateStaff(staffState);
    hide();
  };

  const handleChageProfileImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const file = files[0];

    const reader = new FileReader();
    reader.onload = (progressEvent: ProgressEvent<FileReader>) => {
      const dataURL = progressEvent.target?.result;
      if (dataURL) {
        setStaffState((prev) => ({
          ...prev,
          profileImageUrl: dataURL.toString(),
        }));
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <EditModalWrapper
      id="staff-edit-modal"
      className="modal-container edit-modal"
      onClick={hide}
    >
      <div className="modal__header">
        <h3 className="font-size-l font-weight-bold">
          섬기는 사람들 상세 편집
        </h3>
      </div>

      <div className="modal__body">
        <div className="form-group form-group__image">
          <div>
            <img src={staffState.profileImageUrl} alt="" />
            <input type="file" onChange={handleChageProfileImageFile} />
          </div>
        </div>

        <div className="form-group d-flex align-items-center">
          <label htmlFor="">이름</label>
          <input
            style={{ flex: 1 }}
            type="text"
            value={staffState.name || ""}
            onChange={(e) => handleChangeName(e.target.value)}
          />
        </div>

        <div className="form-group d-flex align-items-center">
          <label htmlFor="">역할</label>
          <input
            style={{ flex: 1 }}
            type="text"
            value={staffState.role || ""}
            onChange={(e) => handleChangeRole(e.target.value)}
          />
        </div>

        <div className="form-group d-flex align-items-center">
          <label htmlFor="">부서</label>
          <input
            style={{ flex: 1 }}
            type="text"
            value={staffState.department || ""}
            onChange={(e) => handleChangeDepartment(e.target.value)}
          />
        </div>

        <div className="form-group d-flex align-items-center">
          <label htmlFor="">이메일</label>
          <input
            style={{ flex: 1 }}
            type="email"
            value={staffState.email || ""}
            onChange={(e) => handleChangeEmail(e.target.value)}
          />
        </div>

        <div className="form-group d-flex">
          <label htmlFor="">상세</label>
          <textarea
            style={{ flex: 1 }}
            value={staffState.description?.trim() || ""}
            onChange={(e) => handleChangeDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="modal__footer text-align-right">
        <button
          type="button"
          className="button-4 cancel"
          onClick={hide}
          style={{
            marginRight: 4,
          }}
        >
          취소
          <CloseIcon maxWidth={18} />
        </button>
        <button
          type="button"
          className="button-4 submit"
          onClick={handleSubmit}
        >
          적용
          <CheckIcon maxWidth={18} />
        </button>
      </div>
    </EditModalWrapper>
  );
}
