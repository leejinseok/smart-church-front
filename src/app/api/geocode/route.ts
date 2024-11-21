import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json(
      { error: "Address query parameter is required" },
      { status: 400 },
    );
  }

  const CLIENT_ID = "2xkw517mhy";
  const CLIENT_SECRET = "fdyRV2M4EAh3vr1tA5jiTyFzzBPbHvbbtv6AgeqZ";
  // const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID as string;
  // const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;

  try {
    const response = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`,
      {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": CLIENT_ID,
          "X-NCP-APIGW-API-KEY": CLIENT_SECRET,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch geocode data" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching geocode data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
