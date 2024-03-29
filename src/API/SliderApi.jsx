import axios from 'axios';
import { toast } from 'react-toastify';
import Config from './Config';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const Id = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`, // Corrected typo from "Bareer" to "Bearer"
};

// ---------------------------SLIDER------------------------
// =========================Get All Slider=========================
export const getAllSlider = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/slider`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    toast.error(response.data.message);
  }
};

// ----------------------getsliderbyId----------------
export const getSliderById = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/slider/${Id}`, {
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
// ===================Edit Slider================D
export const updateSliderById = async (formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/slider`, formData, {
      headers,
      'Content-Type': 'multipart/form-data',
    });

    if (response.data.status === true) {
      toast(response.data.message); // Toast success message
      return response.data;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};

// ------------------------Add Slider---------------------
export const AddSlider = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/slider`, formData, {
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
// ------------------------delete Slider---------------------
export const deleteSlider = async (Id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/slider/${Id}`, {
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
