import { SvgProps } from "../../type/style";

export default function CheckIcon({ fill, maxWidth }: SvgProps) {
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
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  );
}