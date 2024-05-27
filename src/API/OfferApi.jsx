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
// ==================================Offer======================================
// =============================================================================
// =========================Get All Offer=========================
export const getAllOffer = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/offers`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};

// ----------------------getOfferbyId----------------
export const getOfferById = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/offers/${Id}`, {
      headers,
    });

    if (response.data.status === true) {
      return response.data.responseData;
    } else {
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
// ===================Edit Offer================D
export const updateOfferById = async (formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/offers`, formData, {
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

// ------------------------Add Offer---------------------
export const AddOffer = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/offers`, formData, {
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
// ------------------------delete Offer---------------------
export const deleteOffer = async (Id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/offers/${Id}`, {
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
// ------------------------delete Offer FAQ---------------------
// https://bme.seawindsolution.ae/api/offers/faq/1
export const deleteOfferFAQ = async (Id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/offers/faq/${Id}`, {
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
