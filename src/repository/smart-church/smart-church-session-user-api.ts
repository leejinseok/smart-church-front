import { baseUrl } from "./smart-church-api";

export const smartChurchSessionUserApiRepository = {
  async getChurch(churchAdminAccessToken: string) {
    const res = await fetch(`${baseUrl}/api/v1/session-user/church`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${churchAdminAccessToken}`,
        "content-type": "application/json",
      },
    });

    const json = await res.json();
    return json;
  },
};
