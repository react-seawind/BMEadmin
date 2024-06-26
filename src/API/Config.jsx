const Config = {
  // API_BASE_URL: 'https://seawindsolution.ae/BME/api',
  API_BASE_URL: 'https://www.bme.seawindsolution.ae/api',
  getToken: () => {
    const sessiondata = sessionStorage.getItem('logindata');
    const parsedSessionData = sessiondata ? JSON.parse(sessiondata) : null;
    const token = parsedSessionData ? parsedSessionData.token : null;
    return token;
  },
  getId: () => {
    const sessiondata = sessionStorage.getItem('logindata');
    const parsedSessionData = sessiondata ? JSON.parse(sessiondata) : null;
    const Id = parsedSessionData ? parsedSessionData.Id : null;
    return Id;
  },
};

export default Config;
