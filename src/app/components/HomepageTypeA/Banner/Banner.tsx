"use client";

import "./Banner.scss";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChurchBanner } from "../../../../type/homepage/homepage-type-a";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";

export default function Banner({
  banners,
  isEdit = false,
}: {
  banners: ChurchBanner[];
  isEdit: boolean;
}) {
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
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log()}
      >
        {banners.map((banner, bannerIndex) => {
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

      {isEdit && <HomepageEditOverlay />}
    </div>
  );
}