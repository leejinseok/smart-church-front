export default function LocationEditModal({ hide }: { hide: () => void }) {
  return (
    <div
      id="location-edit-modal"
      className="modal-container edit-modal"
      onClick={hide}
    >
      <div className="modal__inner">
        <div className="modal__box" onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">
            <h3 className="font-size-l font-weight-bold">찾아오시는 길 편집</h3>
          </div>

          <div className="modal__body">sdf</div>
          <div className="modal__footer">sdf</div>
        </div>
      </div>
    </div>
  );
}
