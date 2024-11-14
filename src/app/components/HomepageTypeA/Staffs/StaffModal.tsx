import "./StaffModal.scss";
import { Staff } from "../../../../api/smart-church/smart-church-api-response";
import CloseIcon from "../../../../components/Icon/CloseIcon";

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
          <div className="modal__body-header">
            <h3
              className="font-size-l"
              style={{
                marginBottom: 14,
              }}
            >
              {staff.name} {staff.role}
            </h3>
            <span className="close" onClick={hideModal}>
              <CloseIcon maxWidth={24} fill="#888" />
            </span>
          </div>

          <div className="image-container">
            <img src={staff.profileImageUrl!} alt={staff.name} />
          </div>

          {staff.department && (
            <div>
              <p>
                <b>부서</b> {staff.department}
              </p>
            </div>
          )}

          {staff.email && (
            <div>
              <p>
                <b>이메일</b> {staff.email}
              </p>
            </div>
          )}

          {staff.tel && (
            <div>
              <p>
                <b>연락처</b> {staff.tel}
              </p>
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
