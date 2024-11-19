import "./GalleryEditModal.scss";

import { useEffect, useState } from "react";
import { Gallery } from "../../../../../type/homepage/homepage-type-a";
import DragpanIcon from "../../../../../components/Icon/DragpanIcon";
import TrashIcon from "../../../../../components/Icon/TrashIcon";
import CheckIcon from "../../../../../components/Icon/CheckIcon";
import Sortable from "sortablejs";
import { homepageTypeAMockApiRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-api-json-repository";
import { getCookie } from "../../../../../util/cookie-utils";

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

  useEffect(() => {
    const imagesElement = document.querySelector(
      "#gallery-images",
    ) as HTMLElement;
    if (imagesElement) {
      new Sortable(imagesElement, {
        handle: ".handle",
      });
    }
  }, []);

  const handleChangeDescription = (value: string, itemIndex: number) => {
    const newValue = { ...galleryState };
    newValue.items[itemIndex].description = value;

    setGalleryState({ ...newValue });
  };

  const handleSubmit = async () => {
    const newValue = {
      ...galleryState,
    };

    const tableRowElements = document.querySelectorAll("#gallery-images tr");
    if (tableRowElements) {
      const newItems = [];

      for (let i = 0; i < tableRowElements.length; i++) {
        const dataIndex = tableRowElements[i].getAttribute("data-index");
        newItems.push({
          ...newValue.items[+dataIndex!],
        });
      }
      newValue.items = [...newItems];
    }

    const homepageTypeAId = getCookie("homepageTypeAId");
    if (!homepageTypeAId) {
      return;
    }

    await homepageTypeAMockApiRepository.updateGallery(
      homepageTypeAId,
      newValue,
    );

    updateGallery(newValue);
    hide();
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
                      <tr key={itemIndex} data-index={itemIndex}>
                        <td>
                          <img src={item.imageUrl} alt="" />
                        </td>
                        <td className="description">
                          <textarea
                            value={item.description}
                            onChange={(e) =>
                              handleChangeDescription(e.target.value, itemIndex)
                            }
                          ></textarea>
                        </td>
                        <td>
                          <div className="button-container">
                            <button className="button-4 align-items-center handle">
                              이동
                              <DragpanIcon fill="#888" maxWidth={18} />
                            </button>
                            <button className="button-4 align-items-center">
                              삭제
                              <TrashIcon fill="#888" maxWidth={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="modal__footer text-align-right">
            <button
              type="button"
              className="button-4 d-flex submit align-items-center"
              onClick={handleSubmit}
            >
              적용
              <CheckIcon maxWidth={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
