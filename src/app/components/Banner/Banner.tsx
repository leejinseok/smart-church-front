"use client";

import { ChurchBanner } from "../../../api/smart-church/smart-church-api-response";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Banner({ banners }: { banners: ChurchBanner[] }) {
  return (
    <>
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
        onSlideChange={() => console.log("slide change")}
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
    </>
  );
}
