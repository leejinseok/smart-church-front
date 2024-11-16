import "./TinyNav.scss";

export default function TinyNav() {
  return (
    <div id="edit-mode-nav-component">
      <div className={`edit-mode-nav-container container font-size-s`}>
        <div className="d-flex justify-content-space-between">
          <div className="d-flex align-items-center">
            <a href="#">Smart Church</a>
          </div>

          <div className="d-flex align-items-center">
            <span>Copyright ©RainyHeaven</span>
          </div>
        </div>
      </div>
    </div>
  );
}
