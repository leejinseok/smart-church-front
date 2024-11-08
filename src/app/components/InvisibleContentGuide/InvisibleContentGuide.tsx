import "./InvisibleContentGuide.scss";

import VisibilityOffIcon from "../../../components/Icon/VisibilityOffIcon";

export default function InvisibleContentGuide({
  text,
  onClick = () => console.log("click"),
}: {
  text: string;
  onClick?: () => void;
}) {
  return (
    <div className="invisible-content-guide" onClick={onClick}>
      <h3 className="text-align-center">
        <div className="d-flex justify-content-center align-items-center">
          <VisibilityOffIcon maxWidth={24} fill="#838383" />
          <span style={{ marginLeft: 8 }}>{text}</span>
        </div>
      </h3>
    </div>
  );
}
