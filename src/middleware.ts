import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
export function middleware(request: NextRequest) {
  const headers: HeadersInit = new Headers();

  const url = request.url;
  const nextUrl = request.nextUrl;
  const search = nextUrl.search;

  const params = convertToParams(search);

  const editMode = params["editMode"];
  if (editMode === true) {
    const churchUuid = params["churchUuid"];
    if (churchUuid) {
      headers.append("churchUuid", `${churchUuid}`);
    } else {
      return NextResponse.redirect(
        `${nextUrl.origin}${search}&churchUuid=47236142-4c14-4830-941a-7b79879669a6`,
      );
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
