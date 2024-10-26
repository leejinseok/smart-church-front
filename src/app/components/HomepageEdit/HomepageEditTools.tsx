"use client";

import "./HomepageEditTools.scss";

import EditIcon from "../../../components/Icon/EditIcon";
import VisibilityOffIcon from "../../../components/Icon/VisibilityOffIcon";
import { useState } from "react";
import VisibilityIcon from "../../../components/Icon/VisibilityIcon";

export default function HomepageEditTools({
  visibilitlyControl = true,
}: {
  visibilitlyControl: boolean;
}) {
  const [visible, setVisible] = useState(true);
  const defaultColor = "#757575";
  const mouseOverColor = "#3f3f3f";
  const [editIconFill, setEditIconFill] = useState(defaultColor);
  const [visibilityOffIconFill, setVisibilityOffIconFill] =
    useState(defaultColor);

  const [visibilityIconFill, setVisibilityIconFill] = useState(defaultColor);

  return (
    <div className="homepage-edit-tools-component">
      <div>
        <span
          onMouseEnter={() => setEditIconFill(mouseOverColor)}
          onMouseLeave={() => setEditIconFill(defaultColor)}
        >
          <EditIcon maxWidth={26} fill={editIconFill} />
        </span>
        {visibilitlyControl &&
          (visible ? (
            <span
              style={{ marginLeft: 4 }}
              onMouseEnter={() => setVisibilityIconFill(mouseOverColor)}
              onMouseLeave={() => setVisibilityIconFill(defaultColor)}
              onClick={() => setVisible(false)}
            >
              <VisibilityIcon maxWidth={26} fill={visibilityIconFill} />
            </span>
          ) : (
            <span
              style={{ marginLeft: 4 }}
              onMouseEnter={() => setVisibilityOffIconFill(mouseOverColor)}
              onMouseLeave={() => setVisibilityOffIconFill(defaultColor)}
              onClick={() => setVisible(true)}
            >
              <VisibilityOffIcon maxWidth={26} fill={visibilityOffIconFill} />
            </span>
          ))}
      </div>
    </div>
  );
}
