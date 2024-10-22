"use client";

import "./Banner.scss";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChurchBanner } from "../../../../type/homepage/homepage-type-a";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";
import { useEffect, useState } from "react";
import BannerEditModal from "./BannerEditModal/BannerEditModal";

export default function Banner({
  banners,
  isEdit = false,
}: {
  banners: ChurchBanner[];
  isEdit: boolean;
}) {
  const [bannerEditModal, setBannerEditModal] = useState({
    visible: false,
  });

  const [bannersState, setBannerState] = useState<ChurchBanner[]>([]);

  useEffect(() => {
    setBannerState([...banners]);
  }, [banners]);

  const handleClickEditOverlay = () => {
    setBannerEditModal((prev) => ({
      ...prev,
      visible: true,
    }));
  };

  const hideBannerEditModal = () => {
    setBannerEditModal((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  return (
    <div id="banner-component">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000 }}
        loop
        speed={1200}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log()}
      >
        {bannersState.map((banner, bannerIndex) => {
          return (
            <SwiperSlide key={bannerIndex}>
              <img
                src={banner.imageUrl}
                alt=""
                style={{
                  width: "100%",
                  height: 500,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {isEdit && (
        <HomepageEditOverlay onClickListener={handleClickEditOverlay} />
      )}

      {bannerEditModal.visible && (
        <BannerEditModal hide={hideBannerEditModal} banners={banners} />
      )}
    </div>
  );
}
