import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { homepageTypeADefault } from "./type/homepage/homepage-type-a-mock";
import { homepageTypeAApiRepository } from "./repository/homepage-type-a/homepage-type-a-api-repository";

const convertToParams = (queryString: string) => {
  const params = new URLSearchParams(queryString);
  return Object.fromEntries(
    Array.from(params.entries(), ([key, value]) => [
      key,
      value === "true" ? true : value,
    ]),
  );
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const headers: HeadersInit = new Headers();

  const url = request.url;
  const nextUrl = request.nextUrl;
  const search = nextUrl.search;

  const params = convertToParams(search);
  const editMode = params["editMode"];
  const homepageUuid = params["uuid"];

  if (editMode === true) {
    // homepageUuid가 query에 존재하면
    if (homepageUuid) {
      headers.append("homepageUuid", `${homepageUuid}`);
      const res = await homepageTypeAApiRepository.getHompage(
        `${homepageUuid}`,
      );

      if (res) {
        const next = NextResponse.next({
          headers,
        });
        next.cookies.set("homepageUuid", `${res.uuid}`);
        return next;
      }
    } else {
      // homepageUuid가 query에 존재하지 않으면 샘플데이터를 save하고 uuid 생성
      const homepage =
        await homepageTypeAApiRepository.saveHomepage(homepageTypeADefault);
      const redirect = NextResponse.redirect(
        `${nextUrl.origin}${search}&uuid=${homepage.uuid}`,
      );
      return redirect;
    }
  } else {
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
  }

  return NextResponse.next({
    headers,
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|proxy|test|_next|static|public|favicon.ico).*)",
};
