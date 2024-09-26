"use client";

import { useCallback, useEffect, useState } from "react";

let mapInstance: naver.maps.Map | null = null;

const loadScript = (src: string, callback: () => void) => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.onload = () => callback();
  document.head.appendChild(script);
};

export default function Locations({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const [isMapLoaded, setMapLoaded] = useState(false);

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

    console.log("mapInstance", mapInstance);

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

  return (
    <div>
      <div id="map" style={{ width: "100%", height: 600 }} />
    </div>
  );
}
