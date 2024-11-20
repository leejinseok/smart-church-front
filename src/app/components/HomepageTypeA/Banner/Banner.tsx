"use client";

import "./Banner.scss";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChurchBanners } from "../../../../type/homepage/homepage-type-a";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";
import { useEffect, useState } from "react";
import BannerEditModal from "./BannerEditModal/BannerEditModal";
import InvisibleContentGuide from "../../InvisibleContentGuide/InvisibleContentGuide";

export default function Banner({
  banners,
  isEdit = false,
}: {
  banners: ChurchBanners;
  isEdit: boolean;
}) {
  const [bannerEditModalVisible, setBannerEditModalVisible] = useState(false);

  const [bannersState, setBannerState] = useState<ChurchBanners>({
    visible: false,
    items: [],
  });

  useEffect(() => {
    setBannerState({ ...banners });
  }, [banners]);

  useEffect(() => {
    if (bannerEditModalVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [bannerEditModalVisible]);

  const handleClickEditOverlay = () => {
    setBannerEditModalVisible(true);
  };

  const hideBannerEditModal = () => {
    setBannerEditModalVisible(false);
  };

  return (
    <>
      {bannersState.visible ? (
        <div id="banner-component" className="edit-overlay-container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 3000 }}
            loop={bannersState.items.length > 1}
            speed={1200}
            pagination={{ clickable: true }}
          >
            {bannersState.visible &&
              bannersState.items.map((banner, bannerIndex) => {
                return (
                  <SwiperSlide key={bannerIndex}>
                    <img
                      src={banner.imageUrl}
                      alt=""
                      style={{
                        width: "100%",
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
        </div>
      ) : (
        isEdit && (
          <InvisibleContentGuide
            text="배너가 존재하지 않습니다. 해당 영역은 홈페이지에 노출되지 않습니다."
            onClick={() => {
              setBannerEditModalVisible(true);
            }}
          />
        )
      )}

      {bannerEditModalVisible && (
        <BannerEditModal
          hide={hideBannerEditModal}
          banners={bannersState}
          updateBanners={setBannerState}
        />
      )}
    </>
  );
}
