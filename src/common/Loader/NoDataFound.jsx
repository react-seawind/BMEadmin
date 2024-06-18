import React from 'react';
import NoData from '../../images/noevent.png';

const NoDataFound = () => {
  return (
    <div className="mx-auto bg-white dark:bg-boxdark font-bold text-2xl text-bodydark2 text-center  min-h-full">
      <img src={NoData} alt="" className="mx-auto my-auto " />
    </div>
  );
};

export default NoDataFound;
