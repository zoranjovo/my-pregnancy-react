import axios from 'axios';
import { getToken, clearToken } from '../auth.js'

const apiurl = process.env.REACT_APP_API_URL

export const getAccount = async () => {
    const token = getToken()
    if(token) {
        try {
            const response = await axios.get(`${apiurl}/getaccount`, {
                headers: { token: `${token}` }
            });
            if(response.data.error){
                if(response.data.errorMsg === 'Invalid token'){
                    clearToken()
                    console.log("Invalid token Redirecting...");
                    window.location.href = '/login';
                    return;
                }
            }
            return response;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
};