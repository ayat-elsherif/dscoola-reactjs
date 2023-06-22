export const buildQueryString = (queryStringParams = {}) => {
  let queryString = [];
  for (const key in queryStringParams) {
    const value = queryStringParams[key];
    if (Array.isArray(value)) {
      value.forEach((item) => queryString.push(`${key}=${item}&`));
    } else {
      queryString.push(`${key}=${value}&`);
    }
  }
  return queryString.toString().replace(',', '');
};
