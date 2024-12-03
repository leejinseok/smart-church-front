"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div>
      <p>{searchParams.get("type")}</p>
    </div>
  );
}
