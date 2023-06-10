export const getProfileName = (name) => {
  return name
    ? name
        .split(" ")
        .map((word) => word?.[0]?.toUpperCase())
        .join("")
    : "";
};

export const addQueryParams = (params) => {
  const paramStrings = Object.keys(params).reduce((acc, key, index) => {
    acc.push(key + "=" + params[key]);
    return acc;
  }, []);
  return paramStrings.join("&");
};