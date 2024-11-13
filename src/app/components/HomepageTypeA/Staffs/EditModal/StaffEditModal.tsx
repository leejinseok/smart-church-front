import { ChurchStaff } from "../../../../../type/homepage/homepage-type-a";

export default function StaffEditModal({
  staff,
  staffIndex,
  updateStaff,
  hide,
}: {
  staff: ChurchStaff;
  staffIndex: number;
  updateStaff: (staff: ChurchStaff, staffIndex: number) => void;
  hide: () => void;
}) {
  return (
    <div
      id="staff-edit-modal"
      className="modal-container edit-modal"
      onClick={hide}
    >
      <div className="modal__inner">
        <div className="modal__box" onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">
            <h3 className="font-size-l font-weight-bold">
              섬기는 사람들 상세 편집
            </h3>
          </div>

          <div className="modal__body">
            <div className="form-group">
              <img src={staff.profileImageUrl} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
