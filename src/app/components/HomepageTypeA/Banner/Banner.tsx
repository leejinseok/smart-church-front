"use client";

import "./Banner.scss";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ChurchBanner,
  ChurchBanners,
} from "../../../../type/homepage/homepage-type-a";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";
import { useEffect, useState } from "react";
import BannerEditModal from "./BannerEditModal/BannerEditModal";
import VisibilityOffIcon from "../../../../components/Icon/VisibilityOffIcon";

export default function Banner({
  banners,
  isEdit = false,
}: {
  banners: ChurchBanners;
  isEdit: boolean;
}) {
  const [bannerEditModal, setBannerEditModal] = useState({
    visible: false,
  });

  const [bannersState, setBannerState] = useState<ChurchBanners>({
    visible: false,
    items: [],
  });

  useEffect(() => {
    setBannerState({ ...banners });
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
        {bannersState.items.map((banner, bannerIndex) => {
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

      {isEdit && bannersState.items.length === 0 && (
        <div className="no-banner-guide">
          <h3 className="text-align-center">
            <div className="d-flex justify-content-center align-items-center">
              <VisibilityOffIcon maxWidth={24} fill="#838383" />
              <span style={{ marginLeft: 8 }}>
                배너가 존재하지 않습니다. 해당 영역은 홈페이지에 노출되지
                않습니다.
              </span>
            </div>
          </h3>
        </div>
      )}

      {bannerEditModal.visible && (
        <BannerEditModal
          hide={hideBannerEditModal}
          banners={bannersState}
          updateBanners={setBannerState}
        />
      )}
    </div>
  );
}
