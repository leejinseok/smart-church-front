import { GalleryPhoto } from "../../../../api/smart-church/smart-church-api-response";
import "./GalleryModal.scss";
import ArrowBackIcon from "../../../../components/Icon/ArrowBackIcon";
import ArrowForwardIcon from "../../../../components/Icon/ArrowForwardIcon";
import { MouseEvent, useEffect, useState } from "react";
import Swiper from "swiper";

const SwiperSlideContent = ({
  galleryPhoto,
}: {
  galleryPhoto: GalleryPhoto;
}) => {
  return (
    <div className="d-flex justify-content-center swiper-slide__inner">
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 1400 }}>
        <div className="d-flex justify-content-center">
          <img src={galleryPhoto.imageUrl} />
        </div>

        <div style={{ marginTop: 18, maxWidth: 900 }}>
          <p
            style={{ color: "#fff" }}
            className="font-weight-lighter font-size-l"
          >
            {galleryPhoto.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function GalleryModal({
  gallery,
  galleryIndex,
  hide,
}: {
  gallery: GalleryPhoto[];
  galleryIndex: number;
  hide: () => void;
}) {
  const [swiper, setSwiper] = useState<Swiper>();

  useEffect(() => {
    if (!swiper) {
      const nextEl = document.querySelector(
        ".swiper-gallery .swiper-button-next",
      ) as HTMLElement;
      const prevEl = document.querySelector(
        ".swiper-gallery .swiper-button-prev",
      ) as HTMLElement;
      const handleNavigation = (swiper: Swiper) => {
        nextEl.classList.remove("swiper-button-disabled");
        prevEl.classList.remove("swiper-button-disabled");

        if (swiper.activeIndex === gallery.length - 1) {
          nextEl.classList.add("swiper-button-disabled");
        }

        if (swiper.activeIndex === 0) {
          prevEl.classList.add("swiper-button-disabled");
        }
      };

      setSwiper(
        new Swiper(".swiper-gallery", {
          loop: false,
          initialSlide: galleryIndex,
          navigation: {
            nextEl,
            prevEl,
          },

          on: {
            init(swiper) {
              handleNavigation(swiper);
            },

            slideChange(swiper) {
              handleNavigation(swiper);
            },
          },
        }),
      );
    }
  }, [gallery.length, galleryIndex, swiper]);

  const handleClickNextSlide = (e: MouseEvent) => {
    e.stopPropagation();
    swiper?.slideNext();
  };

  const handleClickPrevSlide = (e: MouseEvent) => {
    e.stopPropagation();
    swiper?.slidePrev();
  };

  return (
    <div id="gallery-modal" className="modal-container" onClick={hide}>
      <div className="modal__inner">
        <div
          className="modal__body"
          style={{ marginTop: 0, padding: "40px 0" }}
        >
          <div className="swiper swiper-gallery">
            <div className="swiper-wrapper">
              {gallery.map((galleryPhoto, galleryPhotoIndex) => {
                return (
                  <div key={galleryPhotoIndex} className="swiper-slide">
                    <SwiperSlideContent galleryPhoto={galleryPhoto} />
                  </div>
                );
              })}
            </div>

            <div className="swiper-button-next" onClick={handleClickNextSlide}>
              <ArrowForwardIcon maxWidth={30} />
            </div>
            <div className="swiper-button-prev" onClick={handleClickPrevSlide}>
              <ArrowBackIcon maxWidth={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
