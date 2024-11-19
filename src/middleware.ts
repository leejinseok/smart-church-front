import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { homepageTypeAFormMock } from "./type/homepage/homepage-type-a-mock";
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
  const uuid = params["uuid"];

  if (editMode === true) {
    if (uuid) {
      headers.append("uuid", `${uuid}`);

      const res = await homepageTypeAApiRepository.getHompage(`${uuid}`);
      if (res) {
        const next = NextResponse.next({
          headers,
        });

        next.cookies.set("homepageUuid", `${res.uuid}`);
        return next;
      }
    } else {
      const defaultData = { ...homepageTypeAFormMock };
      const homepage =
        await homepageTypeAApiRepository.saveHomepage(defaultData);
      const redirect = NextResponse.redirect(
        `${nextUrl.origin}${search}&uuid=${homepage.uuid}`,
      );
      const homepageUuid = homepage.uuid;
      redirect.cookies.set("homepageUuid", `${homepageUuid!}`);
      return redirect;
    }
  } else {
    headers.append("uuid", `${uuid}`);
    const homepage = await homepageTypeAApiRepository.getHompage(`${uuid}`);
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
  matcher: "/((?!api|_next|static|public|favicon.ico).*)",
};
