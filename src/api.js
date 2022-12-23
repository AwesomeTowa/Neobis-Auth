import axios from 'axios';

const BASE_URL = 'https://users-auth-api.onrender.com/api';
const API_URL_SIGNUP = '/signup';
const API_URL_SIGNIN = '/signin';
const API_URL_ME = '/me';

// SignUp user
const signup = async userData => {
  const response = await axios.post(`${BASE_URL}${API_URL_SIGNUP}`, userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

// SignIn user
const signin = async userData => {
  const response = await axios.post(`${BASE_URL}${API_URL_SIGNIN}`, userData, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.data) {
    localStorage.setItem('token', JSON.stringify(response.data.accessToken));
  }

  return response.data;
};

//me
const getUsers = async token => {
  const response = await axios.get(
    'https://users-auth-api.onrender.com/api/users',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const authService = {
  signup,
  signin,
};

export const getService = { getUsers };