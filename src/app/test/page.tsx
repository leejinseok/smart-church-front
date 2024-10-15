"use client";

import { useEffect } from "react";

export default function TestPage() {
  useEffect(() => {
    window.addEventListener("scroll", (ev: Event) => {
      window.parent.postMessage(
        "scrollY: " + window.scrollY,
        "http://dev.smart-church.com:3000/test",
      );
    });

    window.addEventListener("message", (ev: MessageEvent) => {
      if (ev.origin.includes("smart-church.com")) {
        window.scrollTo({ left: 0, top: 1000 });
      }
    });

    window.addEventListener("DOMContentLoaded", () => {});
  }, []);

  return (
    <div
      style={{
        height: 20000,
      }}
    ></div>
  );
}
