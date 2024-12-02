export function getCookie(key: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${key}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export function setChurchAdminAccessTokenCookie(cookieValue: string) {
  setCookie("churchAdminAccessToken", cookieValue);
}

export function getChurchAdminAccessTokenCookie() {
  return getCookie("churchAdminAccessToken");
}

export function getHomepageUuidCookie() {
  return getHomepageUuidCookie();
}

export function setCookie(
  key: string,
  value: string,
  days = 0,
  path = "/",
  secure = false,
  sameSite = "Lax",
) {
  let cookieString = `${key}=${value}; path=${path}; samesite=${sameSite}`;

  if (days > 0) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // days를 밀리초로 변환
    cookieString += `; expires=${date.toUTCString()}`;
  }

  if (secure) {
    cookieString += "; secure"; // HTTPS 전용
  }

  document.cookie = cookieString;
}
