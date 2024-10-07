import "./StaffModal.scss";
import { Staff } from "../../../api/smart-church/smart-church-api-response";

export default function StaffModal({
  staff,
  hideModal,
}: {
  staff: Staff;
  hideModal: () => void;
}) {
  return (
    <div
      id="staff-modal-component"
      className="modal-container vertical-center"
      onClick={hideModal}
    >
      <div className="modal__inner">
        <div className="modal__body" onClick={(e) => e.stopPropagation()}>
          <h3
            className="font-size-l"
            style={{
              marginBottom: 14,
            }}
          >
            {staff.name} {staff.role}
          </h3>
          <div className="image-container">
            <img src={staff.profileImageUrl!} alt={staff.name} />
          </div>

          {staff.email && (
            <div>
              <p>이메일: {staff.email}</p>
            </div>
          )}

          {staff.tel && (
            <div>
              <p>연락처: {staff.tel}</p>
            </div>
          )}

          {staff.description && (
            <div className="description-container">
              <p className="pre-line">{staff.description?.trim()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
