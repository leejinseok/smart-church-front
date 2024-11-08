"use client";

import "./HomepageTypeA.scss";
import { ChurchResponse } from "../../../api/smart-church/smart-church-api-response";
import { churchMock } from "../../../type/mock";
import { nanumBarunGothicBold } from "../../layout";
import Banner from "./Banner/Banner";
import ChurchDepartment from "./ChurchDepartment/ChurchDepartment";
import Footer from "./Footer/Footer";
import Gallery from "./Gallery/Gallery";
import Header from "./Header/Header";
import Locations from "./Location/Locations";
import Service from "./Service/Service";
import StaffGroup from "./Staff/StaffGroup";
import QuillRenderer from "../Quill/QuillRenderer";
import ChurchIntro from "./ChurchIntro/ChurchIntro";
import Videos from "./Videos/Videos";
import { HomepageTypeA as HomepageTypeAInterface } from "../../../type/homepage/homepage-type-a";
import Services from "./Service/Services";

export default function HomepageTypeA({
  isEdit,
  homepageTypeAData,
}: {
  isEdit: boolean;
  homepageTypeAData: HomepageTypeAInterface;
}) {
  const church: ChurchResponse = {
    ...churchMock,
  };

  const homepageTypeAMock = { ...homepageTypeAData };

  const generateGalleryContentClassNameByLength = (length: number) => {
    if (length < 4) {
      return `gallery-length-${length}`;
    }

    return "gallery-length-many";
  };

  return (
    <div id="homepage-type-a-component">
      <Header
        church={church}
        churchLogo={homepageTypeAMock.churchLogo}
        isEdit={isEdit}
      />
      <main>
        <div className="container">
          <section>
            <div style={{ paddingTop: 12, paddingBottom: 0 }}>
              <Banner banners={homepageTypeAMock.banners} isEdit={isEdit} />
            </div>
          </section>

          <section>
            <ChurchIntro
              isEdit={isEdit}
              churchIntro={homepageTypeAMock.churchIntro}
            />
          </section>

          <section className="recently-videos">
            <Videos isEdit={isEdit} videos={homepageTypeAMock.videos} />
          </section>

          <section>
            {/* <h3
                className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold`}
              >
                사역 및 부서소개
              </h3> */}

            {/* <div>
                <ChurchDepartment
                  departments={homepageTypeAMock.churchDepartmentsAndMinistries}
                />
              </div> */}

            <ChurchDepartment
              isEdit={isEdit}
              churchDepartmentsAndMinistries={
                homepageTypeAMock.churchDepartmentsAndMinistries
              }
            />
          </section>

          <section className="service-guide">
            <Services
              isEdit={isEdit}
              worshipServicesAndMeetings={
                homepageTypeAMock.worshipServicesAndMeetings
              }
            />
          </section>

          <section>
            <div>
              <h3
                className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold`}
              >
                교회등록 안내
              </h3>

              <div>
                <div className="font-size-m pre-line">
                  <QuillRenderer ops={homepageTypeAMock.churchRegisterGuide} />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div>
              <h3
                className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold`}
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
                className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold`}
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
                className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold`}
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
                <p style={{ marginTop: 16 }} className="font-size-l"></p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer church={church} />
    </div>
  );
}
