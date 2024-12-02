import { baseUrl } from "./smart-church-api";

export type UserResponse = {
  id: number;
  uuid: string;
  email: string;
  avatarUrl: string;
};

export const authApiRepository = {
  sendEmailVerifyCode(email: string): Promise<Response> {
    return fetch(`${baseUrl}/api/v1/auth/send-email-verify-code`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
  },

  verifyEmail(email: string, verificationCode: string) {
    return fetch(`${baseUrl}/api/v1/auth/email-verify`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        verificationCode,
      }),
    });
  },

  async session(accessToken: string): Promise<UserResponse> {
    const res = await fetch(`${baseUrl}/api/v1/auth/session`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const json = await res.json();
    return json;
  },

  register(email: string, password: string) {
    return fetch(`${baseUrl}/api/v1/auth/register`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  },
};
