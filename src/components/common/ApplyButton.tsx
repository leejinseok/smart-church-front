import CheckIcon from "../Icon/CheckIcon";

export default function ApplyButton({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <button
      type="button"
      className="button-4 d-flex submit align-items-center"
      onClick={handleClick}
    >
      적용
      <CheckIcon maxWidth={18} />
    </button>
  );
}
