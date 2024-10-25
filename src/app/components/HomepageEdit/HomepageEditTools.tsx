import "./HomepageEditTools.scss";

import EditIcon from "../../../components/Icon/EditIcon";
import VisibilityOffIcon from "../../../components/Icon/VisibilityOffIcon";
import { useState } from "react";

export default function HomepageEditTools() {
  const defaultColor = "#757575";
  const mouseOverColor = "#3f3f3f";
  const [editIconFill, setEditIconFill] = useState(defaultColor);
  const [visibilityOffIconFill, setVisibilityOffIconFill] =
    useState(defaultColor);

  return (
    <div className="homepage-edit-tools-component">
      <div>
        <span
          onMouseEnter={() => setEditIconFill(mouseOverColor)}
          onMouseLeave={() => setEditIconFill(defaultColor)}
        >
          <EditIcon maxWidth={26} fill={editIconFill} />
        </span>
        <span
          style={{ marginLeft: 4 }}
          onMouseEnter={() => setVisibilityOffIconFill(mouseOverColor)}
          onMouseLeave={() => setVisibilityOffIconFill(defaultColor)}
        >
          <VisibilityOffIcon maxWidth={26} fill={visibilityOffIconFill} />
        </span>
      </div>
    </div>
  );
}
