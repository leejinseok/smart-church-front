"use client";

import "./HomepageTypeA.scss";
import { ChurchResponse } from "../../../api/smart-church/smart-church-api-response";
import Banner from "./Banner/Banner";
import ChurchDepartment from "./ChurchDepartment/ChurchDepartment";
import Footer from "./Footer/Footer";
import Gallery from "./Gallery/Gallery";
import Header from "./Header/Header";
import Locations from "./Location/Locations";
import ChurchIntro from "./ChurchIntro/ChurchIntro";
import Videos from "./Videos/Videos";
import { HomepageTypeAResponse } from "../../../type/homepage/homepage-type-a";
import Services from "./Service/Services";
import ChurchStaffs from "./Staffs/ChurchStaffs";
import ChurchEditModal from "./ChurchEdit/ChurchEditModal";
import { useState } from "react";

export default function HomepageTypeA({
  isEdit,
  church,
  homepage,
}: {
  isEdit: boolean;
  church: ChurchResponse;
  homepage: HomepageTypeAResponse;
}) {
  const [churchState, setChurchState] = useState({ ...church });

  return (
    <div id="homepage-type-a-component">
      <Header
        church={churchState}
        homepageChurchUuid={homepage.churchUuid}
        churchLogo={homepage.churchLogo}
        isEdit={isEdit}
      />
      <main>
        <div className="container">
          <section>
            <div style={{ paddingTop: 12, paddingBottom: 0 }}>
              <Banner banners={homepage.banners} isEdit={isEdit} />
            </div>
          </section>

          <section>
            <ChurchIntro isEdit={isEdit} churchIntro={homepage.churchIntro} />
          </section>

          <section className="recently-videos">
            <Videos isEdit={isEdit} videos={homepage.videos} />
          </section>

          <section className="service-guide">
            <Services
              isEdit={isEdit}
              worshipServicesAndMeetings={homepage.worshipServicesAndMeetings}
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
              churchStaffs={homepage.churchStaffs}
            />
          </section>

          <section className="gallery">
            <Gallery isEdit={isEdit} gallery={homepage.gallery} />
          </section>

          <section>
            <ChurchDepartment
              isEdit={isEdit}
              churchDepartmentsAndMinistries={
                homepage.churchDepartmentsAndMinistries
              }
            />
          </section>

          <section>
            <Locations
              isEdit={isEdit}
              churchAddress={{
                address: churchState.address,
                latitude: churchState.latitude!,
                longitude: churchState.longitude!,
              }}
            />
          </section>
        </div>
      </main>
      <Footer church={churchState} />

      {isEdit && (
        <ChurchEditModal
          church={churchState}
          updateChurch={(church) => {
            setChurchState(church);
          }}
        />
      )}
    </div>
  );
}
