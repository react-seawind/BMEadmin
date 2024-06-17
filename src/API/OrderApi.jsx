import axios from 'axios';
import { toast } from 'react-toastify';
import Config from './Config';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const Id = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`, // Corrected typo from "Bareer" to "Bearer"
};

// ------------------------GetAllBookedOrder---------------------
// https://www.bme.seawindsolution.ae/api/e/order/event/5
export const GetAllBookedOrder = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order`, { headers });
    if (response.data.status === true) {
      return response.data.responsedata; // Return response data
    } else {
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
// ------------------------GetAllBookedOrderById---------------------
// https://bme.seawindsolution.ae/api/order/1
export const GetAllBookedOrderById = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order/${Id}`, {
      headers,
    });
    if (response.data.status === true) {
      return response.data.responsedata; // Return response data
    } else {
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
// ------------------------GetAllBookedOrderByEventId---------------------
// https://bme.seawindsolution.ae/api/order/event/10
export const GetAllBookedOrderByEventId = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order/event/${Id}`, {
      headers,
    });
    if (response.data.status === true) {
      return response.data.responseData; // Return response data
    } else {
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
// ------------------------GetAllBookedOrderByVendorId---------------------
// https://bme.seawindsolution.ae/api/order/vendor/8
export const GetAllBookedOrderByVendorId = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order/vendor/${Id}`, {
      headers,
    });
    if (response.data.status === true) {
      return response.data.responsedata; // Return response data
    } else {
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
// ------------------------GetAllBookedOrderByUserId---------------------
// https://bme.seawindsolution.ae/api/order/user/10
export const GetAllBookedOrderByUserId = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order/user/${Id}`, {
      headers,
    });
    if (response.data.status === true) {
      return response.data.responsedata; // Return response data
    } else {
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
