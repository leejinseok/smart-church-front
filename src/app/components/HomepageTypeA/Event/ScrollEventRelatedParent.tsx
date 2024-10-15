"use client";

import { useEffect } from "react";

export default function ScrollEventRelatedParent() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const scrollEventListener = () => {
      window.parent.postMessage(
        "scrollY: " + window.scrollY,
        "http://localhost:3000/",
      );
    };
    window.addEventListener("scroll", scrollEventListener);

    const domReadyListener = () => {
      window.parent.postMessage("DOMContentLoaded", "http://localhost:3000/");
    };
    if (document.readyState === "complete") {
      domReadyListener();
    } else {
      document.addEventListener("DOMContentLoaded", domReadyListener);
    }

    const messageEventListener = (ev: MessageEvent) => {
      if (ev.origin.includes("localhost")) {
        window.scrollTo({ left: 0, top: ev.data });
      }
    };
    window.addEventListener("message", messageEventListener);

    return () => {
      window.removeEventListener("scroll", scrollEventListener);
      window.removeEventListener("message", messageEventListener);
    };
  }, []);

  return <></>;
}
