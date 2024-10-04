"use client";

import { GalleryPhoto } from "../../../api/smart-church/smart-church-api-response";
import GalleryModal from "./GalleryModal";
import { useCallback, useEffect, useState } from "react";

export default function Gallery({ gallery }: { gallery: GalleryPhoto[] }) {
  const [galleryModal, setGalleryModal] = useState({
    visible: false,
    galleryPhotoIndex: 0,
  });

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

  return (
    <div>
      {gallery.map((galleryPhoto, galleryPhotoIndex) => {
        return (
          <div key={galleryPhotoIndex} className="col gallery-col">
            <div
              className="image-container"
              onClick={() => handleClickGallery(galleryPhotoIndex)}
            >
              <img src={galleryPhoto.imageUrl} alt="" />
            </div>
          </div>
        );
      })}

      {galleryModal.visible && (
        <GalleryModal
          gallery={gallery}
          galleryIndex={galleryModal.galleryPhotoIndex}
          hide={handleClickGalleryModal}
        />
      )}
    </div>
  );
}
