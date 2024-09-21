import { nanumBarunGothicBold } from "@/app/layout";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMessage } from "@fortawesome/free-solid-svg-icons";
export default function Header() {
  return (
    <div>
      <div className={`${styles["mini-nav"]} font-size-s`}>
        <div className="d-flex justify-content-space-between container">
          <div className="d-flex align-items-center">
            <a href="#">SmartChurch</a>
          </div>

          <div className="d-flex">
            <button>로그인</button>
            <button>회원가입</button>
          </div>
        </div>
      </div>

      <div
        style={{
          borderBottom: "1px solid #eee",
        }}
      >
        <nav
          className={`${styles.nav} ${nanumBarunGothicBold.className} container font-size-xxxl d-flex justify-content-space-between align-items-center`}
        >
          <h2>스마트 교회</h2>

          <div
            className={`d-flex align-items-center ${styles["right-menu-container"]}`}
          >
            <span>
              <FontAwesomeIcon icon={faMessage} width={26} />
            </span>
            <span>
              <FontAwesomeIcon icon={faBars} width={26} />
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
}
