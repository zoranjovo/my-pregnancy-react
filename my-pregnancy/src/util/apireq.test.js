import axios from 'axios';
import { signUp } from './apireq.js';

jest.mock('axios');
jest.mock('./auth');

describe('API Functions', () => {
  const apiurl = process.env.REACT_APP_API_URL;

  describe('signUp', () => {
    it('should return response for a successful signup', async () => {
      const callback = jest.fn();
      axios.post.mockResolvedValue({ data: { success: true } });

      await signUp('John', 'Doe', 'john@example.com', 'password123', callback);

      expect(callback).toHaveBeenCalledWith({ data: { success: true } });
      expect(axios.post).toHaveBeenCalledWith(`${apiurl}/signup`, {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        password: 'password123'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });

    // it('should return error for a failed signup', async () => {
    //   const callback = jest.fn();
    //   axios.post.mockRejectedValue(new Error('Network error'));

    //   await signUp('John Doe', 'john@example.com', 'password123', callback);

    //   expect(callback).toHaveBeenCalledWith({ error: true, errorMsg: 'Server not reponding' });
    // });
  });
});
