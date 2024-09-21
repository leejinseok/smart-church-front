import { ChurchMainInformation } from "@/api/smart-church/smart-church-api-response";
import styles from "./page.module.css";
import StaffGroup from "./components/Staff/StaffGroup";
import Header from "@/components/Header/Header";
import { nanumBarunGothicBold } from "./layout";
import StaffModal from "./components/Staff/StaffModal";

export default async function Home() {
  const churchMainInformation: ChurchMainInformation = {
    id: 1,
    service: [
      {
        type: "SERVICE",
        items: [
          {
            time: "주일 오전 11시",
            title: "주일 2부예배",
          },
        ],
      },
    ],
    location: {
      lat: 100,
      lng: 100,
      description: "잘 찾아오셔",
    },
    staffGroup: [
      {
        type: "목사",
        staffs: [
          {
            name: "김스마트",
            role: "담임목사",
            description: "",
            email: "kim@smart-church.com",
            tel: "010-1004-1004",
            profileImageUrl: "/images/pastor.png",
          },
          {
            name: "박스마트",
            role: "부목사",
            description: "",
            email: "park@smart-church.com",
            tel: "010-1004-1004",
            profileImageUrl: "/images/pastor.png",
          },
        ],
      },
      {
        type: "전도사",
        staffs: [
          {
            name: "김전도사",
            role: "전도사",
            description: "",
            email: null,
            tel: null,
            profileImageUrl: "/images/pastor.png",
          },
        ],
      },
      {
        type: "직원",
        staffs: [
          {
            name: "김직원",
            role: "관리담당",
            description: "",
            email: null,
            tel: null,
            profileImageUrl: "/images/pastor.png",
          },
        ],
      },
    ],
    welcome: `스마트 교회는 예수 그리스도의 복음을 가장 중요한 가치로 삼고, 그분의 가르침을 따라 살아가는 공동체입니다. 
    우리는 모든 세대와 모든 사람들을 환영하며, 복음의 메시지가 일상의 삶 속에서 실현될 수 있도록 돕습니다. 
    전통적 신앙의 깊이와 현대적 접근 방식을 결합하여, 교회의 모든 사역과 활동은 하나님의 사랑을 전하고 이웃을 섬기는 데 중점을 둡니다.

    스마트 교회는 예배뿐만 아니라 소그룹 모임, 교육, 봉사활동을 통해 삶 속에서 복음의 능력을 체험하며, 함께 성장하고 변화되는 교회를 지향합니다. 
    우리의 문은 항상 열려 있으며, 주님의 은혜를 나누기 위해 기도와 헌신으로 함께 나아가고 있습니다.

    - 담임목사 김스마트
`,
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <section>
            <h3
              className={`${nanumBarunGothicBold.className} font-size-xxxxl font-weight-bold`}
            >
              환영인사
            </h3>

            <div className={`font-size-xxl pre-line`}>
              {churchMainInformation.welcome}
            </div>
          </section>

          <section className={`${styles["service-guide"]}`}>
            <h3
              className={`${nanumBarunGothicBold.className} font-size-xxxxl font-weight-bold`}
            >
              예배 및 모임안내
            </h3>

            <div>
              <table className="font-size-xxl">
                <tbody>
                  <tr>
                    <td>주일 1부예배</td>
                    <td>주일 오전 8시 30분</td>
                  </tr>

                  <tr>
                    <td>주일 2부예배</td>
                    <td>주일 오전 11시 30분</td>
                  </tr>

                  <tr>
                    <td>주일 3부예배</td>
                    <td>주일 오후 3시</td>
                  </tr>

                  <tr>
                    <td>주일 젊은이부 예배</td>
                    <td>주일 오후 2시 (벧엘성전)</td>
                  </tr>

                  <tr>
                    <td>수요예배</td>
                    <td>매주 수요일 오후 7시 30분</td>
                  </tr>

                  <tr>
                    <td>새벽예배</td>
                    <td>매일 오전 5시</td>
                  </tr>

                  <tr>
                    <td>금요기도회</td>
                    <td>매주 금요일 오후 9시</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3
              className={`${nanumBarunGothicBold.className} font-size-xxxxl font-weight-bold`}
            >
              섬기는 사람들
            </h3>

            <div>
              {churchMainInformation.staffGroup.map(
                (staffGroup, staffGroupIndex) => {
                  return (
                    <StaffGroup key={staffGroupIndex} staffGroup={staffGroup} />
                  );
                },
              )}
            </div>
          </section>

          <section>
            <h3
              className={`${nanumBarunGothicBold.className} font-size-xxxxl font-weight-bold`}
            >
              찾아오시는길
            </h3>
          </section>
        </div>
      </main>
    </>
  );
}
