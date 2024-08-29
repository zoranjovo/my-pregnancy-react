import axios from 'axios';
import { getToken } from './auth.js'

const apiurl = process.env.REACT_APP_API_URL;

export const signUp = async (firstname, lastname, email, password, callback) => {
  try {
    const response = await axios.post(`${apiurl}/register`, new URLSearchParams({
      username: `${firstname} ${lastname}`,
      email: email,
      password: password,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
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
      new URLSearchParams({
        email: email,
        password: password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    console.log(response)
    return callback(response);
  } catch (error) {
    if(error.response.status === 401){
      return callback(error.response)
    }
    // if(error.response && error.response.data && error.response.data.error) {
    //   return callback({ error: error.response.data.error });
    // }
    // return callback(error);
  }
};

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


export const createJournalEntry = async (gratitude, onMyMind, selectedMoods, selfCare, waterIntake, dayRating, callback) => {
  try {
    const response = await axios.post(`${apiurl}/api/entity/20020/object`, new URLSearchParams({
      daily_rating: dayRating,
      entry_date: Date.now(),
      feeling: selectedMoods,
      gratitudes: gratitude,
      selfcare: selfCare,
      thoughts: onMyMind,
      user_id: "test5@test.com"
    }), {
      headers: {
        'Content-Type': 'application/json',
        // 'Cookie': `token=${getToken()}`
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