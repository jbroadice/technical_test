const objectToQueryParamsString = (obj) =>
  Object.entries(obj)
    .filter((v) => Boolean(v[1]))
    .map((v) => `${v[0]}=${v[1] || ""}`)
    .join("&");

export default objectToQueryParamsString;
