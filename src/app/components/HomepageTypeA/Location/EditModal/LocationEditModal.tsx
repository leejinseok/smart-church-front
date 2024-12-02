import { useState } from "react";
import "./LocationEditModal.scss";
import { Directions } from "../../../../../type/homepage/homepage-type-a";
import ApplyButton from "../../../../../components/common/ApplyButton";
import { homepageTypeAApiRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-api-repository";
import {
  getCookie,
  getHomepageUuidCookie,
} from "../../../../../util/cookie-utils";
import EditModalWrapper from "../../../Modal/EditModalWrapper";

export default function LocationEditModal({
  hide,
  directions,
  updateDirections,
}: {
  hide: () => void;
  directions: Directions;
  updateDirections: (directions: Directions) => void;
}) {
  const [directionsState, setDirectionsState] = useState(directions);

  const handleSubmit = async () => {
    const homepageUuid = getHomepageUuidCookie();
    if (!homepageUuid) {
      return;
    }
    const userUuid = getCookie("userUuid");

    await homepageTypeAApiRepository.updateHomepage(
      homepageUuid,
      userUuid || "",
      {
        directions: directionsState,
      },
    );
    updateDirections(directionsState);
    hide();
  };
  return (
    <EditModalWrapper
      id="location-edit-modal"
      className="modal-container edit-modal"
      onClick={hide}
    >
      <div className="modal__header">
        <h3 className="font-size-l font-weight-bold">찾아오시는 길 편집</h3>
      </div>

      <div className="modal__body">
        <div className="form-group">
          <p className="font-weight-bold font-size-m form-group__header">
            제목
          </p>

          <input
            type="text"
            className="font-size-m no-border width-100"
            value={directionsState.title}
            placeholder="찾아오시는 길"
            onChange={(e) =>
              setDirectionsState((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
        </div>

        <div className="form-group">
          <p className="font-weight-bold font-size-m form-group__header">
            설명
          </p>

          <textarea
            className="font-size-m no-border width-100"
            value={directionsState.description}
            placeholder="찾아오는 길을 간단하게 설명해주세요"
            onChange={(e) =>
              setDirectionsState((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className="modal__footer text-align-right">
        <ApplyButton handleClick={handleSubmit} />
      </div>
    </EditModalWrapper>
  );
}
