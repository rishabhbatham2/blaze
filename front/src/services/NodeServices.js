import axios from 'axios';


 const serverURL = 'http://192.168.29.182:5000/'; // Define your server URL here
 const domainURl = 'http://192.168.29.182:3000/'

/*   const serverURL = 'https://www.blazestore.in/'; 
 const domainURl = 'https://www.blazestore.in/' */

// POST request function
export async function postData(endpoint, body) {
  try {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const token = user?.token;

    // Prepare headers (include token if it exists)
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    // Send POST request with body and headers together
    const response = await axios.post(`${serverURL}${endpoint}`, body, { headers });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}


// GET request function
export async function getData(endpoint) {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  try {

    const config = user?.token
    ? {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    : {};

    const response = await axios.get(`${serverURL}${endpoint}`,config);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
export async function getDatanew(endpoint) {
 
  try {

   

    const response = await axios.get(`${serverURL}${endpoint}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
// PUT request function
export async function putData(endpoint, body) {
  try {
    const response = await axios.put(`${serverURL}${endpoint}`, body);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

// DELETE request function
export async function deleteData(endpoint) {
  try {
    const response = await axios.delete(`${serverURL}${endpoint}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

// PATCH request function
export async function patchData(endpoint, body) {
  try {
    const response = await axios.patch(`${serverURL}${endpoint}`, body);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

// HEAD request function (Axios does not support HEAD, so you can simulate it with GET)
export async function headData(endpoint) {
  try {
    const response = await axios.get(`${serverURL}${endpoint}`, { headers: { 'X-Requested-With': 'HEAD' } });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

// Response handler function
function handleResponse(response) {
  return response.data
}

// Error handler function
function handleError(error) {
  console.error('API Error:', error);
 
 
  return error.response.data

}

function handleError2(error) {
  console.error('API Error:', error);
  return {
    success: false,
    message: error.response?.data?.message || error.message || 'An error occurred while making the request.',
  };
}

export {serverURL,domainURl}
