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

const GetUserProfile = async () => {
  try {
    // Make a request to get the user profile
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const response = await axios.get('http://127.0.0.1:8000/user/userprofiles'); // You need to implement this endpoint in Django

    // Return the user profile data
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error so the calling code can handle it
  }
};

const LoginUser = async (userData: any) => {
  try {
    console.log('Logging in with user data:', userData); // Log the user data

    const response = await axios.post('http://127.0.0.1:8000/user/login/', userData);

    console.log('Server response:', response); // Log the server response

    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    return response; 
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export { AddUser, GetUserProfile, LoginUser };