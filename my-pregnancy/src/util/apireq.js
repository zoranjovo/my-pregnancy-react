import axios from 'axios';
import { getToken } from './auth.js'

const apiurl = process.env.REACT_APP_API_URL;

export const signUp = async (firstname, lastname, email, password, callback) => {
  try {
    const response = await axios.post
    (`${apiurl}/signup`,
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      }
    )
    return callback(response);
  } catch(error) {
    return callback({error: error.message})
  }
}

export const login = async (email, password, callback) => {
  try {
    const response = await axios.post(`${apiurl}/login`,
      {
        email: email,
        password: password,
      }
    )
    return callback(response);
  } catch(error) {
    return callback({error: error.message})
  }
}

//TODO this
export const resetPassword = async (email, callback) => {
  try {
    const response = await axios.post(`${apiurl}/resetpassword`, {
      email: email,
    });
    return callback(response);
  } catch(error) {
    return callback({error: error.message})
  }
}


export const getUser = async () => {
  const token = getToken();
  if(token){
    try {
      const response = await axios.get(`${apiurl}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response;
    } catch(error) {
      console.error(error);
    }
  } else {
    console.log('token is not set')
  }
};