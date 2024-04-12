import axios from 'axios';
import { toast } from 'react-toastify';
import Config from './Config';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const Id = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`, // Corrected typo from "Bareer" to "Bearer"
};

// =============================================================================
// ==================================contact======================================
// =============================================================================
// =========================Get All contact=========================
export const getAllContact = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contact`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};

// ------------------------delete contact---------------------
export const deleteContact = async (Id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/contact/${Id}`, {
      headers,
    });
    if (response.data.status === true) {
      toast(response.data.message); // Toast success message
      return response.data; // Return response data
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};

// =============================================================================
// ==================================newsletter======================================
// =============================================================================
// =========================Get All newsletter=========================
export const getAllNewsletter = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/newsletter`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};

// ------------------------delete newsletter---------------------
export const deleteNewsletter = async (Id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/newsletter/${Id}`, {
      headers,
    });
    if (response.data.status === true) {
      toast(response.data.message); // Toast success message
      return response.data; // Return response data
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
