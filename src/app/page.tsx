import { ChurchMainInformation } from "@/api/smart-church/smart-church-api-response";
import styles from "./page.module.css";
import StaffGroup from "./components/Staff/StaffGroup";
import Header from "@/components/Header/Header";
import { nanumBarunGothicBold } from "./layout";

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
            name: "장이규",
            description: "하하",
            email: "jang@cheonhojeil.org",
            tel: "010-1004-1004",
            profileImageUrl:
              "http://www.chunhojeil.com/user/saveDir/people/1_img.jpg",
          },
        ],
      },
    ],
    welcome: `천호제일감리교회 홈페이지를 방문해 주신 여러분을 진심으로환영합니다.
    주님의 사랑과 평안이 여러분들에게 가득 하시길 기도드립니다. 
    저는 천호제일교회를 담임하고 있는 장이규 목사입니다. 
    
    저희교회는 1951년 11월 12일에 이곳 천호동에서 시작되어 오늘에이르렀습니다. 
    작은 모습이지만 한손에는 복음을 들고 한손에는 사랑을들고 하나님의 구원의 은혜를 여러분과 나누길 원합니다. 
    함께사랑하며, 축복하며, 서로의 부족한 모습을 채우는 공동체가 되고싶습니다. 이 자리에 여러분을 초대합니다. 

    이 복된 자리에 함께하셔서 잃어버린 행복과 주님이 주시는 자유를 되찾기를 소원합니다.`,
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <section>
            <h3
              className={`${nanumBarunGothicBold.className} font-size-xxxxl font-weight-bold`}
              style={{
                marginBottom: 14,
              }}
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
