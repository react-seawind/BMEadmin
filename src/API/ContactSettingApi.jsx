import axios from 'axios';
import { toast } from 'react-toastify';
import Config from './Config';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const Id = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`, // Corrected typo from "Bareer" to "Bearer"
};

// ---------------------------ContactSetting------------------------

// ----------------------getContactSettingbyId----------------
export const getContactSettingById = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/settings/contact`, {
      headers,
    });

    if (response.data.status === true) {
      return response.data.responseData;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
// ===================Edit ContactSetting================D
export const updateContactSettingById = async (data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/settings/contact`, data, {
      headers,
    });

    if (response.data.status === true) {
      toast.success(response.data.message); // Toast success message
      return response.data;
    } else {
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
