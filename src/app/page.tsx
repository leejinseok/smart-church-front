import "./page.scss";
import HomepageTypeA from "./components/HomepageTypeA/HomepageTypeA";
import { headers } from "next/headers";
import { PageProps } from "../type/common";
import { Metadata } from "next";
import { HomepageTypeA as HomepageTypeAInterface } from "../type/homepage/homepage-type-a";

const homepageTypeADataWhenEditMode = (churchUuid: string) => {
  return fetch(`http://localhost:8088/homepageTypeA?churchUuid=${churchUuid}`);
};

export const metadata: Metadata = {
  title: "스마트처치 | 미리보기 페이지",
  description: "스마트처치",
};

export default async function Home({ params, searchParams }: PageProps) {
  const { editMode, homepageType } = searchParams;
  const isEdit = editMode === "true";

  const headersValue = headers();
  let homepageData: HomepageTypeAInterface | null = null;
  if (isEdit) {
    const churchUuid = headersValue.get("churchUuid");
    if (homepageType === "A") {
      const res = await homepageTypeADataWhenEditMode(churchUuid!);
      const json = await res.json();
      homepageData = json as HomepageTypeAInterface;
    }
  }

  return (
    <div id="main-page" className={`${isEdit && "edit"}`}>
      {homepageType === "A" && (
        <HomepageTypeA isEdit={isEdit} homepageTypeAData={homepageData!} />
      )}
    </div>
  );
}
