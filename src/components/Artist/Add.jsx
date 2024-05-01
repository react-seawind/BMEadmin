import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import NewEditor from '../EDITOR/NewEditor';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AddArtist } from '../../API/ArtistApi';

const validateSchema = Yup.object().shape({
  Title: Yup.string().required('Name is required.'),
  Slug: Yup.string().required('Slug is required.'),
  Image: Yup.string().required('Image is required.'),
  Content: Yup.string().required('Content is required.'),
});

const ArtistAdd = () => {
  const formik = useFormik({
    initialValues: {
      Title: '',
      Slug: '',
      Image: '',
      Content: '',
      Status: '',
    },
    validationSchema: validateSchema,
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        actions.resetForm();
        navigate('/artist/listing');
      } catch (error) {
        console.error('Error adding artist:', error);
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/artist/listing');
  };
  return (
    <div>
      <Breadcrumb pageName="Artist Add" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Artist Add
              </h3>
              <p>
                Please fill all detail and add new Artist Add in your Sub Admin
                Add directory
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              {/*===========Name===========*/}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Title"
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Title && formik.errors.Title && (
                    <div className="text-red-500">{formik.errors.Title}</div>
                  )}

                  <p>Please enter Name</p>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Slug <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Slug"
                    value={formik.values.Slug}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Slug"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Slug && formik.errors.Slug && (
                    <div className="text-red-500">{formik.errors.Slug}</div>
                  )}

                  <p>Please enter Slug</p>
                </div>
              </div>

              {/*===========Profile Image===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Profile Image
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
                  {formik.touched.Image && formik.errors.Image && (
                    <div className="text-red-500">{formik.errors.Image}</div>
                  )}
                  <p>Please select an a jpg, png, gif, jpeg, webp file only.</p>
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

export default ArtistAdd;
