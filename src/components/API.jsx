import axios from 'axios';

const API_BASE_URL = 'https://seawindsolution.ae/BME/api';

const sessiondata = sessionStorage.getItem('logindata');
const parsedSessionData = sessiondata ? JSON.parse(sessiondata) : null;
const token = parsedSessionData ? parsedSessionData.token : null;
const Id = parsedSessionData ? parsedSessionData.Id : null;

const TOKEN = token;

const headers = {
  Authorization: `Bareer ${TOKEN}`,
  'Content-Type': 'application/json',
};

// // =========================SERVICE=========================
export const getServicedata = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getCategory`, {
      headers,
    });

    if (response.data.status == true) {
      return response.data.ResponseData;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
// // =========================BLOG=========================
export const getBlog = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getBlog`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};
export const AddBlog = async (formData) => {
  try {
    const headers = {
      'x-api-key': '123456789123456789',
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${TOKEN}`,
    };
    const response = await axios.post(`${API_BASE_URL}/addBlog`, formData, {
      headers,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

import event1 from './../images/ne1.jpg';
import event2 from './../images/ne2.jpg';
import event3 from './../images/ne3.jpg';
import event4 from './../images/ne4.jpg';
import { toast } from 'react-toastify';

export const eventdata = [
  {
    name: 'Sonu Nigam',
    image: event1,
    price: '100',
  },
  {
    name: 'Kirtidan Gadhvi',
    image: event2,
    price: '100',
  },
  {
    name: 'Kirtidan Gadhvi',
    image: event3,
    price: '100',
  },
  {
    name: 'Kinjal dave',
    image: event4,
    price: '100',
  },
];

export const Bookingdata = [
  {
    name: 'test',
    email: 'test@gmail.com',
    Tickettype: 'Gold',
    noofticket: '10',
    amount: '100',
  },
  {
    name: 'test',
    email: 'test@gmail.com',
    Tickettype: 'Gold',
    noofticket: '10',
    amount: '100',
  },
  {
    name: 'test',
    email: 'test@gmail.com',
    Tickettype: 'Gold',
    noofticket: '10',
    amount: '100',
  },
  {
    name: 'test',
    email: 'test@gmail.com',
    Tickettype: 'Gold',
    noofticket: '10',
    amount: '100',
  },
  {
    name: 'test',
    email: 'test@gmail.com',
    Tickettype: 'Gold',
    noofticket: '10',
    amount: '100',
  },
  {
    name: 'test',
    email: 'test@gmail.com',
    Tickettype: 'Gold',
    noofticket: '10',
    amount: '100',
  },
];
