import "./page.scss";
import HomepageTypeA from "./components/HomepageTypeA/HomepageTypeA";
import { cookies, headers } from "next/headers";
import { PageProps } from "../type/common";
import { Metadata } from "next";
import { HomepageTypeAResponse } from "../type/homepage/homepage-type-a";
import { homepageTypeAApiRepository } from "../repository/homepage-type-a/homepage-type-a-api-repository";
import { ChurchResponse } from "../api/smart-church/smart-church-api-response";
import { churchDefault } from "../type/mock";

export const metadata: Metadata = {
  title: "스마트처치 | 미리보기 페이지",
  description: "스마트처치",
};

export default async function Home({ searchParams }: PageProps) {
  const { editMode } = searchParams;
  const isEdit = editMode === "true";
  const headersValue = headers();
  const uuid = headersValue.get("homepageUuid");

  let homepageTypeAResponse: HomepageTypeAResponse | null = null;
  let churchResponse: ChurchResponse | null = null;
  homepageTypeAResponse = await homepageTypeAApiRepository.getHompage(uuid!);

  if (homepageTypeAResponse.churchUuid) {
    // TODO api에서 불러와야함
    churchResponse = churchDefault;
  } else {
    // churchUuid가 없으면 현재 최초 작성이라는 의미
    const churchTemporary = cookies().get("churchTemporary");
    if (churchTemporary) {
      churchResponse = JSON.parse(
        decodeURIComponent(churchTemporary.value),
      ) as ChurchResponse;
    } else {
      churchResponse = churchDefault;
    }
  }

  return (
    <div id="main-page" className={`${isEdit && "edit"}`}>
      <HomepageTypeA
        isEdit={isEdit}
        church={churchResponse}
        homepage={homepageTypeAResponse!}
      />
    </div>
  );
}
