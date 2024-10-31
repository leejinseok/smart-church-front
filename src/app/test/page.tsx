"use client";

import Render from "./Render";

export default function TestPage() {
  return (
    <div
      style={{
        height: 20000,
      }}
    >
      <Render member={{ id: 1, name: "jinseok" }} />
    </div>
  );
}
