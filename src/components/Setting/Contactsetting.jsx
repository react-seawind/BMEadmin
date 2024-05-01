import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getContactSettingById,
  updateContactSettingById,
} from '../../API/ContactSettingApi';

const validationSchema = Yup.object().shape({
  Phone: Yup.string()
    .matches(/^[0-9]+$/, 'Only Number are allowed for this field ')
    .min(10, 'User Phone must be at most 10 characters')
    .max(10, 'User Phone must be at most 10 characters'),
  Address: Yup.string().required('Address is required'),
  Email: Yup.string().email().required('Email is required'),
  Map: Yup.string().required('Map is required'),
});
const Contactsetting = () => {
  // ================ Get data by Id============
  const { Id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ContactData = await getContactSettingById(Id);
        formik.setValues(ContactData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Id]);
  const formik = useFormik({
    initialValues: {
      Address: '',
      Email: '',
      Phone: '',
      Web: '',
      Map: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        await updateContactSettingById(formData);
      } catch (error) {
        console.error('Error updating slider:', error);
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/dashboard');
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
                    value={formik.values.Address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="Address"
                    placeholder="Please enter address"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                  {formik.touched.Address && formik.errors.Address ? (
                    <div className="text-red-500">{formik.errors.Address}</div>
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
                    value={formik.values.Email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Email && formik.errors.Email ? (
                    <div className="text-red-500">{formik.errors.Email}</div>
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
                    value={formik.values.Phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Phone"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Phone && formik.errors.Phone ? (
                    <div className="text-red-500">{formik.errors.Phone}</div>
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
                    value={formik.values.Web}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Web"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Web && formik.errors.Web ? (
                    <div className="text-red-500">{formik.errors.Web}</div>
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
                    value={formik.values.Map}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="map"
                    placeholder="Please enter Map IFRAME Only"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                  {formik.touched.Map && formik.errors.Map ? (
                    <div className="text-red-500">{formik.errors.Map}</div>
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
                  onClick={handleGoBack}
                  type="button"
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
