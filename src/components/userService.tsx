import axios from 'axios';

// base URL for the API
const BASE_URL = 'http://127.0.0.1:8000/';

// creating an instance of axios
const axiosInstance = axios.create();

// function to add new user
const AddUser = async (userData: any) => {
  try {
    // post request to the /usre/add/ endpoint
    const response = await axios.post('http://127.0.0.1:8000/user/add/', userData);
    // return the response data
    return response.data;
  } catch (error) {
    // log the error to the console
    console.error(error);
    throw error; 
  }
};

// function to login a user
const LoginUser = async (userData: any) => {
  try {
    console.log('Logging in with user data:', userData); // Log the user data

    // post request to the /user/login/ endpoint
    const response = await axios.post('http://127.0.0.1:8000/user/login/', userData);

    console.log('Server response:', response); // Log the server response

    // Check the success property of the response
    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    // assuming the token is returned in the response data
    return response.data.token; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// function to get user profile
const GetUserProfile = async (token: string) => {
  const config = {
      // set the Authorization header with the token
      headers: { 'Authorization': `Token ${token}` }
  };

  try {
      // get request to the /user/userprofiles/ endpoint
      const response = await axios.get('/user/userprofiles/', config);
      return response.data;
  } catch (error) {
      console.error('Error during API call', error);
      return error;
  }
};
// export the functions
export { AddUser, GetUserProfile, LoginUser };