"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadScript } from "../../../util/script-utils";

let mapInstance: naver.maps.Map | null = null;

export default function Locations({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const [, setMapLoaded] = useState(false);
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
  useEffect(() => {
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
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
    <div>
      <div id="map" ref={mapRef} style={{ width: "100%", height: 500 }} />
    </div>
  );
}
