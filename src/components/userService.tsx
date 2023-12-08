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
    const response = await axios.get('http://127.0.0.1:8000/user/profile/'); // You need to implement this endpoint in Django

    // Return the user profile data
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error so the calling code can handle it
  }
};

export { AddUser, GetUserProfile };