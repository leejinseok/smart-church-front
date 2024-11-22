export default function EditModalWrapper({
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
}> &
  React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`modal-container edit-modal ${props.className || ""}`}
    >
      <div className="modal__inner">
        <div className="modal__box" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
}
