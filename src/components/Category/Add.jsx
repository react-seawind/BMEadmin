import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AddCategory } from '../../API/CategoryApi';

const validateSchema = Yup.object().shape({
  Title: Yup.string().required('Category Name is required.'),
  Slug: Yup.string().required('Slug is required.'),
  Content: Yup.string().required('Content is required.'),
  Icon: Yup.string().required('Icon is required.'),
  Image: Yup.string().required('Image is required.'),
});

const CategoryAdd = () => {
  const formik = useFormik({
    initialValues: {
      Title: '',
      Slug: '',
      Content: '',
      Icon: '',
      Image: '',
      Status: '',
    },
    validationSchema: validateSchema,
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        await AddCategory(formData);
        actions.resetForm();
        navigate('/category/listing');
      } catch (error) {
        console.error('Error adding Category:', error);
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/slider/listing');
  };

  return (
    <div>
      <Breadcrumb pageName="Category Add" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Category Add
              </h3>
              <p>
                Please fill all detail and add new Category Add in your Sub
                Admin Add directory
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              {/*===========Name===========*/}
              <div className="grid grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Category Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Title"
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Category Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />{' '}
                  {formik.touched.Title && formik.errors.Title && (
                    <div className="text-red-500">{formik.errors.Title}</div>
                  )}
                  <p>Please enter Category Name</p>
                </div>
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
                    placeholder="Enter Slug"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />{' '}
                  {formik.touched.Slug && formik.errors.Slug && (
                    <div className="text-red-500">{formik.errors.Slug}</div>
                  )}
                  <p>Please enter Slug</p>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Content<span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows="5"
                    cols="5"
                    name="Content"
                    value={formik.values.Content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] px-2 border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  ></textarea>

                  {formik.touched.Content && formik.errors.Content && (
                    <div className="text-red-500">{formik.errors.Content}</div>
                  )}
                  <p>Please enter Content</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Icon <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue(
                        'Icon',
                        event.currentTarget.files[0],
                      );
                    }}
                    onBlur={formik.handleBlur}
                    name="Icon"
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.Icon && formik.errors.Icon ? (
                    <div className="text-red-500">{formik.errors.Icon}</div>
                  ) : null}
                  <p>Please select an a jpg, png, gif, jpeg, webp file only.</p>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Image <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue(
                        'Image',
                        event.currentTarget.files[0],
                      );
                    }}
                    onBlur={formik.handleBlur}
                    name="Image"
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.Image && formik.errors.Image ? (
                    <div className="text-red-500">{formik.errors.Image}</div>
                  ) : null}
                  <p>Please select an a jpg, png, gif, jpeg, webp file only.</p>
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

export default CategoryAdd;
