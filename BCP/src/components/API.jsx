import axios from 'axios';

const API_BASE_URL = 'https://seawindsolution.ae/BME/api';

const sessiondata = sessionStorage.getItem('logindata');
const parsedSessionData = sessiondata ? JSON.parse(sessiondata) : null;
const token = parsedSessionData ? parsedSessionData.token : null;
const Id = parsedSessionData ? parsedSessionData.Id : null;

const TOKEN = token;

const headers = {
  Authorization: `Bareer ${TOKEN}`,
};

// =========================AdminLogin==============D
export const AdminLogin = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/adminLogin`, data);
    if (response.data.status === true) {
      const { Id, token } = response.data.responseData;
      const loginData = { Id, token };
      sessionStorage.setItem('logindata', JSON.stringify(loginData));
      toast('Login Successfully');
      return response;
    } else {
      toast(response.data.message);
    }
  } catch (error) {
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
      // toast(response.data.message);
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
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
      toast.success(response.data.message);
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
// ===================ChangePassword================D
export const ChangePassword = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/admin/changePassword`,
      data,
      {
        headers,
      },
    );

    if (response.data.status === true) {
      toast.success(response.data.message);
      return response.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
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
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
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
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
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
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    toast.error('Error adding slider'); // Toast error message
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
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    toast.error('Error adding slider'); // Toast error message
    throw error; // Rethrow the error for further handling
  }
};

// ---------------------------Category------------------------
// =========================Get All Category=========================
export const getAllCategory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/category`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};

// ----------------------getCategorybyId----------------
export const getCategoryById = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/category/${Id}`, {
      headers,
    });

    if (response.data.status === true) {
      return response.data.responseData;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
// ===================Edit Category================D
export const updateCategoryById = async (formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/category`, formData, {
      headers,
      'Content-Type': 'multipart/form-data',
    });

    if (response.data.status === true) {
      toast(response.data.message); // Toast success message
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

// ------------------------Add Category---------------------
export const AddCategory = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/category`, formData, {
      headers,
    });
    if (response.data.status === true) {
      toast(response.data.message); // Toast success message
      return response.data; // Return response data
    } else {
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    toast.error('Error adding Category'); // Toast error message
    throw error; // Rethrow the error for further handling
  }
};
// ------------------------delete Category---------------------
export const deleteCategory = async (Id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/category/${Id}`, {
      headers,
    });
    if (response.data.status === true) {
      toast(response.data.message); // Toast success message
      return response.data; // Return response data
    } else {
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    toast.error('Error adding Category'); // Toast error message
    throw error; // Rethrow the error for further handling
  }
};

// =============================================================================
// ==================================STATE======================================
// =============================================================================
// =========================Get All State=========================
export const getAllState = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/state`, {
      headers,
    });
    return response.data.responsedata;
  } catch (error) {
    throw error;
  }
};

// ----------------------getStatebyId----------------
export const getStateById = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/state/${Id}`, {
      headers,
    });

    if (response.data.status === true) {
      return response.data.responseData;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
// ===================Edit State================D
export const updateStateById = async (formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/state`, formData, {
      headers,
      'Content-Type': 'multipart/form-data',
    });

    if (response.data.status === true) {
      toast(response.data.message); // Toast success message
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

// ------------------------Add State---------------------
export const AddState = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/state`, formData, {
      headers,
    });
    if (response.data.status === true) {
      toast(response.data.message); // Toast success message
      return response.data; // Return response data
    } else {
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    toast.error('Error adding State'); // Toast error message
    throw error; // Rethrow the error for further handling
  }
};
// ------------------------delete State---------------------
export const deleteState = async (Id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/state/${Id}`, {
      headers,
    });
    if (response.data.status === true) {
      toast(response.data.message); // Toast success message
      return response.data; // Return response data
    } else {
      throw new Error(response.data.message); // Throw error with API message
    }
  } catch (error) {
    toast.error('Error adding State'); // Toast error message
    throw error; // Rethrow the error for further handling
  }
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
      toast(response.data.message);
    }
  } catch (error) {
    throw error;
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
