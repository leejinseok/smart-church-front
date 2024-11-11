export const deepCopy = (obj: any) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const deepCopyObj = {};

  for (const key in obj) {
    deepCopyObj[key] = deepCopy(obj[key]);
  }

  return deepCopyObj;
};
