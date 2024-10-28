import { Op } from "quill/core";

export default function QuillRenderer({ ops }: { ops: Op[] }) {
  return (
    <div>
      {ops.map((op, opIndex) => {
        const attrs = op.attributes;
        let isBold = false;
        if (attrs) {
          if (attrs.bold) {
            isBold = true;
          }
        }
        return (
          <span key={opIndex} className={`${isBold && "font-weight-bold"}`}>
            {typeof op.insert === "string" && op.insert}
          </span>
        );
      })}
    </div>
  );
}
