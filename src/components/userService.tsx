import axios from 'axios';


const BASE_URL = 'http://127.0.0.1:8000/';

// add user
const AddUser = async (userData: any) => {
  try {
    // request to the /user/add/ endpoint with the user data
    const response = await axios.post(`${BASE_URL}/user/add/`, userData);
    // check the success property of the response
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

// get user profile
const GetUserProfile = async (token: string) => {
  // response to the /profile endpoint with the token in the Authorization header
  const response = await fetch(`${BASE_URL}/user/userprofiles/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  const userProfile = await response.json();
  return userProfile;
};

// login user
const LoginUser = async (userData: any) => {
  try {
    console.log('Logging in with user data:', userData); 

    //  request to the /user/login/ endpoint with the user data
    const response = await axios.post(`${BASE_URL}/user/login/`, userData);

    console.log('Server response:', response); // Log the server response

    // check  success property of the response
    if (!response.data.success) {
      console.log('Server response data:', response.data);
      throw new Error(response.data.error);
    }
    // return the response data
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { AddUser, GetUserProfile, LoginUser };