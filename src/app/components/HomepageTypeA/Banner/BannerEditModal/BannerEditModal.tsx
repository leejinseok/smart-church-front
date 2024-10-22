import CloseIcon from "../../../../../components/Icon/CloseIcon";
import TrashIcon from "../../../../../components/Icon/TrashIcon";
import { ChurchBanner } from "../../../../../type/homepage/homepage-type-a";
import "./BannerEditModal.scss";

export default function BannerEditModal({
  banners,
  hide,
}: {
  banners: ChurchBanner[];
  hide: () => void;
}) {
  return (
    <div
      id="banner-edit-modal-component"
      className="modal-container vertical-center font-size-m"
      onClick={hide}
    >
      <div className="modal__inner">
        <div className="modal__body" onClick={(e) => e.stopPropagation()}>
          <p
            className="font-size-m font-weight-bold"
            style={{
              marginBottom: 6,
            }}
          >
            배너 편집
          </p>

          <div>
            <ul className="banners">
              {banners.map((banner, bannerIndex) => {
                return (
                  <li key={bannerIndex} className="d-flex align-items-center">
                    <div className="image-container">
                      <img src={banner.imageUrl} alt="" />
                    </div>
                    <div className="controls">
                      <button type="button">
                        <TrashIcon maxWidth={24} fill="#888" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
