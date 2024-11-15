import "./GalleryEditModal.scss";

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
  const [galleryState, setGalleryState] = useState({ ...gallery });

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
              <p
                className="font-weight-bold font-size-m"
                style={{ marginBottom: 0 }}
              >
                제목
              </p>

              <input
                type="text"
                className="font-size-m no-border"
                value={galleryState.title}
                onChange={(e) =>
                  setGalleryState((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>

            <div className="form-group">
              <p
                className="font-weight-bold font-size-m"
                style={{ marginBottom: 12 }}
              >
                항목
              </p>

              <table className="width-100">
                <thead>
                  <th>이미지</th>
                  <th>설명</th>
                  <th>설정</th>
                </thead>

                <tbody id="gallery-images">
                  {galleryState.items.map((item, itemIndex) => {
                    return (
                      <tr key={itemIndex}>
                        <td>
                          <img src={item.imageUrl} alt="" />
                        </td>
                        <td>
                          <textarea value={item.description}></textarea>
                        </td>
                        <td>
                          <div className="nowrap button-container">
                            <button className="button-4">이동</button>
                            <button className="button-4">삭제</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
