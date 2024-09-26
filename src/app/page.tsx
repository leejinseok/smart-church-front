import {
  ChurchMainInformation,
  ChurchResponse,
} from "@/api/smart-church/smart-church-api-response";
// import styles from "./page.module.css";
import StaffGroup from "./components/Staff/StaffGroup";
import Header from "@/components/Header/Header";
import { nanumBarunGothicBold } from "./layout";
import Locations from "./components/Location/Locations";
import Footer from "@/components/Footer/Footer";
import "./page.scss";
import Service from "./components/Service/Service";

export default async function Home() {
  const church: ChurchResponse = {
    id: 1,
    name: "스마트 처치",
    email: "smartchurch@smart-church.com",
    tel: "02-1004-1004",
    logoImageUrl: "",
    footerLogoImageUrl: "",
    address: "서울시 아무구 아무동 아무번지",
  };

  const churchMainInformation: ChurchMainInformation = {
    churchId: church.id,
    service: [
      {
        type: "SERVICE",
        items: [
          {
            title: "주일 1부예배",
            time: "오전 8시 30분",
            location: "본당 (지하 2층)",
          },
          {
            title: "주일 2부예배",
            time: "오전 11시 30분",
            location: "본당 (지하 2층)",
          },
          {
            title: "주일 3부예배",
            time: "오후 2시",
            location: "본당 (지하 2층)",
          },
          {
            title: "젊은이부 예배",
            time: "주일 오후 2시",
            location: "벧엘성전 (4층)",
          },
          {
            title: "수요예배",
            time: "오후 7시 30분",
            location: "본당 (지하2층)",
          },
          {
            title: "금요예배",
            time: "오후 9시",
            location: "본당 (지하2층)",
          },
          {
            title: "새벽예배",
            time: "매일 오전 5시",
            location: "본당 (지하2층)",
          },
        ],
      },
    ],
    location: {
      lat: 100,
      lng: 100,
      description: `사실주의를 만들, 있는 금융과 감동을 무상하다. 교통사고다 움직이다 백 그가 처사나 새롭다. 방침이자 행위가 순조롭는 지붕과 속을 역사가 한, 하지만, 핀다. 농촌이요 있어 많아야 취임을, 것, 아니는지 때문 쓴, 틀리다. 과학의 씨 블랙커피까지 감정이 응답은, 해소한 있는데 들다. 알갱이 초고속을 녹화가 떠들썩하다 스니프터다 증명하여서 생각하다 것 하다. 그 확보하지 쫄쫄 자동차다 뜻을 실에 거 때의 이러하고 청정하다. 예 언제 채권을 이런 표다 서두르다. 10일 형성은 생각은 쫓을 들어가는 그에서 그 삶의 쓰다.
`,
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
    <div id="main-page">
      <Header church={church} />
      <main>
        <div className="container">
          <section>
            <div style={{ paddingTop: 22, paddingBottom: 0 }}>
              <img
                src="/images/banner/banner-02.jpg"
                alt=""
                style={{
                  width: "100%",
                  height: 500,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </section>

          <section>
            <div>
              <h3
                className={`${nanumBarunGothicBold.className} font-size-xl font-weight-bold`}
              >
                교회소개
              </h3>

              <div className={`font-size-l pre-line`}>
                {churchMainInformation.welcome}
              </div>
            </div>
          </section>

          <section className="service-guide">
            <div>
              <h3
                className={`${nanumBarunGothicBold.className} font-size-xl font-weight-bold`}
              >
                예배 및 모임안내
              </h3>

              <div>
                {churchMainInformation.service.map((service, serviceIndex) => {
                  return <Service key={serviceIndex} service={service} />;
                })}
              </div>
            </div>
          </section>

          <section>
            <div>
              <h3
                className={`${nanumBarunGothicBold.className} font-size-xl font-weight-bold`}
              >
                섬기는 사람들
              </h3>

              <div>
                <div>
                  {churchMainInformation.staffGroup.map(
                    (staffGroup, staffGroupIndex) => {
                      return (
                        <StaffGroup
                          key={staffGroupIndex}
                          staffGroup={staffGroup}
                        />
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </section>

          <section>
            <div>
              <h3
                className={`${nanumBarunGothicBold.className} font-size-xl font-weight-bold`}
              >
                찾아오시는 길
              </h3>

              <div>
                <Locations latitude={37.3595704} longitude={127.105399} />
                <p style={{ marginTop: 16 }} className="font-size-l">
                  {churchMainInformation.location.description}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer church={church} />
    </div>
  );
}
