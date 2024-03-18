import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required.'),
  banner: Yup.string().required('Banner image is required.'),
});
const SliderAdd = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      url: '',
      content: '',
      banner: '',
      video: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      sessionStorage.setItem('SliderAddData', JSON.stringify(values));
      actions.resetForm();
      toast('Data Added Successfully');
    },
  });
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Breadcrumb pageName="Slider Add" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Slider Add
              </h3>
              <p>
                Please fill all detail and add new Slider in your Slider
                directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="title"
                    placeholder="Enter Your Title"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <div className="text-red-500">{formik.errors.title}</div>
                  ) : null}

                  <p>Please enter Title</p>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Url <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={formik.values.url}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="url"
                    placeholder="Enter Your Url"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.url && formik.errors.url ? (
                    <div className="text-red-500">{formik.errors.url}</div>
                  ) : null}
                  <p>Please enter Url</p>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Content <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="content"
                    placeholder="Enter Your Content"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.content && formik.errors.content ? (
                    <div className="text-red-500">{formik.errors.content}</div>
                  ) : null}
                  <p>Please enter Content</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Banner Img
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    value={formik.values.banner}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="banner"
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.banner && formik.errors.banner ? (
                    <div className="text-red-500">{formik.errors.banner}</div>
                  ) : null}
                  <p>Please select an a png,jpeg,jpg,gif file only.</p>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Video
                  </label>
                  <input
                    type="file"
                    value={formik.values.video}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="video"
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.video && formik.errors.video ? (
                    <div className="text-red-500">{formik.errors.video}</div>
                  ) : null}
                  <p>Please select an a mp4 file only.</p>
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

export default SliderAdd;
