import "./page.scss";
import HomepageTypeA from "./components/HomepageTypeA/HomepageTypeA";
import { headers } from "next/headers";
import { PageProps } from "../type/common";
import { Metadata } from "next";
import { HomepageTypeA as HomepageTypeAInterface } from "../type/homepage/homepage-type-a";
import { homepageTypeAApiRepository } from "../repository/homepage-type-a/homepage-type-a-api-repository";

export const metadata: Metadata = {
  title: "스마트처치 | 미리보기 페이지",
  description: "스마트처치",
};

export default async function Home({ searchParams }: PageProps) {
  const { editMode } = searchParams;
  const isEdit = editMode === "true";

  const headersValue = headers();
  let homepageTypeAData: HomepageTypeAInterface | null = null;
  if (isEdit) {
    // 편집인경우
    // 로그인한 경우

    //로그인 안한경우
    const uuid = headersValue.get("uuid");
    console.log("uuid", uuid);
    homepageTypeAData = await homepageTypeAApiRepository.getHompage(uuid!);
  } else {
    const uuid = headersValue.get("uuid");
    homepageTypeAData = await homepageTypeAApiRepository.getHompage(uuid!);
  }

  return (
    <div id="main-page" className={`${isEdit && "edit"}`}>
      <HomepageTypeA isEdit={isEdit} homepageTypeAData={homepageTypeAData!} />
    </div>
  );
}
