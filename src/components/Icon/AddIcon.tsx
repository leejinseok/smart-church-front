import { SvgProps } from "../../type/style";

export default function AddIcon({ maxWidth, fill }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      style={{
        maxWidth,
        width: "100%",
      }}
      fill={fill || "#e8eaed"}
    >
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </svg>
  );
}
