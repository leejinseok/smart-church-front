import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import RecoilRootWrapper from "../layout/RecoilWrapper";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const nanumBarunGothicLight = localFont({
  src: "../../public/fonts/nanum-barun-gothic/NanumBarunGothicLight.otf",
});

export const nanumBarunGothicUltraLight = localFont({
  src: "../../public/fonts/nanum-barun-gothic/NanumBarunGothicUltraLight.otf",
});

export const nanumBarunGothic = localFont({
  src: "../../public/fonts/nanum-barun-gothic/NanumBarunGothic.otf",
});

export const nanumBarunGothicBold = localFont({
  src: "../../public/fonts/nanum-barun-gothic/NanumBarunGothicBold.otf",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${nanumBarunGothicLight.className}`}>
      <body>{children}</body>
    </html>
  );
}
