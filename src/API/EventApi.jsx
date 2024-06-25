import axios from 'axios';
import { toast } from 'react-toastify';
import Config from './Config';

const { API_BASE_URL } = Config; // Destructure the values from the config file

const TOKEN = Config.getToken();
const Id = Config.getId();

const headers = {
  Authorization: `Bearer ${TOKEN}`, // Corrected typo from "Bareer" to "Bearer"
};

// ----------------------getEventbyId----------------
export const getAllEventByVendorIdId = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/event/${Id}`, {
      headers,
    });

    if (response.data.status === true) {
      return response.data.responsedata;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
// ----------------------getEventbyId----------------
export const getEventByEventId = async (VendorId, EventId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/event/${VendorId}/${EventId}`,
      {
        headers,
      },
    );

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

// ------------------------Edit Event---------------------
export const EditEvent = async (data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/event`, data, {
      headers,
    });
    if (response.data.status === true) {
      toast.success('Event Update Successfully..'); // Toast success message
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
// ------------------------Edit Event---------------------
export const GetAllEvent = async (data) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/event`, {
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

// =========================getAllEventByCountryId=========================
// https://www.bme.seawindsolution.ae/api/event/by/all
export const getAllEventByCountryId = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/event/by/${Id}`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};
