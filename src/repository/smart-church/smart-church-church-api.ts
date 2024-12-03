import { ChurchRequest } from "../../api/smart-church/smart-church-api-response";
import { baseUrl } from "./smart-church-api";

export const smartChurchChurchApiRepository = {
  getChurchByUuid(uuid: string) {
    return fetch(`${baseUrl}/api/v1/churches/${uuid}`, {
      method: "get",
    });
  },

  saveChurch(accessToken: string, church: ChurchRequest) {
    return fetch(`${baseUrl}/api/v1/churches`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        ...church,
      }),
    });
  },

  updateChurch(accessToken: string, churchUuid: string, church: ChurchRequest) {
    return fetch(`${baseUrl}/api/v1/churches/${churchUuid}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...church,
      }),
    });
  },
};
