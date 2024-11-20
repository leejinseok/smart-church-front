"use client";

import "./Gallery.scss";
import GalleryModal from "./GalleryModal";
import { useCallback, useEffect, useState } from "react";
import { nanumBarunGothicBold } from "../../../layout";
import { Gallery as GalleryType } from "../../../../type/homepage/homepage-type-a";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";
import GalleryEditModal from "./EditModal/GalleryEditModal";

export default function Gallery({
  isEdit,
  gallery,
}: {
  isEdit: boolean;
  gallery: GalleryType;
}) {
  const [galleryState, setGalleryState] = useState({ ...gallery });
  const [galleryModal, setGalleryModal] = useState({
    visible: false,
    galleryPhotoIndex: 0,
  });

  const [galleryEditModalVisible, setGalleryEditModalVisible] = useState(false);

  useEffect(() => {
    if (galleryEditModalVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [galleryEditModalVisible]);

  const handleClickGallery = (galleryPhotoIndex: number) => {
    document.body.classList.add("overflow-hidden");
    setGalleryModal({
      visible: true,
      galleryPhotoIndex,
    });
  };

  const handleClickGalleryModal = () => {
    document.body.classList.remove("overflow-hidden");
    setGalleryModal({
      visible: false,
      galleryPhotoIndex: 0,
    });
  };

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (e.code === "Escape") {
      handleClickGalleryModal();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  const generateGalleryContentClassNameByLength = (length: number) => {
    if (length < 4) {
      return `gallery-length-${length}`;
    }

    return "gallery-length-many";
  };

  return (
    <>
      <div className={`${isEdit && "edit-overlay-container"}`}>
        <h3
          className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold`}
        >
          {galleryState.title || "사진첩"}
        </h3>

        <div className="gallery-content">
          <div
            className={`${generateGalleryContentClassNameByLength(gallery.items.length)} gallery-content__container clearfix`}
          >
            <div id="gallery-component">
              {galleryState.items.map((galleryPhoto, galleryPhotoIndex) => {
                return (
                  <div key={galleryPhotoIndex} className="col gallery-col">
                    <div className="image-container">
                      <img
                        src={galleryPhoto.imageUrl}
                        alt="사진첩 사진"
                        onClick={() => handleClickGallery(galleryPhotoIndex)}
                      />
                    </div>
                  </div>
                );
              })}

              {galleryModal.visible && (
                <GalleryModal
                  gallery={galleryState.items}
                  galleryIndex={galleryModal.galleryPhotoIndex}
                  hide={handleClickGalleryModal}
                />
              )}
            </div>
          </div>
        </div>

        {isEdit && (
          <HomepageEditOverlay
            onClickListener={() => {
              setGalleryEditModalVisible(true);
            }}
          />
        )}
      </div>

      {isEdit && galleryEditModalVisible && (
        <GalleryEditModal
          gallery={galleryState}
          updateGallery={(gallery) => {
            setGalleryState(gallery);
          }}
          hide={() => {
            setGalleryEditModalVisible(false);
          }}
        />
      )}
    </>
  );
}
