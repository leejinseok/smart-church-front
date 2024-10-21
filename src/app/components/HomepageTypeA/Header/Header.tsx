"use client";

import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { nanumBarunGothicBold } from "../../../layout";
import { ChurchResponse } from "../../../../api/smart-church/smart-church-api-response";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";
import EditModeNav from "./EditMode/EditModeNav";
import { useEffect, useState } from "react";
import LogoEditModal from "./LogoEditModal/LogoEditModal";
import { ChurchLogo } from "../../../../type/homepage/homepage-type-a";

export default function Header({
  church,
  churchLogo,
  isEdit = false,
}: {
  church: ChurchResponse;
  churchLogo: ChurchLogo;
  isEdit: boolean;
}) {
  const [churchLogoState, setChurchLogoState] = useState<ChurchLogo>();
  const [logoEditModal, setLogoEditModal] = useState({
    visible: false,
  });

  const handleClickEditClick = () => {
    setLogoEditModal({ visible: true });
  };

  const hideEditModal = () => {
    setLogoEditModal({ visible: false });
  };

  useEffect(() => {
    setChurchLogoState(churchLogo);
  }, [churchLogo]);

  return (
    <div id="header-component">
      <div
        className="nav-container"
        style={{
          paddingTop: isEdit ? 40 : 0,
        }}
      >
        <EditModeNav />
        <nav
          className={`${nanumBarunGothicBold.className} container d-flex justify-content-space-between align-items-center`}
        >
          <div className="d-flex align-items-center church-logo">
            <div className="d-flex">
              <Image
                src={churchLogoState?.image || "/images/sample-church-logo.png"}
                alt="logo"
                width={40}
                height={40}
                style={{
                  borderRadius: 100,
                  marginRight: 16,
                }}
              />
              {churchLogoState?.type === "LOGO_AND_CHURCH_NAME" && (
                <span className="d-flex align-items-center font-size-xl">
                  {church.name}
                </span>
              )}
            </div>
            {isEdit && (
              <HomepageEditOverlay onClickListener={handleClickEditClick} />
            )}
          </div>

          <div className={`d-flex align-items-center `}>
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
        <LogoEditModal churchLogo={churchLogo} hide={hideEditModal} />
      )}
    </div>
  );
}
