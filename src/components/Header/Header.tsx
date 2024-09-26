import { nanumBarunGothicBold } from "@/app/layout";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { ChurchResponse } from "@/api/smart-church/smart-church-api-response";
export default function Header({ church }: { church: ChurchResponse }) {
  return (
    <div>
      <div className={`${styles["mini-nav"]} font-size-s hide`}>
        <div className="d-flex justify-content-space-between container">
          <div className="d-flex align-items-center">
            <a href="#">Smart Church</a>
          </div>

          <div className="d-flex font-size-xs align-items-center">
            {/* <button>로그인</button>
            <button>회원가입</button> */}
            <span>Copyright ©RainyHeaven</span>
          </div>
        </div>
      </div>

      <div
        style={{
          borderBottom: "1px solid #eee",
        }}
      >
        <nav
          className={`${styles.nav} ${nanumBarunGothicBold.className} container d-flex justify-content-space-between align-items-center`}
        >
          <div className="d-flex align-items-center">
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
              <h2 className="d-flex align-items-center font-size-xxl">
                {church.name}
              </h2>
            </a>
          </div>

          <div
            className={`d-flex align-items-center ${styles["right-menu-container"]}`}
          >
            {/* <span>
              <FontAwesomeIcon icon={faMessage} width={26} />
            </span> */}
            <span>
              <FontAwesomeIcon icon={faBars} width={26} />
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
}
