import { nanumBarunGothicBold } from "@/app/layout";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
export default function Header() {
  return (
    <div
      style={{
        borderBottom: "1px solid #eee",
      }}
    >
      <nav
        className={`${styles.nav} ${nanumBarunGothicBold.className} container font-size-xxxl d-flex justify-content-space-between align-items-center`}
      >
        <h2>천호제일감리교회</h2>

        <div
          className={`d-flex align-items-center ${styles["right-menu-container"]}`}
        >
          <span>
            <FontAwesomeIcon icon={faBars} width={20} />
          </span>
        </div>
      </nav>
    </div>
  );
}
