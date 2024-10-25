import EditIcon from "../../../components/Icon/EditIcon";
import "./HomepageEditOverlay.scss";

export default function HomepageEditOverlay({
  onClickListener,
}: {
  onClickListener: () => void;
}) {
  return (
    <div
      className="homepage-edit-overlay-component"
      onClick={() => onClickListener()}
    >
      <div className="d-flex align-items-center justify-content-center">
        <EditIcon fill="#fff" maxWidth={18} />
        <span style={{ marginLeft: 4 }}>편집</span>
      </div>
    </div>
  );
}
