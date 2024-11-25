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
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  churchEditModalState,
  homepageRegisterModalState,
} from "../../../atom/ui";
import HomepageRegisterModal from "./HomepageRegisterModal/HomepageRegisterModal";

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
  const [churchEditModal, setChurchEditModal] =
    useRecoilState(churchEditModalState);

  const [homepageRegisterModal, setHomepageRegisterModal] = useRecoilState(
    homepageRegisterModalState,
  );

  useEffect(() => {
    if (churchState.name === "") {
      setChurchEditModal({ visible: true });
    }
  }, [churchState.name, setChurchEditModal]);

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
            <Banner banners={homepage.banners} isEdit={isEdit} />
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
              directions={homepage.directions || ""}
            />
          </section>
        </div>
      </main>
      <Footer church={churchState} />

      {isEdit && churchEditModal.visible && (
        <ChurchEditModal
          church={churchState}
          updateChurch={(church) => {
            setChurchState(church);
          }}
        />
      )}

      {isEdit && homepageRegisterModal.visible && <HomepageRegisterModal />}
    </div>
  );
}
