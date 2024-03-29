import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const validateSchema = Yup.object().shape({
  name: Yup.string().required('Title is required.'),
});

const LanguageAdd = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      Status: '',
    },
    validationSchema: validateSchema,
    onSubmit: async (values, actions) => {
      sessionStorage.setItem('Language-Add-Data', JSON.stringify(values));
      // try {
      //   const formData = new FormData();
      //   formData.append('Title', values.Title);
      //   formData.append('Url', values.Url);
      //   if (values.Image instanceof File) {
      //     formData.append('Image', values.Image);
      //   } else {
      //     formData.append('Image', values.Image);
      //   }
      //   formData.append('Content', values.Content);
      //   formData.append('Status', values.Status);

      //   await AddSlider(formData);
      //   actions.resetForm();
      //   navigate('/slider/listing');
      // } catch (error) {
      //   console.error('Error updating slider:', error);
      // }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/slider/listing');
  };
  return (
    <div>
      <Breadcrumb pageName="Language Add" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Language Add
              </h3>
              <p>
                Please fill all detail and add new Language Add in your Sub
                Admin Add directory
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              {/*===========Name===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500">{formik.errors.name}</div>
                  )}
                  <p>Please enter Language</p>
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
                      checked={formik.values.Status == '1'}
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
                      checked={formik.values.Status == '0'}
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

export default LanguageAdd;
