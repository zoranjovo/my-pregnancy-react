import axios from 'axios';
import { getToken } from './auth.js'

const apiurl = process.env.REACT_APP_API_URL;

//TODO make sure there will be a function for just checking if a provided token is valid
export const checkToken = async () => {
  const token = getToken()
  if(token){
    try {
      const response = await axios.get(`${apiurl}/users`, {
        headers: { token: `${token}` }
      });
      if(response.data.error){
        return false
      } else {
        return true
      }
    } catch (error) {
      console.error(error);
    }
  }
};

//TODO thisq
export const signUp = async (fullname, email, password, callback) => {
  try {
    const response = await axios.post(`${apiurl}/users`, {
      name: fullname,
      email: email,
      password: password,
    });
    return callback(response);
  } catch (error) {
    return callback({error: true, errorMsg: "Server not reponding"})
  }
}

//TODO this
export const resetPassword = async (email, callback) => {
  try {
    const response = await axios.post(`${apiurl}/resetpassword`, {
      email: email,
    });
    return callback(response);
  } catch (error) {
    return callback({error: true, errorMsg: "Server not reponding"})
  }
}

