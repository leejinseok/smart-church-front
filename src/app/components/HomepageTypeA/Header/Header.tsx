import "./Header.scss";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { nanumBarunGothicBold } from "../../../layout";
import { ChurchResponse } from "../../../../api/smart-church/smart-church-api-response";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";

export default function Header({
  church,
  isEdit = false,
}: {
  church: ChurchResponse;
  isEdit: boolean;
}) {
  return (
    <div id="header-component">
      <div className={`${styles["mini-nav"]} font-size-s`}>
        <div className="d-flex justify-content-space-between container">
          <div className="d-flex align-items-center">
            <a href="#">Smart Church</a>
          </div>

          <div className="d-flex font-size-xs align-items-center">
            <button>게시하기</button>
            <button>나가기</button>
            {/* <span>Copyright ©RainyHeaven</span> */}
          </div>
        </div>
      </div>

      <div className="nav-container">
        <nav
          className={`${styles.nav} ${nanumBarunGothicBold.className} container d-flex justify-content-space-between align-items-center`}
        >
          <div className="d-flex align-items-center church-logo">
            <a href="#" className="d-flex">
              <Image
                src={"/images/sample-church-logo.png"}
                alt="logo"
                width={40}
                height={40}
                style={{
                  borderRadius: 100,
                  marginRight: 16,
                }}
              />
              <h2 className="d-flex align-items-center font-size-xl">
                {church.name}
              </h2>
            </a>
            {isEdit && <HomepageEditOverlay />}
          </div>

          <div
            className={`d-flex align-items-center ${styles["right-menu-container"]}`}
          >
            {/* <span>
              <FontAwesomeIcon icon={faMessage} width={26} />
            </span> */}
            <span className="font-size-xl">
              <FontAwesomeIcon icon={faBars} width={20} />
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
}
