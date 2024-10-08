import { SvgProps } from "../../type/style";

export default function CloseIcon({ fill, maxWidth }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      style={{ width: "100%", maxWidth }}
      fill={fill || "#e8eaed"}
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
}
