"use client";

import { GalleryPhoto } from "../../../api/smart-church/smart-church-api-response";
import GalleryModal from "./GalleryModal";
import { useState } from "react";

export default function Gallery({ gallery }: { gallery: GalleryPhoto[] }) {
  const [galleryModal, setGalleryModal] = useState({
    visible: false,
    galleryPhoto: {
      imageUrl: "",
      description: "",
    } as GalleryPhoto,
  });

  const handleClickGallery = (galleryPhoto: GalleryPhoto) => {
    document.body.classList.add("overflow-hidden");
    setGalleryModal({
      visible: true,
      galleryPhoto,
    });
  };

  const handleClickGalleryModal = () => {
    document.body.classList.remove("overflow-hidden");
    setGalleryModal({
      visible: false,
      galleryPhoto: {
        imageUrl: "",
        description: "",
      },
    });
  };

  return (
    <>
      {gallery.map((gallery, galleryIndex) => {
        return (
          <div key={galleryIndex} className="col gallery-col">
            <div
              className="image-container"
              onClick={() => handleClickGallery(gallery)}
            >
              <img src={gallery.imageUrl} alt="" />
            </div>
          </div>
        );
      })}

      {galleryModal.visible && (
        <GalleryModal
          galleryPhoto={galleryModal.galleryPhoto}
          hide={handleClickGalleryModal}
        />
      )}
    </>
  );
}
