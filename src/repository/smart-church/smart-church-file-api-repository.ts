import { baseUrl } from "./smart-church-api";

export const smartChurchFileApiRepository = {
  uploadFile(formData: FormData) {
    return fetch(`${baseUrl}/api/v1/files`, {
      method: "post",
      body: formData,
    });
  },
};
