import Cookies from 'js-cookie';

const TOKEN_KEY = 'mp-auth-token';

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  if(token) {
    return token;
  } else {
    return null
  }
};

export const saveToken = token => {
  Cookies.set(TOKEN_KEY, token, { expires: 300, secure: false, sameSite: 'true' });
};

export const clearToken = () => {
  Cookies.remove(TOKEN_KEY);
};