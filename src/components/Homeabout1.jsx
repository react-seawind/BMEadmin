import React from 'react';
import Breadcrumb from './Breadcrumb';
import Logo from '../images/mainlogo.png';
import { IoMdClose } from 'react-icons/io';

const Homeabout1 = () => {
  return (
    <div>
      <Breadcrumb pageName="HomeAbout Section Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                HomeAbout Section Edit
              </h3>
              <p>
                Please fill all detail and Edit About Settings in your Welcome
                directory
              </p>
            </div>
            <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <p>Please enter Title </p>
              </div>
            </div>

            <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Content <span className="text-danger">*</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Please enter Content"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
                <p>Please enter Content</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 py-3.5 px-5.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Image
                  <span className="text-danger">* </span>
                </label>
                <input
                  type="file"
                  onChange={(event) =>
                    formik.setFieldValue('Image', event.target.files[0])
                  }
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
                <p>Please select an a jpg, png, gif, jpeg, webp file only.</p>
              </div>
              <div className="mt-5">
                <p>Your Exsisting Img File*</p>
                <div className="grid grid-cols-4 gap-2 relative">
                  <div className="relative">
                    <img
                      src={Logo}
                      alt=""
                      className="w-full rounded border p-2 "
                    />
                    <IoMdClose className="absolute top-1 right-1 bg-black text-white cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex   gap-5.5 py-3.5 px-5.5">
              <button
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                type="submit"
              >
                Submit
              </button>
              <button
                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                onClick={handleGoBack}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeabout1;
