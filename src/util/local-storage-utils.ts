export function getLocalStorageItem(key: string): string | undefined {
  return localStorage.getItem(key);
}

export function setLocalStorageItem(key: string, value: string) {
  localStorage.setItem(key, value);
}
