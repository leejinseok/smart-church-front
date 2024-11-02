import "./globals.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import localFont from "next/font/local";

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
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
