import "./page.scss";
import HomepageTypeA from "./components/HomepageTypeA/HomepageTypeA";
import { headers } from "next/headers";
import { PageProps } from "../type/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "스마트처치 | 미리보기 페이지",
  description: "스마트처치",
};

export default async function Home({ params, searchParams }: PageProps) {
  const { editMode, homepageType } = searchParams;
  const isEdit = editMode === "true";
  const headersValue = headers();
  const headersUrl = headersValue.get("url");

  return (
    <div id="main-page" className={`${isEdit && "edit"}`}>
      {homepageType === "A" && <HomepageTypeA isEdit={isEdit} />}
    </div>
  );
}
