const tokenKay = 'access_token';

export const getToken = () => {
  const token = localStorage.getItem(tokenKay);
  if (!token) return null;

  //   return JSON.parse(token);
  return token;
};

export const setToken = (token) => {
  localStorage.setItem(tokenKay, token);
};

export const removeToken = () => {
  localStorage.removeItem(tokenKay);
};
