import { ChangeEvent, FormEvent, useState } from "react";
import CloseIcon from "../../../../../components/Icon/CloseIcon";
import TrashIcon from "../../../../../components/Icon/TrashIcon";
import { ChurchBanner } from "../../../../../type/homepage/homepage-type-a";
import "./BannerEditModal.scss";
import { homepageTypeALocalStorageRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-repository";

export default function BannerEditModal({
  banners,
  hide,
}: {
  banners: ChurchBanner[];
  hide: () => void;
}) {
  const [bannersState, setBannersState] = useState([...banners]);

  const removeBanner = (bannerIndex: number) => {
    const newBanners = [...bannersState];
    newBanners.splice(bannerIndex, 1);
    setBannersState([...newBanners]);
  };

  const chooseFilesHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (progressEvent: ProgressEvent<FileReader>) => {
        const dataURL = progressEvent.target?.result;
        if (dataURL) {
          setBannersState((prev) => [
            ...prev,
            {
              id: 0,
              imageUrl: dataURL.toString(),
              order: 1,
            },
          ]);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentHomepageTypeA =
      homepageTypeALocalStorageRepository.getHompageTypeA();

    if (!currentHomepageTypeA) {
      return;
    }

    if (currentHomepageTypeA.banners) {
      currentHomepageTypeA.banners = [...bannersState];
    }

    homepageTypeALocalStorageRepository.saveHomepageTypeA(currentHomepageTypeA);

    window.location.reload();
  };
  return (
    <div
      id="banner-edit-modal-component"
      className="modal-container vertical-center font-size-m"
      onClick={hide}
    >
      <div className="modal__inner">
        <div className="modal__body" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleSubmit}>
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
                {bannersState.map((banner, bannerIndex) => {
                  return (
                    <li key={bannerIndex} className="d-flex align-items-center">
                      <div className="image-container">
                        <img src={banner.imageUrl} alt="" />
                      </div>
                      <div className="controls">
                        <button
                          type="button"
                          onClick={() => removeBanner(bannerIndex)}
                        >
                          <TrashIcon maxWidth={24} fill="#888" />
                        </button>
                      </div>
                    </li>
                  );
                })}

                <li>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={chooseFilesHandler}
                  />
                </li>
              </ul>

              <div>
                <button type="submit">변경사항 적용</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
