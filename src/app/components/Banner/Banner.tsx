"use client";

import { useEffect } from "react";
import { ChurchBanner } from "../../../api/smart-church/smart-church-api-response";
import { Navigation, Pagination } from "swiper/modules";
import Swiper from "swiper";

export default function Banner({ banners }: { banners: ChurchBanner[] }) {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      // configure Swiper to use modules
      modules: [Navigation, Pagination],
    });
  }, []);
  return (
    <>
      <div className="swiper">
        <div className="swiper-wrapper">
          {banners.map((banner, bannerIndex) => {
            return (
              <div key={bannerIndex} className="swiper-slide">
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
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-scrollbar"></div>
      </div>
    </>
  );
}
