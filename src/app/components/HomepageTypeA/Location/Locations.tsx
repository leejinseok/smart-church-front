"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadScript } from "../../../../util/script-utils";
import { nanumBarunGothicBold } from "../../../layout";

let mapInstance: naver.maps.Map | null = null;

export default function Locations({ isEdit }: { isEdit: boolean }) {
  const [, setMapLoaded] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
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

  const clientId = "2xkw517mhy";
  const clientSecret = "fdyRV2M4EAh3vr1tA5jiTyFzzBPbHvbbtv6AgeqZ";

  useEffect(() => {
    function searchAddress() {
      const address = document.getElementById("address")?.value;
      if (!address) {
        return;
      }

      fetch(
        `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`,
        {
          method: "GET",
          headers: {
            "X-NCP-APIGW-API-KEY-ID": clientId,
            "X-NCP-APIGW-API-KEY": clientSecret,
          },
        },
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.addresses.length > 0) {
            const { x, y } = data.addresses[0]; // x: 경도, y: 위도
            document.getElementById("coords").innerText =
              `위도: ${y}, 경도: ${x}`;
            const newCenter = new naver.maps.LatLng(y, x);
            map.setCenter(newCenter);
          } else {
            alert("주소를 찾을 수 없습니다.");
          }
        })
        .catch((error) => console.error("Error fetching geocode data:", error));
    }

    searchAddress();
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) {
      return;
    }

    if (typeof naver === "undefined") {
      loadScript(
        `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}&callback=initMap`,
        () => initMap(latitude, longitude),
      );
    } else {
      initMap(latitude, longitude);
    }
  }, [initMap, latitude, longitude]);

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
      <div>
        <h3
          className={`${nanumBarunGothicBold.className} font-size-l font-weight-bold`}
        >
          찾아오시는 길
        </h3>

        <div>
          <div id="map" ref={mapRef} style={{ width: "100%", height: 500 }} />
          <p style={{ marginTop: 16 }} className="font-size-l font-weight-bold">
            {/* {church.address} */}
          </p>
          <p style={{ marginTop: 16 }} className="font-size-l"></p>
        </div>
      </div>
    </>
  );
}
