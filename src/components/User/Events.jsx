import React from 'react';
import { eventdata } from '../API';

const UserEvents = () => {
  return (
    <div>
      <div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {eventdata.map((val) => {
            return (
              <div className="bg-white p-3">
                <img
                  src={val.image}
                  alt=""
                  className="xl:h-96 lg:h-80 surface:h-72  h-48 md:h-60 w-full"
                />
                <div className="px-1 py-2">
                  <div className=" mb-2 ">
                    <h1 className="md:font-bold font-semibold md:text-base text-sm   line-clamp-1">
                      {val.name}
                    </h1>
                  </div>
                  <p className=" text-sm font-semibold  bg-pink-100 rounded-md py-1 px-2">
                    ₹ {val.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserEvents;
