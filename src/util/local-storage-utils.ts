export function getLocalStorageItem(key: string): string | undefined | null {
  return localStorage.getItem(key);
}

export function setLocalStorageItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function removeLocalStorageItem(key: string) {
  localStorage.removeItem(key);
}

export function getLocalStorageSize() {
  let totalSize = 0;

  // Loop through each key in localStorage
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      // Add the size of the key and the value to the total size
      const keySize = key.length;
      const valueSize = localStorage.getItem(key)?.length;
      if (valueSize) {
        totalSize += keySize + valueSize;
      }
    }
  }

  // Convert bytes to kilobytes (optional)
  const totalSizeKB = (totalSize / 1024).toFixed(2);

  console.log(`Total localStorage size: ${totalSizeKB} KB`);
  return totalSizeKB; // return the size in kilobytes
}
