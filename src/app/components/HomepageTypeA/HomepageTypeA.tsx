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
import ChurchIntro from "./ChurchIntro/ChurchIntro";
import Videos from "./Videos/Videos";
import { HomepageTypeA as HomepageTypeAInterface } from "../../../type/homepage/homepage-type-a";
import Services from "./Service/Services";
import ChurchStaffs from "./Staffs/ChurchStaffs";

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

          <section className="service-guide">
            <Services
              isEdit={isEdit}
              worshipServicesAndMeetings={
                homepageTypeAMock.worshipServicesAndMeetings
              }
            />
          </section>
          {/* 
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
          </section> */}

          <section>
            <ChurchStaffs
              isEdit={isEdit}
              churchStaffs={homepageTypeAMock.churchStaffs}
            />
          </section>

          <section className="gallery">
            <Gallery isEdit={isEdit} gallery={homepageTypeAMock.gallery} />
          </section>

          <section>
            <ChurchDepartment
              isEdit={isEdit}
              churchDepartmentsAndMinistries={
                homepageTypeAMock.churchDepartmentsAndMinistries
              }
            />
          </section>

          <section>
            <Locations
              isEdit={isEdit}
              latitude={37.3595704}
              longitude={127.105399}
            />
            {/* <div>
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
            </div> */}
          </section>
        </div>
      </main>
      <Footer church={church} />
    </div>
  );
}
