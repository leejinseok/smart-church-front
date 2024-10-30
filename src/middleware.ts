import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { homepageTypeAFormMock } from "./type/homepage/homepage-type-a-mock";
import { cookies } from "next/headers";
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
  if (editMode === true) {
    const uuid = params["uuid"];
    if (uuid) {
      headers.append("uuid", `${uuid}`);
    } else {
      const defaultData = { ...homepageTypeAFormMock };
      defaultData.id = 2;
      defaultData.uuid = "47236142-4c14-4830-941a-7b79879669a6";

      const res =
        await homepageTypeAApiRepository.saveHomepageTypeA(defaultData);

      const redirect = NextResponse.redirect(
        `${nextUrl.origin}${search}&uuid=${defaultData.uuid}`,
      );

      const homepageTypeAId = res.id;
      redirect.cookies.set("homepageTypeAId", `${homepageTypeAId!}`);
      return redirect;
    }
  }

  headers.append("url", url);
  return NextResponse.next({
    headers,
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next|static|public|favicon.ico).*)",
};
