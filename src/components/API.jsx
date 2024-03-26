import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'https://seawindsolution.ae/BME/api';

const sessiondata = sessionStorage.getItem('logindata');
const parsedSessionData = sessiondata ? JSON.parse(sessiondata) : null;
const token = parsedSessionData ? parsedSessionData.token : null;
const Id = parsedSessionData ? parsedSessionData.Id : null;

const TOKEN = token;

const headers = {
  authorization: `Bareer ${TOKEN}`,
};

// =========================AdminLogin==============D
export const AdminLogin = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/adminLogin`, data);
    if (response.data.status == true) {
      sessionStorage.setItem(
        'logindata',
        JSON.stringify(response.data.responseData),
      );
      toast('Login Successfully');
    } else {
      toast(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// ======================PROFILE===========================
// =========================getAdmindata=========================D
export const getAdmindataById = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/${Id}`, {
      headers,
    });

    if (response.data.status === true) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// ===================Edit Admin data================D
export const UpdateAdminById = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin`, formData, {
      headers,
      'Content-Type': 'multipart/form-data',
    });

    if (response.data.status === true) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// =========================SERVICE=========================
export const getServicedata = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getSlider`, {
      headers,
    });

    if (response.data.status == true) {
      return response.data.ResponseData;
    } else {
      toast(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
// =========================BLOG=========================
export const getBlog = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getBlog`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    console.error('Error fetching data:', error);
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
    console.error('Error fetching data:', error);
    throw error;
  }
};

import event1 from './../images/ne1.jpg';
import event2 from './../images/ne2.jpg';
import event3 from './../images/ne3.jpg';
import event4 from './../images/ne4.jpg';

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
