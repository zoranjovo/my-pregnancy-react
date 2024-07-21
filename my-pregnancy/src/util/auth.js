import Cookies from 'js-cookie';
import { checkToken } from './apireq';

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

export const loggedOutRedirect = async () => {
	const token = Cookies.get(TOKEN_KEY);
    if(!token){return true;} // token does not exist
	const result = await checkToken(); // check token with api to make sure it is valid
	return result;
}