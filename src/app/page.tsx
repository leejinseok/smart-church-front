import "./page.scss";
import HomepageTypeA from "./components/HomepageTypeA/HomepageTypeA";
import { cookies, headers } from "next/headers";
import { PageProps } from "../type/common";
import { Metadata } from "next";
import { HomepageTypeAResponse } from "../type/homepage/homepage-type-a";
import { homepageTypeAApiRepository } from "../repository/homepage-type-a/homepage-type-a-api-repository";
import { ChurchResponse } from "../api/smart-church/smart-church-api-response";
import { churchDefault } from "../type/mock";
import { smartChurchChurchApiRepository } from "../repository/smart-church/smart-church-church-api";
import { getChurchAdminAccessTokenCookie } from "../util/cookie-utils";
import { authApiRepository } from "../repository/smart-church/smart-church-auth-api-repository";
import { redirect, RedirectType } from "next/navigation";

export const metadata: Metadata = {
  title: "스마트처치 | 미리보기 페이지",
  description: "스마트처치",
};

export default async function HomePage({ searchParams }: PageProps) {
  const { editMode } = searchParams;
  const isEdit = editMode === "true";
  const headersValue = headers();
  const uuid = headersValue.get("homepageUuid");

  let homepageTypeAResponse: HomepageTypeAResponse | null = null;
  let churchResponse: ChurchResponse | null = null;
  homepageTypeAResponse = await homepageTypeAApiRepository.getHompage(uuid!);

  if (isEdit) {
    const churchAdminAccessTokenCookie = cookies().get(
      "churchAdminAccessToken",
    );
    const ownerUuid = homepageTypeAResponse.ownerUuid;
    if (ownerUuid) {
      if (churchAdminAccessTokenCookie) {
        const session = await authApiRepository.session(
          churchAdminAccessTokenCookie.value,
        );
        // TODO 이거 테스트
        session.uuid = "4";
        if (session.uuid !== ownerUuid) {
          redirect("/error?errorType=not-owner", RedirectType.push);
        }
      }
    }
  }

  if (homepageTypeAResponse.churchUuid) {
    const res = await smartChurchChurchApiRepository.getChurchByUuid(
      homepageTypeAResponse.churchUuid,
    );
    const json = await res.json();
    churchResponse = { ...json };
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
