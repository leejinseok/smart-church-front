import "./Toggle.scss";

export default function Toggle({
  isActive = false,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div onClick={() => onClick()}>
      <label
        htmlFor="toggle"
        className={`toggleSwitch ${isActive && "active"}`}
      >
        <span className="toggleButton"></span>
      </label>
    </div>
  );
}
