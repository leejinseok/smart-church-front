import { ParsedUrlQuery } from "querystring";

export interface PageProps {
  params: ParsedUrlQuery; // 동적 라우트 파라미터
  searchParams: { [key: string]: string | string[] | undefined }; // 쿼리 파라미터
}
