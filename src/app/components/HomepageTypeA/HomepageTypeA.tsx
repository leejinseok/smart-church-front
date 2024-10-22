"use client";

import "./HomepageTypeA.scss";
import { ChurchResponse } from "../../../api/smart-church/smart-church-api-response";
import { homepageTypeAFormMock } from "../../../type/homepage/homepage-type-a-mock";
import { churchMock } from "../../../type/mock";
import { nanumBarunGothicBold, nanumBarunGothicLight } from "../../layout";
import Banner from "./Banner/Banner";
import ChurchDepartment from "./ChurchDepartment/ChurchDepartment";
import ScrollEventRelatedParent from "./Event/ScrollEventRelatedParent";
import Footer from "./Footer/Footer";
import Gallery from "./Gallery/Gallery";
import Header from "./Header/Header";
import Locations from "./Location/Locations";
import Service from "./Service/Service";
import StaffGroup from "./Staff/StaffGroup";
import Video from "./Video/Video";
import QuillRenderer from "../Quill/QuillRenderer";
import { homepageTypeALocalStorageRepository } from "../../../repository/homepage-type-a/homepage-type-a-repository";

export default function HomepageTypeA({ isEdit }: { isEdit: boolean }) {
  const church: ChurchResponse = {
    ...churchMock,
  };

  let homepageTypeAMock = { ...homepageTypeAFormMock };
  if (isEdit) {
    if (typeof window !== "undefined") {
      const localStorageItem =
        homepageTypeALocalStorageRepository.getHompageTypeA();
      if (localStorageItem) {
        homepageTypeAMock = { ...localStorageItem };
      }
    }
  }

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
            <div style={{ paddingTop: 22, paddingBottom: 0 }}>
              <Banner banners={homepageTypeAMock.banners} isEdit={isEdit} />
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
                <QuillRenderer ops={homepageTypeAMock.churchIntro} />
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
                  <QuillRenderer ops={homepageTypeAMock.churchRegisterGuide} />
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

      <div className="edit-button-container">
        <button
          type="button"
          className={`${nanumBarunGothicLight.className} font-size-l`}
        >
          홈<br />
          페<br />
          이<br />
          지<br />
          <br />
          편<br />
          집<br />
          하<br />기
        </button>
      </div>
    </div>
  );
}
