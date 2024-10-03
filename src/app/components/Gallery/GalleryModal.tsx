import { Swiper, SwiperSlide } from "swiper/react";
import { GalleryPhoto } from "../../../api/smart-church/smart-church-api-response";
import "./GalleryModal.scss";
import ArrowBackIcon from "../../../components/Icon/ArrowBackIcon";
import ArrowForwardIcon from "../../../components/Icon/ArrowForwardIcon";
import { Navigation } from "swiper/modules";
import { MouseEvent } from "react";

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
  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div id="gallery-modal" className="modal-container" onClick={hide}>
      <div className="modal__inner">
        <div
          className="modal__body"
          style={{ marginTop: 0, padding: "40px 0" }}
        >
          <Swiper
            modules={[Navigation]}
            initialSlide={galleryIndex}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
          >
            {gallery.map((galleryPhoto, galleryPhotoIndex) => {
              return (
                <SwiperSlide key={galleryPhotoIndex}>
                  <SwiperSlideContent galleryPhoto={galleryPhoto} />
                </SwiperSlide>
              );
            })}

            <div className="swiper-button-next" onClick={stopPropagation}>
              <ArrowForwardIcon maxWidth={30} />
            </div>
            <div className="swiper-button-prev" onClick={stopPropagation}>
              <ArrowBackIcon maxWidth={30} />
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
