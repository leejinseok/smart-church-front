import { loadScript } from "./script-utils";

const searchAddress = async (
  address: string,
): Promise<{ latitude: number; longitude: number }> => {
  try {
    const response = await fetch(
      `/api/geocode?address=${encodeURIComponent(address)}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch geocode data");
    }

    const data = await response.json();
    if (data.addresses && data.addresses.length > 0) {
      const { x, y } = data.addresses[0]; // x: 경도, y: 위도
      return { latitude: y, longitude: x };
    } else {
      throw new Error("주소를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("Error fetching geocode data:", error);
    throw new Error("오류가 발생했습니다.");
  }
};

export const openDaumPostCode = (): Promise<{
  latitude: number;
  longitude: number;
  address: string;
}> => {
  return new Promise((resolve, reject) => {
    const callback = () => {
      new daum.Postcode({
        oncomplete: async function (data) {
          try {
            let address = "";
            if (data.userSelectedType === "J") {
              address = data.jibunAddress as string;
            } else {
              address = data.roadAddress as string;
            }
            const { latitude, longitude } = await searchAddress(data.address);

            console.log("address", address);
            resolve({
              latitude,
              longitude,
              address,
            });
          } catch (err) {
            reject(err);
          }
        },
      }).open();
    };

    if (typeof daum === "undefined") {
      loadScript(
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js",
        callback,
      );
    } else {
      callback();
    }
  });
};
