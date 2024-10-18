import EditIcon from "../../../components/Icon/EditIcon";
import "./HomepageEditOverlay.scss";

export default function HomepageEditOverlay() {
  return (
    <div
      id="homepage-edit-overlay-component"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="d-flex align-items-center justify-content-center">
        <EditIcon fill="#fff" maxWidth={18} />
        <span style={{ marginLeft: 4 }}>수정</span>
      </div>
    </div>
  );
}
