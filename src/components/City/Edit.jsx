import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import Logo from '../../images/mainlogo.png';
import { BsChevronDown } from 'react-icons/bs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const validateSchema = Yup.object().shape({
  name: Yup.string().required('City Name is required.'),
  state: Yup.string().required('state is required.'),
});

const CityEdit = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      state: '',
      icon: '',
      Status: '',
    },
    validationSchema: validateSchema,
    onSubmit: (values, actions) => {
      sessionStorage.setItem('City-Edit-Data', JSON.stringify(values));
      actions.resetForm();
      toast('Data Add Successfully');
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Breadcrumb pageName="City Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                City Edit
              </h3>
              <p>Please fill all detail and Edit City in your City directory</p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    City Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="name"
                    placeholder="Enter Your City Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500">{formik.errors.name}</div>
                  ) : null}
                  <p>Please enter Title</p>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select State
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="state"
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      <option value="1">State 1</option>
                      <option value="2">State 2</option>
                      <option value="3">State 3</option>
                    </select>
                    {formik.touched.state && formik.errors.state ? (
                      <div className="text-red-500">{formik.errors.state}</div>
                    ) : null}
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <BsChevronDown />
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Icon Img
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    value={formik.values.icon}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="icon"
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.icon && formik.errors.icon ? (
                    <div className="text-red-500">{formik.errors.icon}</div>
                  ) : null}
                  <p>Please select an a png,jpeg,jpg,gif file only.</p>
                </div>
                <div>
                  <div className="mt-5">
                    <p>Your Exsisting Img File*</p>
                    <div className="grid grid-cols-4 gap-2 relative">
                      <div className="relative">
                        <img
                          src={Logo}
                          alt=""
                          className="w-full rounded border p-2 "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 py-3.5 px-5.5">
                <label className="mb-3 block text-black dark:text-white">
                  Status <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <div>
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Status"
                      className="mx-2"
                      value="1"
                      // checked={blogadd.Status === '1'}
                    />
                    Active
                  </div>
                  <div>
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Status"
                      className="mx-2"
                      value="0"
                      // checked={blogadd.Status == = '0'}
                    />
                    In Active
                  </div>
                </div>
                <p>Please select an a one status by default is inactive.</p>
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
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityEdit;
