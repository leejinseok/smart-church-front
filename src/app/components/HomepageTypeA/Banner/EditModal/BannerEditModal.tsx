import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import TrashIcon from "../../../../../components/Icon/TrashIcon";
import {
  ChurchBanner,
  ChurchBanners,
} from "../../../../../type/homepage/homepage-type-a";
import "./BannerEditModal.scss";
import Sortable from "sortablejs";
import DragpanIcon from "../../../../../components/Icon/DragpanIcon";
import {
  getChurchAdminAccessTokenCookie,
  getCookie,
  getHomepageUuidCookie,
} from "../../../../../util/cookie-utils";
import Toggle from "../../../Toggle/Toggle";
import { homepageTypeAApiRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-api-repository";
import EditModalWrapper from "../../../Modal/EditModalWrapper";
import ApplyButton from "../../../../../components/common/ApplyButton";
import { authApiRepository } from "../../../../../repository/smart-church/smart-church-auth-api-repository";
import { smartChurchFileApiRepository } from "../../../../../repository/smart-church/smart-church-file-api-repository";

export default function BannerEditModal({
  banners,
  updateBanners,
  hide,
}: {
  banners: ChurchBanners;
  updateBanners: Dispatch<SetStateAction<ChurchBanners>>;
  hide: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [bannersState, setBannersState] = useState<ChurchBanners>({
    visible: false,
    items: [],
  });
  const [bannerItemsSorted, setBannerItemsSorted] = useState<ChurchBanner[]>(
    [],
  );
  const [bannerItemsSortable, setBannerItemsSortable] = useState<Sortable>();
  const bannerItemsRef = useRef(null);

  useEffect(() => {
    setBannersState(banners);
    setBannerItemsSorted(banners.items);
  }, [banners]);

  useEffect(() => {
    setBannerItemsSorted(bannersState.items);
  }, [bannersState.items]);

  useEffect(() => {
    if (!bannersState.visible) {
      return;
    }

    const bannerItemsElement = bannerItemsRef.current;
    if (!bannerItemsElement) {
      return;
    }

    if (!bannerItemsSortable) {
      setBannerItemsSortable(
        new Sortable(bannerItemsElement, {
          animation: 150,
          handle: ".handle",
          onEnd(evt) {
            const oldIndex = evt.oldIndex;
            const newIndex = evt.newIndex;
            if (oldIndex === undefined || newIndex === undefined) {
              return;
            }
            const updatedItems = [...bannersState.items];
            const [movedItem] = updatedItems.splice(oldIndex, 1); // Remove item from old position
            updatedItems.splice(newIndex, 0, movedItem); // Insert item into new position
            setBannerItemsSorted(updatedItems); // Update state with new order
          },
        }),
      );
    }
  }, [
    bannerItemsSortable,
    bannersState.visible,
    bannersState.items,
    banners.items,
  ]);

  const removeBanner = (bannerIndex: number) => {
    const items = bannersState?.items;
    if (!items) {
      return;
    }

    const newBannerItems = [...items];
    newBannerItems.splice(bannerIndex, 1);
    setBannersState((prev) => {
      return {
        ...prev,
        items: [...newBannerItems],
      };
    });
  };

  const chooseFilesHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", "CHURCH_BANNER");
      const res = await smartChurchFileApiRepository.uploadFile(formData);
      const json = await res.json();
      setBannersState((prev) => {
        return {
          ...prev,
          items: [
            ...prev.items,
            {
              id: 0,
              imageUrl: json.url,
              order: 1,
            },
          ],
        };
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bannersState) {
      return;
    }
    const homepageUuid = getHomepageUuidCookie();
    if (!homepageUuid) {
      return;
    }

    const newBanners: ChurchBanners = {
      ...bannersState,
      items: [...bannerItemsSorted],
    };

    const churchAdminAccessTokenCookie = getChurchAdminAccessTokenCookie();
    let userUuid = "";
    if (churchAdminAccessTokenCookie) {
      const session = await authApiRepository.session(
        churchAdminAccessTokenCookie,
      );
      userUuid = session.uuid;
    }

    await homepageTypeAApiRepository.updateHomepage(
      homepageUuid,
      userUuid || "",
      {
        banners: newBanners,
      },
    );

    updateBanners(newBanners);
    hide();
  };
  return (
    <>
      <EditModalWrapper
        className="vertical-center font-size-m"
        id="banner-edit-modal-component"
        onClick={hide}
      >
        <div className="modal__header">
          <h3 className="font-size-l font-weight-bold">배너 편집</h3>
        </div>

        <div className="modal__body" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="form-group">
              <h3 className="font-weight-bold font-size-m form-group__header">
                노출여부
              </h3>
              <div className="d-flex form-group__body">
                <Toggle
                  isActive={bannersState.visible}
                  onClick={() => {
                    setBannersState((prev) => ({
                      ...prev,
                      visible: !prev.visible,
                    }));
                  }}
                />
              </div>
            </div>

            {bannersState.visible && (
              <div className="form-group">
                <h3 className="font-weight-bold font-size-m form-group__header">
                  배너 이미지
                </h3>
                <div className="form-group__body">
                  <ul className="banners" ref={bannerItemsRef}>
                    {bannersState.items.map((banner, bannerIndex) => {
                      return (
                        <li
                          key={bannerIndex}
                          className="d-flex align-items-center"
                        >
                          <div>
                            <div className="handle cursor-pointer">
                              <DragpanIcon maxWidth={30} fill="#9c9c9c" />
                            </div>
                          </div>
                          <div
                            className="image-container"
                            style={{ marginLeft: 6 }}
                          >
                            <img
                              alt="church banner image"
                              src={banner.imageUrl}
                            />
                          </div>
                          <div className="controls">
                            <span
                              className="cursor-pointer"
                              onClick={() => removeBanner(bannerIndex)}
                            >
                              <TrashIcon maxWidth={30} fill="#9c9c9c" />
                            </span>
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
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="modal__footer text-align-right">
          <ApplyButton
            handleClick={() => {
              const current = formRef.current;
              if (!current) {
                return;
              }

              current.requestSubmit();
            }}
          />
        </div>
      </EditModalWrapper>
    </>
  );
}
