import StaffGroup from "./components/HomepageTypeA/Staff/StaffGroup";
import { nanumBarunGothicBold } from "./layout";
import Locations from "./components/HomepageTypeA/Location/Locations";
import "./page.scss";
import Service from "./components/HomepageTypeA/Service/Service";
import Gallery from "./components/HomepageTypeA/Gallery/Gallery";
import { churchMainInformationMock, churchMock } from "../type/mock";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { ChurchResponse } from "../api/smart-church/smart-church-api-response";
import Banner from "./components/HomepageTypeA/Banner/Banner";
import Video from "./components/HomepageTypeA/Video/Video";
import ChurchDepartment from "./components/HomepageTypeA/ChurchDepartment/ChurchDepartment";
import ScrollEventRelatedParent from "./components/HomepageTypeA/Event/ScrollEventRelatedParent";
import { homepageTypeAFormMock } from "../type/homepage/homepage-type-a-mock";

export default async function Home() {
  const church: ChurchResponse = {
    ...churchMock,
  };

  // const churchMainInformation = { ...churchMainInformationMock };

  const homepageTypeAMock = { ...homepageTypeAFormMock };

  // let galleryLengthClassName = churchMainInformation.gallery.length

  const generateGalleryContentClassNameByLength = (length: number) => {
    if (length < 4) {
      return `gallery-length-${length}`;
    }

    return "gallery-length-many";
  };

  return (
    <div id="main-page">
      <Header church={church} />
      <main>
        <div className="container">
          <section>
            <div style={{ paddingTop: 22, paddingBottom: 0 }}>
              <Banner banners={homepageTypeAMock.banners} />
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
                {homepageTypeAMock.churchIntro.map((op, opIndex) => {
                  return <p key={opIndex}>{(op.insert as string) || ""}</p>;
                })}
              </div>
            </div>
          </section>

          <section className="recently-videos">
            <div>
              <h3
                className={`${nanumBarunGothicBold.className} font-size-xl font-weight-bold`}
              >
                설교영상
              </h3>

              <div>
                <Video video={homepageTypeAMock.videos} />
              </div>
            </div>
          </section>

          <section>
            <div>
              <h3
                className={`${nanumBarunGothicBold.className} font-size-xl font-weight-bold`}
              >
                사역 및 부서소개
              </h3>

              <div>
                <ChurchDepartment
                  departments={homepageTypeAMock.churchDepartmentsAndMinistries}
                />
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
                {homepageTypeAMock.worshipServicesAndMeetings.map(
                  (service, serviceIndex) => {
                    return <Service key={serviceIndex} service={service} />;
                  },
                )}
              </div>
            </div>
          </section>

          <section>
            <div>
              <h3
                className={`${nanumBarunGothicBold.className} font-size-xl font-weight-bold`}
              >
                교회등록 안내
              </h3>

              <div>
                <div className="font-size-l pre-line">
                  {`1. 새가족 등록 절차
                  1) 예배 참석
                  스마트 교회의 주일예배에 참석해 주시길 바랍니다. 예배는 매주 주일 오전 10시와 오후 2시에 진행됩니다. 예배 후, 새가족을 위한 환영 시간이 마련되어 있으니 꼭 함께해 주세요.

                  2) 새가족 등록 카드 작성
                  예배 후, 안내 데스크에서 새가족 등록 카드를 작성해 주십시오. 등록 카드를 작성해 주시면 담당 교역자나 새가족 담당자가 연락드려, 교회 생활과 프로그램에 대해 자세히 안내해 드립니다.

                  3) 새가족 환영 모임 참석
                  등록을 마치신 후에는 새가족 환영 모임에 참여하게 됩니다. 이 모임에서는 교회의 역사, 비전, 예배 시간 및 다양한 교회 활동에 대한 안내가 이루어지며, 교역자들과 함께 이야기를 나누는 시간도 갖습니다.

                  2. 새가족 교육 및 수료
                  1) 새가족 교육 프로그램
                  새가족 등록 후, 4주 동안 진행되는 새가족 교육 프로그램에 참여해 주십시오. 이 교육에서는 기독교의 기본 교리, 교회의 사명, 그리고 신앙 생활의 기본에 대해 배우게 됩니다. 교육은 매주 주일 오후 3시에 교회 교육관에서 진행됩니다.

                  2) 수료 기준
                  새가족 교육은 총 4주 과정으로, 4회 모두 출석하셔야 수료가 가능합니다. 특별한 사정으로 교육에 참석하지 못한 경우, 담당 교역자에게 미리 알려주시기 바랍니다. 교육을 마친 후에는 수료증이 수여되며, 정식으로 교회의 한 가족으로 환영받게 됩니다.

                  3. 새가족 담당 교역자와의 만남
                  새가족 등록 후, 한 번의 개별 면담을 통해 신앙 상담 및 교회 생활에 대해 더 깊은 이야기를 나눌 수 있습니다. 면담을 통해 교회에서의 섬김과 봉사, 소그룹 활동 참여 등에 대해 안내를 받으실 수 있습니다.

                  4. 새가족 정착을 위한 지원
                  스마트 교회는 새가족들이 교회 생활에 잘 적응할 수 있도록 다양한 지원을 제공합니다.

                  새가족 소그룹 배정: 비슷한 연령대 및 관심사를 가진 소그룹에 배정되어 더 깊은 교제를 나눌 수 있습니다.
                  교회 행사 초대: 교회의 주요 행사 및 프로그램에 초대하여 함께 교제하는 시간을 갖습니다.
                  
                  `}
                </div>
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
                  {homepageTypeAMock.staffGroup.map(
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

          <section className="gallery">
            <div>
              <h3
                className={`${nanumBarunGothicBold.className} font-size-xl font-weight-bold`}
              >
                사진첩
              </h3>

              <div className="gallery-content">
                <div
                  className={`${generateGalleryContentClassNameByLength(homepageTypeAMock.gallery.length)} gallery-content__container clearfix`}
                >
                  <Gallery gallery={homepageTypeAMock.gallery} />
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
                <p
                  style={{ marginTop: 16 }}
                  className="font-size-l font-weight-bold"
                >
                  {church.address}
                </p>
                <p style={{ marginTop: 16 }} className="font-size-l">
                  {/* {churchMock.location.description} */}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer church={church} />

      <ScrollEventRelatedParent />
    </div>
  );
}
