import axios from 'axios';
import { getToken } from './auth.js'

const apiurl = process.env.REACT_APP_API_URL;

export const signUp = async (firstname, lastname, email, password, callback) => {
  try {
    const response = await axios.post(`${apiurl}/signup`, {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return callback(response);
  } catch(error) {
    if(error.response.data.error){
      return callback({error: error.response.data.error});
    }
    return callback(error);
  }
}

export const login = async (email, password, callback) => {
  try {
    const response = await axios.post(`${apiurl}/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return callback(response);
  } catch(error) {
    if(error.response.data.error){
      return callback({error: error.response.data.error});
    }
    return callback(error);
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
    return callback(error)
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
      if(error.message){
        return {error: error.message};
      }
      if(error.response.data.error){
        return {error: error.response.data.error};
      }
    }
  } else {
    return {error: "Token is not set"};
  }
};