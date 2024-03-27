import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getSliderById, updateSliderById } from '../API';

const validationSchema = Yup.object().shape({
  Title: Yup.string().required('Title is required.'),
});
const SliderEdit = () => {
  // ================ Get data by Id============
  const { Id } = useParams(); // Change here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SliderData = await getSliderById(Id);
        formik.setValues({
          Id: SliderData.Id || '',
          Title: SliderData.Title || '',
          Url: SliderData.Url || '',
          Content: SliderData.Content || '',
          Image: SliderData.Image || '',
          Hid_Image: SliderData.Hid_Image || '',
          Status: SliderData.Status || '0',
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Id]);
  // --------------------Form----------------------
  const formik = useFormik({
    initialValues: {
      Title: '',
      Url: '',
      Content: '',
      Image: null,
      Hid_Image: '',
      Status: '1',
    },

    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      // sessionStorage.setItem('Slider-Edit-Data', JSON.stringify(values));

      try {
        const formData = new FormData();
        formData.append('Id', values.Id);
        formData.append('Title', values.Title);
        formData.append('Url', values.Url);
        if (values.Image instanceof File) {
          formData.append('Image', values.Image);
        } else {
          formData.append('Image', values.Image);
        }
        formData.append('Hid_Image', values.Hid_Image);
        formData.append('Content', values.Content);
        formData.append('Status', values.Status);

        await updateSliderById(formData);
      } catch (error) {
        console.error('Error updating slider:', error);
      }
    },
  });
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/slider/listing');
  };
  return (
    <div>
      <Breadcrumb pageName="Slider Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Slider Edit
              </h3>
              <p>
                Please fill all detail and edit new Slider in your Slider
                directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <input
                type="hidden"
                name="Hid_Image"
                value={formik.values.Hid_Image}
              />
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="Title"
                    placeholder="Enter Your Title"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Title && formik.errors.Title ? (
                    <div className="text-red-500">{formik.errors.Title}</div>
                  ) : null}

                  <p>Please enter Title</p>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Url
                  </label>
                  <input
                    type="text"
                    value={formik.values.Url}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="Url"
                    placeholder="Enter Your Url"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Url && formik.errors.Url ? (
                    <div className="text-red-500">{formik.errors.Url}</div>
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
                    value={formik.values.Content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="Content"
                    placeholder="Enter Your Content"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Content && formik.errors.Content ? (
                    <div className="text-red-500">{formik.errors.Content}</div>
                  ) : null}
                  <p>Please enter Content</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Banner Img
                    <span className="text-danger">(Below 1 MB)*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(event) =>
                      formik.setFieldValue('Image', event.target.files[0])
                    }
                    onBlur={formik.handleBlur}
                    name="Image"
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.Image && formik.errors.Image ? (
                    <div className="text-red-500">{formik.errors.Image}</div>
                  ) : null}
                  <p>Please select an a jpg, png, gif, jpeg, webp file only.</p>
                </div>
                <div className="mt-5">
                  <p>Your Exsisting Img File</p>
                  <div className="grid grid-cols-4 gap-2 relative">
                    <div className="relative">
                      <img
                        src={formik.values.Image}
                        alt=""
                        className="rounded border p-2 h-28 w-28"
                      />
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

export default SliderEdit;
