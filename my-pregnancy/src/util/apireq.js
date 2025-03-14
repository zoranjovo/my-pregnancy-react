import axios from 'axios';
import { getToken } from './auth.js'

const apiurl = process.env.REACT_APP_API_URL;

export const registerReq = async (role, firstname, lastname, email, password) => {
  try {
    const response = await axios.post(`${apiurl}/register`, new URLSearchParams({
      role: role,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response;
  } catch(error) {
    console.log(error);
    return error;
  }
}

export const login = async (email, password) => {
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
    return response;
  } catch(error) {
    console.log(error);
    return error;
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
  try {
    const response = await axios.get(`${apiurl}/getuser`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch(error) {
    console.log(error);
    return error;
  }
};

export const updateUser = async (formData) => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}/updateuser`, {
      data: JSON.stringify(formData)
    }, { headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch(error) {
    console.log(error);
    return error;
  }
};

export const updateUserPhoto = async (file) => {
  const formData = new FormData();
  formData.append('profilePhoto', file);
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}/updateuserphoto`, formData, {
    headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch(error) {
    console.log(error);
    return error;
  }
};

export const deleteUserPhoto = async () => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}/deleteuserphoto`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
    });
    return response;
  } catch(error) {
    console.log(error);
    return error;
  }
};

export const createJournalEntry = async (gratitude, onMyMind, selectedMoods, selfCare, waterIntake, dayRating) => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}/journal/newentry`, {
      gratitude: gratitude,
      onMyMind: onMyMind,
      selectedMoods: selectedMoods,
      selfCare: selfCare,
      waterIntake: waterIntake,
      dayRating: dayRating
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to create journal entry:', error);
    return error;
  }
}

export const getAllJournalEntries = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${apiurl}/journal/allentries`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to create journal entry:', error);
    return error;
  }
}

export const getAllFitnesVideos = async () => {
  try {
    const response = await axios.get(`${apiurl}/fitness/allvideos`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch all fitness videos:', error);
    return error;
  }
}

export const getAllDoctors = async () => {
  try {
    const response = await axios.get(`${apiurl}/consultation/alldoctors`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch all doctors:', error);
    return error;
  }
}

export const createConsultationRequest = async (date, reason, communication, consultant) => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}/consultation/newrequest`, {
      date: date,
      reason,
      communication,
      consultant,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to create consultation request:', error);
    return error;
  }
}

export const getExistingConsultations = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${apiurl}/consultation/getexisting`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to get existing consultations:', error);
    return error;
  }
}

export const updateConsultationState = async (id, newstatus) => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}/consultation/updatestate`, {
      consultationid: id,
      newstatus: newstatus,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to update consultation state:', error);
    return error;
  }
}

export const getForumsHome = async () => {
  try {
    const response = await axios.get(`${apiurl}/forums/gethome`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch forums home:', error);
    return error;
  }
}

export const getForumsInCategory = async (category) => {
  try {
    const response = await axios.get(`${apiurl}/forums/getcategory`, {
      params: {
        category: category,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch forums category:', error);
    return error;
  }
};

export const getPost = async (id) => {
  try {
    const response = await axios.get(`${apiurl}/forums/getpost`, {
      params: {
        postId: id,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch forums category:', error);
    return error;
  }
};

export const addReply = async (id, replyText) => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}/forums/reply`, {
      postId: id,
      replyText: replyText,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to add post reply:', error);
    return error;
  }
}

export const createForumPost = async (category, title, post) => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}/forums/create`, {
      category: category,
      title: title,
      postText: post,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to create post:', error);
    return error;
  }
}

export const getNotifications = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${apiurl}/notifications/get`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to get notifications:', error);
    return error;
  }
}

export const clearNotification = async (id) => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}/notifications/clear`, {
      notificationId: id,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to clear notification:', error);
    return error;
  }
}

export const clearAllNotifications = async () => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}/notifications/clearall`, {},
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to clear all notifications:', error);
    return error;
  }
}

export const createChecklist = async (checklistData) => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}checklist/create`, checklistData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating checklist:', error);
  }
};

export const fetchChecklists = async () => {
  try {
    const response = await axios.get(`${apiurl}/checklist/all`);  // Updated URL
    return response.data;
  } catch (error) {
    console.error('Error fetching checklists:', error);
    throw error;
  }
};

export const deleteChecklist = async (id) => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}checklist/delete/${id}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting checklist:', error);
    throw error;
  }
};

export const getAllResources = async () => {
  try {
    const response = await axios.get(`${apiurl}/resources`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch all resources:', error);
    return error;
  }
}


export const getUserPostedVideos = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${apiurl}/fitness/uservideos`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch user posted videos:', error);
    return error;
  }
}


export const postUserVideo = async (title, desc, url, time) => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}/fitness/postvideo`, {
      title: title,
      desc: desc,
      url: url,
      time: time
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to post user video:', error);
    return error;
  }
}

export const deleteUserVideo = async (videoId) => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}/fitness/deletevideo`, {
      id: videoId,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to delete user video:', error);
    return error;
  }
}



export const getUserPostedResources = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${apiurl}/resources/userresources`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch user posted resources:', error);
    return error;
  }
}


export const postUserResource = async (title, desc, url, content, stage, imgurl) => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}/resources/postresource`, {
      title: title,
      desc: desc,
      url: url,
      content: content,
      stage: stage,
      imgurl: imgurl
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to post user resource:', error);
    return error;
  }
}

export const deleteUserResource = async (resourceID) => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiurl}/resources/deleteresource`, {
      id: resourceID,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to delete user resource:', error);
    return error;
  }
}