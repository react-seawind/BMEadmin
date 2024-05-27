import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import NewEditor from '../EDITOR/NewEditor';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AddPages } from '../../API/PageApi';

const validateSchema = Yup.object().shape({
  Title: Yup.string().required('Title is required.'),
  Slug: Yup.string().required('Slug is required.'),
  Content: Yup.string().required('Content is required.'),
  Image: Yup.string().required('Image is required.'),
});
const PageAdd = () => {
  const formik = useFormik({
    initialValues: {
      Title: '',
      Slug: '',
      Content: '',
      Image: '',
      SeoTitle: '',
      SeoKeyword: '',
      SeoDescription: '',
      Status: '',
    },
    validationSchema: validateSchema,
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        await AddPages(formData);
        actions.resetForm();
        navigate('/page/listing');
      } catch (error) {
        console.error('Error adding page:', error);
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/page/listing');
  };
  return (
    <div>
      <Breadcrumb pageName="Page Add" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Page Add
              </h3>
              <p>
                Please fill all detail and add new Page in your Page directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              {/*===========Title===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Title"
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Title"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Title && formik.errors.Title ? (
                    <div className="text-red-500">{formik.errors.Title}</div>
                  ) : null}
                  <p>Please enter Title</p>
                </div>
              </div>
              {/*===========Slug===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Slug <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Slug"
                    value={formik.values.Slug}
                    onChange={(e) => {
                      let newSlug = e.target.value
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, '-');
                      // Replace slashes ("/") with hyphens ("-")
                      newSlug = newSlug.replace(/\//g, '-');
                      // Remove percent signs ("%")
                      newSlug = newSlug.replace(/%/g, '');
                      // Replace question marks ("?") with hyphens ("-")
                      newSlug = newSlug.replace(/\?/g, '-');
                      formik.setFieldValue('Slug', newSlug);
                    }}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Slug"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Slug && formik.errors.Slug ? (
                    <div className="text-red-500">{formik.errors.Slug}</div>
                  ) : null}
                  <p>Please enter Slug</p>
                </div>
              </div>
              {/*===========Content===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Content <span className="text-danger">*</span>
                  </label>
                  <NewEditor
                    name="Content"
                    value={formik.values.Content}
                    onChange={(Content) => {
                      formik.setFieldValue('Content', Content);
                      formik.setFieldTouched('Content', true);
                    }}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.Content && formik.errors.Content && (
                    <div className="text-red-500">{formik.errors.Content}</div>
                  )}
                  <p>Please enter Content</p>
                </div>
              </div>

              {/*===========Banner Img===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Banner Img
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="Image"
                    onChange={(event) =>
                      formik.setFieldValue('Image', event.target.files[0])
                    }
                    onBlur={formik.handleBlur}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.Image && formik.errors.Image ? (
                    <div className="text-red-500">{formik.errors.Image}</div>
                  ) : null}

                  <p>Please select an a jpg, png, gif, jpeg, webp file only.</p>
                </div>
              </div>
              {/*===========SeoTitle===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    SeoTitle <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="SeoTitle"
                    value={formik.values.SeoTitle}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your SeoTitle"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.SeoTitle && formik.errors.SeoTitle ? (
                    <div className="text-red-500">{formik.errors.SeoTitle}</div>
                  ) : null}
                  <p>Please enter SeoTitle</p>
                </div>
              </div>
              {/*===========SeoKeyword===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    SeoKeyword <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="SeoKeyword"
                    value={formik.values.SeoKeyword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your SeoKeyword"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.SeoKeyword && formik.errors.SeoKeyword ? (
                    <div className="text-red-500">
                      {formik.errors.SeoKeyword}
                    </div>
                  ) : null}
                  <p>Please enter SeoKeyword</p>
                </div>
              </div>
              {/*===========SeoDescription===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    SeoDescription <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows={2}
                    name="SeoDescription"
                    value={formik.values.SeoDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Please enter SeoDescription"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                  {formik.touched.SeoDescription &&
                  formik.errors.SeoDescription ? (
                    <div className="text-red-500">
                      {formik.errors.SeoDescription}
                    </div>
                  ) : null}
                  <p>Please enter SeoDescription</p>
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

export default PageAdd;
