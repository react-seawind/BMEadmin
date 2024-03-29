import React from 'react';
import Breadcrumb from '../Breadcrumb';
import Logo from '../../images/mainlogo.png';
import * as Yup from 'yup';
import { IoMdClose } from 'react-icons/io';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  // logo: Yup.mixed().test(
  //   'fileType',
  //   'Only JPG and PNG files are allowed',
  //   (value) => {
  //     if (!value) return true; // No file selected is considered valid
  //     return ['image/jpeg', 'image/png'].includes(value.type);
  //   },
  // ),
});

const Sitesetting = () => {
  const formik = useFormik({
    initialValues: {
      url: '',
      copyright: '',
      logo: '',
      favicon: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      sessionStorage.setItem('SiteSettingData', JSON.stringify(values));
      actions.resetForm();
      toast('Data Update Successfully');
    },
  });
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/slider/listing');
  };

  return (
    <div>
      <Breadcrumb pageName="Site Setting Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Site Setting Edit
              </h3>
              <p>
                Please fill all detail and Edit Site settings in your Site
                settings directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Site Url
                  </label>
                  <input
                    type="text"
                    name="url"
                    value={formik.values.url}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Site Url"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.url && formik.errors.url ? (
                    <div className="text-red-500">{formik.errors.url}</div>
                  ) : null}
                  <p>Please enter Site Url</p>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    CopyRight
                  </label>
                  <input
                    type="text"
                    name="copyright"
                    value={formik.values.copyright}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your CopyRight"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.copyright && formik.errors.copyright ? (
                    <div className="text-red-500">
                      {formik.errors.copyright}
                    </div>
                  ) : null}
                  <p>Please enter CopyRight</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Logo Img
                    <span className="text-danger">
                      (H:512 * W:512 & MAX-1MB)
                    </span>
                  </label>
                  <input
                    type="file"
                    name="logo"
                    value={formik.values.logo}
                    onChange={(event) =>
                      formik.setFieldValue('Image', event.target.files[0])
                    }
                    onBlur={formik.handleBlur}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.logo && formik.errors.logo ? (
                    <div className="text-red-500">{formik.errors.logo}</div>
                  ) : null}

                  <div className="mt-5">
                    <p>Your Exsisting Img File*</p>
                    <div className="grid grid-cols-4 gap-2 relative">
                      <div className="relative">
                        <img
                          src={Logo}
                          className="w-full rounded border p-2 "
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Favicon Img
                    <span className="text-danger">(H:64 * W:64 & MAX-1MB)</span>
                  </label>
                  <input
                    type="file"
                    name="favicon"
                    value={formik.values.favicon}
                    onChange={(event) =>
                      formik.setFieldValue('Image', event.target.files[0])
                    }
                    onBlur={formik.handleBlur}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.favicon && formik.errors.favicon ? (
                    <div className="text-red-500">{formik.errors.favicon}</div>
                  ) : null}
                  <div className="mt-5">
                    <p>Your Exsisting Img File*</p>
                    <div className="grid grid-cols-4 gap-2 relative">
                      <div className="relative">
                        <img
                          className="w-full rounded border p-2 "
                          src={Logo}
                        />
                      </div>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitesetting;
