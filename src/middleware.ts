import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { homepageTypeADefault } from "./type/homepage/homepage-type-a-mock";
import { homepageTypeAApiRepository } from "./repository/homepage-type-a/homepage-type-a-api-repository";
import { cookies } from "next/headers";
import { authApiRepository } from "./repository/smart-church/smart-church-auth-api-repository";
import { NextURL } from "next/dist/server/web/next-url";
import { redirect } from "next/navigation";
import { smartChurchSessionUserApiRepository } from "./repository/smart-church/smart-church-session-user-api";

const convertToParams = (queryString: string) => {
  const params = new URLSearchParams(queryString);
  return Object.fromEntries(
    Array.from(params.entries(), ([key, value]) => [
      key,
      value === "true" ? true : value,
    ]),
  );
};

const applyInEditMode = async (
  nextUrl: NextURL,
  search: string,
  homepageUuid: string,
): Promise<NextResponse<unknown>> => {
  const headers: HeadersInit = new Headers();
  const churchAdminAccessCookie = cookies().get("churchAdminAccessToken");

  // homepageUuid가 query에 존재하면
  if (homepageUuid) {
    headers.append("homepageUuid", `${homepageUuid}`);
    const res = await homepageTypeAApiRepository.getHompage(`${homepageUuid}`);

    if (res) {
      const next = NextResponse.next({
        headers,
      });

      const homepageOwnerUuid = res.ownerUuid;

      if (homepageOwnerUuid) {
        if (!churchAdminAccessCookie) {
          return NextResponse.redirect(
            `${nextUrl.origin}/error?type=must-logined`,
          );
        }

        const session = await authApiRepository.session(
          churchAdminAccessCookie.value,
        );

        const sessionUuid = session.uuid;

        if (sessionUuid !== homepageOwnerUuid) {
          return NextResponse.redirect(
            `${nextUrl.origin}/error?type=not-your-owned`,
          );
        }
      }

      next.cookies.set("homepageUuid", `${res.uuid}`);
      return next;
    }
  } else {
    let ownerUuid = "";
    let churchUuid = null;

    // 로그인한 사용자라면
    if (churchAdminAccessCookie) {
      const session = await authApiRepository.session(
        churchAdminAccessCookie.value,
      );
      ownerUuid = session.uuid;

      const church = await smartChurchSessionUserApiRepository.getChurch(
        churchAdminAccessCookie.value,
      );
      churchUuid = church.uuid;
    }

    const homepage = await homepageTypeAApiRepository.saveHomepage({
      ...homepageTypeADefault,
      ownerUuid,
      churchUuid,
    });

    const redirect = NextResponse.redirect(
      `${nextUrl.origin}${search}&uuid=${homepage.uuid}`,
    );
    return redirect;
  }

  return NextResponse.next({
    headers,
  });
};

export async function middleware(request: NextRequest) {
  const headers: HeadersInit = new Headers();

  const nextUrl = request.nextUrl;
  const search = nextUrl.search;

  const params = convertToParams(search);
  const editMode = params["editMode"];
  const homepageUuid = params["uuid"];

  if (editMode === true) {
    return applyInEditMode(nextUrl, search, homepageUuid as string);
  }

  // homepage uuid를 얻어와야한다. sub domain을 참조 혹은 path를 참조
  headers.append("homepageUuid", `${homepageUuid}`);
  const homepage = await homepageTypeAApiRepository.getHompage(
    `${homepageUuid}`,
  );

  if (homepage) {
    const next = NextResponse.next({
      headers,
    });
    next.cookies.set("homepageUuid", `${homepage.uuid}`);
    return next;
  }

  return NextResponse.next({
    headers,
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|proxy|test|_next|static|public|favicon.ico|error).*)",
};
