"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadScript } from "../../../../util/script-utils";
import { nanumBarunGothicBold } from "../../../layout";
import HomepageEditOverlay from "../../HomepageEdit/HomepageEditOverlay";
import LocationEditModal from "./EditModal/LocationEditModal";
import { Directions } from "../../../../type/homepage/homepage-type-a";

let mapInstance: naver.maps.Map | null = null;

export default function Locations({
  isEdit,
  churchAddress,
  directions,
}: {
  isEdit: boolean;
  churchAddress: {
    address: string;
    latitude: number;
    longitude: number;
  };
  directions: Directions;
}) {
  const [, setMapLoaded] = useState(false);
  const [locationEditModalVisible, setLocationEditModalVisible] =
    useState(false);
  const [directionsState, setDirectionsState] = useState(directions);

  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = useCallback((latitude: number, longitude: number): void => {
    const mapOptions = {
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
      center: new naver.maps.LatLng(latitude, longitude),
      zoom: 16,
    };

    if (document.getElementById("map")) {
      mapInstance = new naver.maps.Map("map", mapOptions);
    }

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude, longitude),
      map: mapInstance!,
    });

    naver.maps.Event.addListener(marker, "click", () => {
      mapInstance?.setCenter(new naver.maps.LatLng(latitude, longitude));
      mapInstance?.setZoom(16);
    });

    setMapLoaded(true);
  }, []);

  useEffect(() => {
    const { latitude, longitude } = churchAddress;
    if (!latitude || !longitude) {
      return;
    }

    if (typeof naver === "undefined") {
      loadScript(
        `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID}&callback=initMap`,
        () => initMap(latitude, longitude),
      );
    } else {
      initMap(latitude, longitude);
    }
  }, [churchAddress, initMap]);

  const handleWindowResize = useCallback(() => {
    const current = mapRef.current;

    if (current) {
      const windowInnerWidth = window.innerWidth;
      if (windowInnerWidth <= 768) {
        current.style.height = "200px";
      } else if (windowInnerWidth <= 1024) {
        current.style.height = "300px";
      } else {
        current.style.height = "500px";
      }
    }
  }, []);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
    <>
      <div className={`${isEdit && "edit-overlay-container"}`}>
        <h3
          className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold`}
        >
          {directionsState.title || "찾아오시는 길"}
        </h3>

        <div>
          <div id="map" ref={mapRef} style={{ width: "100%", height: 500 }} />
          <p style={{ marginTop: 16 }} className="font-size-m font-weight-bold">
            {churchAddress.address}
          </p>

          {directionsState.description && (
            <p style={{ marginTop: 4 }} className="font-size-m">
              {directionsState.description}
            </p>
          )}
        </div>

        {isEdit && (
          <HomepageEditOverlay
            onClickListener={() => setLocationEditModalVisible(true)}
          />
        )}
      </div>

      {isEdit && locationEditModalVisible && (
        <LocationEditModal
          hide={() => setLocationEditModalVisible(false)}
          directions={directionsState}
          updateDirections={(directions) => {
            setDirectionsState(directions);
          }}
        />
      )}
    </>
  );
}
