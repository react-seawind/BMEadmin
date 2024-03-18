import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Only Number are allowed for this field ')
    .min(10, 'User Phone must be at most 10 characters')
    .max(10, 'User Phone must be at most 10 characters'),
});
const Contactsetting = () => {
  const formik = useFormik({
    initialValues: {
      address: '',
      email: '',
      phone: '',
      web: '',
      map: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      sessionStorage.setItem('ContactSettingData', JSON.stringify(values));
      actions.resetForm();
      toast('Data Update Successfully');
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Breadcrumb pageName="Contact Setting Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Setting Edit
              </h3>
              <p>
                Please fill all detail and Edit Contact settings in your Contact
                settings directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Address
                  </label>
                  <textarea
                    rows={2}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="address"
                    placeholder="Please enter address"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                  {formik.touched.address && formik.errors.address ? (
                    <div className="text-red-500">{formik.errors.address}</div>
                  ) : null}
                  <p>Please enter address</p>
                </div>
              </div>

              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
                  <p>Please enter Email</p>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Phone"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-red-500">{formik.errors.phone}</div>
                  ) : null}
                  <p>
                    Please enter phone if multiple then add , between two
                    numbers
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Web
                  </label>
                  <input
                    type="text"
                    name="web"
                    value={formik.values.web}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Web"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.web && formik.errors.web ? (
                    <div className="text-red-500">{formik.errors.web}</div>
                  ) : null}
                  <p>Please enter Web</p>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Map
                  </label>
                  <textarea
                    rows={2}
                    value={formik.values.map}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="map"
                    placeholder="Please enter Map IFRAME Only"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                  {formik.touched.map && formik.errors.map ? (
                    <div className="text-red-500">{formik.errors.map}</div>
                  ) : null}
                  <p>Please enter Map IFRAME Only</p>
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
                  type="cancel"
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

export default Contactsetting;
