import axios from 'axios';


const BASE_URL = 'http://127.0.0.1:8000/';


const AddUser = async (userData: any) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/user/add/', userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

const GetUserProfile = async (token: string) => {
  const response = await fetch('https://your-api-endpoint.com/profile', {
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

const LoginUser = async (userData: any) => {
  try {
    console.log('Logging in with user data:', userData); // Log the user data

    // Post request to the /user/login/ endpoint without including the token
    const response = await axios.post(`${BASE_URL}/user/login/`, userData);

    console.log('Server response:', response); // Log the server response

    // Check the success property of the response
    if (!response.data.success) {
      console.log('Server response data:', response.data); // Log the response data
      throw new Error(response.data.error);
    }
    return response.data; // Return the entire response data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { AddUser, GetUserProfile, LoginUser };