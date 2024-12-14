"use client";

import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { nanumBarunGothicBold } from "../../../layout";
import { ChurchResponse } from "../../../../api/smart-church/smart-church-api-response";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";
import EditModeNav from "./EditModeNav/EditModeNav";
import { useEffect, useState } from "react";
import LogoEditModal from "./EditModal/LogoEditModal";
import {
  ChurchLogo,
  HomepageTypeAResponse,
} from "../../../../type/homepage/homepage-type-a";
import TinyNav from "./TinyNav/TinyNav";

export default function Header({
  church,
  homepage,
  isEdit = false,
}: {
  church: ChurchResponse;
  homepage: HomepageTypeAResponse;
  isEdit: boolean;
}) {
  const [churchLogoState, setChurchLogoState] = useState<ChurchLogo>();
  const [logoEditModal, setLogoEditModal] = useState({
    visible: false,
  });

  useEffect(() => {
    setChurchLogoState({ ...homepage.churchLogo });
  }, [homepage.churchLogo]);

  const handleClickEditClick = () => {
    setLogoEditModal({ visible: true });
  };

  const hideEditModal = () => {
    setLogoEditModal({ visible: false });
  };

  useEffect(() => {
    if (logoEditModal.visible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [logoEditModal.visible]);

  return (
    <div id="header-component">
      <div
        className="nav-container"
        style={{
          paddingTop: isEdit ? 40 : 32,
        }}
      >
        {isEdit ? (
          <EditModeNav
            homepageStatus={homepage?.homepageInformations?.homepageStatus}
          />
        ) : (
          <TinyNav />
        )}
        <nav
          className={`${nanumBarunGothicBold.className} container d-flex justify-content-center align-items-center`}
        >
          <div className="d-flex church-logo edit-overlay-container">
            <div
              className="d-flex align-items-center"
              style={{
                minWidth: 30,
                minHeight: 30,
              }}
            >
              {churchLogoState && churchLogoState.type !== "TEXT" && (
                <img
                  src={churchLogoState?.image || ""}
                  alt=""
                  style={{
                    marginRight: 16,
                    maxHeight: 50,
                  }}
                />
              )}

              {churchLogoState && churchLogoState.type !== "LOGO" && (
                <span className="font-size-xxl">
                  {churchLogoState.text || church.name}
                </span>
              )}
            </div>
            {isEdit && (
              <HomepageEditOverlay onClickListener={handleClickEditClick} />
            )}
          </div>

          <div className={`d-flex align-items-center right-menu-container`}>
            {/* <span>
              <FontAwesomeIcon icon={faMessage} width={26} />
            </span> */}
            <span
              className="font-size-xl"
              style={{
                display: "inline-flex",
              }}
            >
              <FontAwesomeIcon icon={faBars} width={20} />
            </span>
          </div>
        </nav>
      </div>

      {logoEditModal.visible && (
        <LogoEditModal
          churchLogo={churchLogoState!}
          hide={hideEditModal}
          updateChurchLogo={setChurchLogoState}
        />
      )}
    </div>
  );
}
