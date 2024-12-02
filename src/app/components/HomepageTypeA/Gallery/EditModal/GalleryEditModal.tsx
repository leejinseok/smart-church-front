import "./GalleryEditModal.scss";

import { useEffect, useState } from "react";
import { Gallery } from "../../../../../type/homepage/homepage-type-a";
import DragpanIcon from "../../../../../components/Icon/DragpanIcon";
import TrashIcon from "../../../../../components/Icon/TrashIcon";
import CheckIcon from "../../../../../components/Icon/CheckIcon";
import Sortable from "sortablejs";
import {
  getCookie,
  getHomepageUuidCookie,
} from "../../../../../util/cookie-utils";
import { homepageTypeAApiRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-api-repository";
import CloseIcon from "../../../../../components/Icon/CloseIcon";
import EditModalWrapper from "../../../Modal/EditModalWrapper";

export default function GalleryEditModal({
  gallery,
  updateGallery,
  hide,
}: {
  gallery: Gallery;
  updateGallery: (gallery: Gallery) => void;
  hide: () => void;
}) {
  const [galleryState, setGalleryState] = useState(
    JSON.parse(JSON.stringify(gallery)),
  );

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

    const homepageUuid = getHomepageUuidCookie();
    if (!homepageUuid) {
      return;
    }

    const userUuid = getCookie("userUuid");
    await homepageTypeAApiRepository.updateHomepage(
      homepageUuid,
      userUuid || "",
      {
        gallery: newValue,
      },
    );

    updateGallery(newValue);
    hide();
  };

  const addGallery = (files: FileList | null) => {
    if (!files || !files.length) {
      return;
    }

    // upload and get url

    const newValue = {
      ...galleryState,
    };

    newValue.items.push({
      description: "",
      imageUrl: "",
    });

    setGalleryState(newValue);
  };

  const removeGallery = (index: number) => {
    const newValue = {
      ...galleryState,
    };
    newValue.items.splice(index, 1);
    setGalleryState(newValue);
  };

  return (
    <EditModalWrapper
      id="gallery-edit-modal"
      className="modal-container edit-modal"
      onClick={hide}
    >
      <div className="modal__header">
        <h3 className="font-size-l font-weight-bold">사진첩 편집</h3>
      </div>

      <div className="modal__body">
        <div className="form-group">
          <p className="font-weight-bold font-size-m form-group__header">
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
          <p className="font-weight-bold font-size-m form-group__header">
            항목
          </p>

          <table className="width-100">
            <thead>
              <tr>
                <th>이미지</th>
                <th>설명</th>
                <th>설정</th>
              </tr>
            </thead>

            <tbody id="gallery-images">
              {galleryState.items.map((item, itemIndex) => {
                return (
                  <tr key={itemIndex} data-index={itemIndex}>
                    <td>
                      <div className="image-container">
                        <img src={item.imageUrl} alt="" />
                        <input
                          type="file"
                          id={`item-${itemIndex}-file-changer`}
                          title=""
                          alt=""
                        />
                        <label
                          htmlFor={`item-${itemIndex}-file-changer`}
                        ></label>
                      </div>
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
                        <button
                          className="button-4 align-items-center"
                          onClick={() => removeGallery(itemIndex)}
                        >
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

          <div className="text-align-right" style={{ marginTop: 12 }}>
            <label htmlFor="add-gallery" className="button-4">
              사진 추가 +
            </label>
            <input
              type="file"
              id="add-gallery"
              onChange={(e) => addGallery(e.target.files)}
            />
          </div>
        </div>
      </div>

      <div className="modal__footer text-align-right">
        <button
          type="button"
          className="button-4 cancel"
          onClick={hide}
          style={{
            marginRight: 4,
          }}
        >
          취소
          <CloseIcon maxWidth={18} />
        </button>
        <button
          type="button"
          className="button-4 d-flex submit align-items-center"
          onClick={handleSubmit}
        >
          적용
          <CheckIcon maxWidth={18} />
        </button>
      </div>
    </EditModalWrapper>
  );
}
