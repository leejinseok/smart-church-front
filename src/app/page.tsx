import StaffGroup from "./components/Staff/StaffGroup";
import { nanumBarunGothicBold } from "./layout";
import Locations from "./components/Location/Locations";
import "./page.scss";
import Service from "./components/Service/Service";
import Gallery from "./components/Gallery/Gallery";
import { churchMainInformationMock, churchMock } from "../type/mock";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { ChurchResponse } from "../api/smart-church/smart-church-api-response";
import Banner from "./components/Banner/Banner";
import Video from "./components/Video/Video";
import ChurchDepartment from "./components/ChurchDepartment/ChurchDepartment";

export default async function Home() {
  const church: ChurchResponse = {
    ...churchMock,
  };

  const churchMainInformation = { ...churchMainInformationMock };

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
              <Banner banners={churchMainInformation.banner} />
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

          <section className="recently-videos">
            <div>
              <h3
                className={`${nanumBarunGothicBold.className} font-size-xl font-weight-bold`}
              >
                설교영상
              </h3>

              <div>
                <Video video={churchMainInformation.vedio} />
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
                  departments={churchMainInformation.departments}
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
                교회등록 안내
              </h3>

              <div>
                <div className="font-size-l">
                  대한민국은 통일을 지향하며, 자유민주적 기본질서에 입각한
                  평화적 통일 정책을 수립하고 이를 추진한다. 국가는 평생교육을
                  진흥하여야 한다. 대통령은 국무총리·국무위원·행정각부의 장 기타
                  법률이 정하는 공사의 직을 겸할 수 없다. 행정권은 대통령을
                  수반으로 하는 정부에 속한다. 대통령이 제1항의 기간내에 공포나
                  재의의 요구를 하지 아니한 때에도 그 법률안은 법률로서
                  확정된다.
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

          <section className="gallery">
            <div>
              <h3
                className={`${nanumBarunGothicBold.className} font-size-xl font-weight-bold`}
              >
                사진첩
              </h3>

              <div className="gallery-content">
                <div
                  className={`${generateGalleryContentClassNameByLength(churchMainInformation.gallery.length)} gallery-content__container clearfix`}
                >
                  <Gallery gallery={churchMainInformation.gallery} />
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
