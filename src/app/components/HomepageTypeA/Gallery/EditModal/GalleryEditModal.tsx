import { useState } from "react";
import { Gallery } from "../../../../../type/homepage/homepage-type-a";

export default function GalleryEditModal({
  gallery,
  updateGallery,
  hide,
}: {
  gallery: Gallery;
  updateGallery: (gallery: Gallery) => void;
  hide: () => void;
}) {
  const [galleryState, setgalleryState] = useState({ ...gallery });

  const handleSubmit = () => {
    updateGallery(galleryState);
  };
  return (
    <div
      id="gallery-edit-modal"
      className="modal-container edit-modal"
      onClick={hide}
    >
      <div className="modal__inner">
        <div className="modal__box" onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">
            <h3 className="font-size-l font-weight-bold">사진첩 편집</h3>
          </div>

          <div className="modal__body">
            <div className="form-group">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
