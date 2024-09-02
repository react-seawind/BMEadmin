import React from 'react';

import loader from '../../images/mainlogo.png';
const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className=" w-1/4 ">
        <img src={loader} alt="" className="w-full " />
      </div>
    </div>
  );
};

export default Loader;
