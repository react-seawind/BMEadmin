import React from 'react';

import loader from '../../images/mainlogo.png';
const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="h-25 w-25  ">
        <img src={loader} alt="" className="w-full " />
      </div>
    </div>
  );
};

export default Loader;
