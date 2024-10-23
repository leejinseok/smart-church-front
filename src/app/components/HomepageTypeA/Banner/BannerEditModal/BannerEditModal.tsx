import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import CloseIcon from "../../../../../components/Icon/CloseIcon";
import TrashIcon from "../../../../../components/Icon/TrashIcon";
import { ChurchBanner } from "../../../../../type/homepage/homepage-type-a";
import "./BannerEditModal.scss";
import { homepageTypeALocalStorageRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-repository";

export default function BannerEditModal({
  banners,
  updateBanners,
  hide,
}: {
  banners: ChurchBanner[];
  updateBanners: Dispatch<SetStateAction<ChurchBanner[]>>;
  hide: () => void;
}) {
  const [bannersState, setBannersState] = useState<ChurchBanner[]>([]);
  useEffect(() => {
    setBannersState(banners);
  }, [banners]);

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
          if (!bannersState) {
            return;
          }

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
    homepageTypeALocalStorageRepository.updateBannners(bannersState);
    updateBanners(bannersState);
    hide();
  };
  return (
    <div
      id="banner-edit-modal-component"
      className="modal-container edit-modal vertical-center font-size-m"
      onClick={hide}
    >
      <div className="modal__inner">
        <div className="modal__box">
          <div className="modal__header">
            <h3 className="font-size-m font-weight-bold">배너 편집</h3>
          </div>

          <div className="modal__body" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <span className="font-weight-bold">노출여부</span>
                <div>
                  <input type="checkbox" />
                </div>
              </div>

              <div className="form-group">
                <span className="font-weight-bold">배너 이미지</span>
                <ul className="banners">
                  {bannersState.map((banner, bannerIndex) => {
                    return (
                      <li
                        key={bannerIndex}
                        className="d-flex align-items-center"
                      >
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

                <div style={{ marginTop: 14 }}>
                  <button type="submit" className="width-100">
                    변경사항 적용
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
