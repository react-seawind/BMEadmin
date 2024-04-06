import React, { useEffect } from 'react';
import Breadcrumb from '../Breadcrumb';
import Logo from '../../images/mainlogo.png';
import * as Yup from 'yup';
import { IoMdClose } from 'react-icons/io';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getSiteSettingById,
  updateSiteSettingById,
} from '../../API/SiteSettingApi';

const validationSchema = Yup.object().shape({});

const Sitesetting = () => {
  // ================ Get data by Id============
  const { Id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ContactData = await getSiteSettingById(Id);
        formik.setValues({
          Id: ContactData.Id || '',
          Logo: ContactData.Logo || '',
          Hid_Logo: ContactData.Hid_Logo || '',
          Favicon: ContactData.Favicon || '',
          Hid_Favicon: ContactData.Hid_Favicon || '',
          SiteUrl: ContactData.SiteUrl || '',
          copyright: ContactData.copyright || '',
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Id]);
  const formik = useFormik({
    initialValues: {
      Logo: '',
      Hid_Logo: '',
      Favicon: '',
      Hid_Favicon: '',
      SiteUrl: '',
      copyright: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();
        formData.append('Id', values.Id);
        if (values.Logo instanceof File) {
          formData.append('Logo', values.Logo);
        } else {
          formData.append('Logo', values.Logo);
        }
        formData.append('Hid_Logo', values.Hid_Logo);
        if (values.Favicon instanceof File) {
          formData.append('Favicon', values.Favicon);
        } else {
          formData.append('Favicon', values.Favicon);
        }
        formData.append('Hid_Favicon', values.Hid_Favicon);
        formData.append('SiteUrl', values.SiteUrl);
        formData.append('copyright', values.copyright);

        await updateSiteSettingById(formData);
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
              <input
                type="hidden"
                name="Hid_Logo"
                value={formik.values.Hid_Logo}
              />
              <input
                type="hidden"
                name="Hid_Favicon"
                value={formik.values.Hid_Favicon}
              />
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Site Url
                  </label>
                  <input
                    type="text"
                    name="SiteUrl"
                    value={formik.values.SiteUrl}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your SiteUrl"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.SiteUrl && formik.errors.SiteUrl ? (
                    <div className="text-red-500">{formik.errors.SiteUrl}</div>
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
                    name="Logo"
                    value={formik.values.Logo}
                    onChange={(event) =>
                      formik.setFieldValue('Logo', event.target.files[0])
                    }
                    onBlur={formik.handleBlur}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.Logo && formik.errors.Logo ? (
                    <div className="text-red-500">{formik.errors.Logo}</div>
                  ) : null}

                  <div className="mt-5">
                    <p>Your Exsisting Img File*</p>
                    <div className="grid grid-cols-4 gap-2 relative">
                      <div className="relative">
                        <img
                          src={formik.values.Logo}
                          className="w-full rounded border p-2 h-28 w-28"
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
                    name="Favicon"
                    value={formik.values.Favicon}
                    onChange={(event) =>
                      formik.setFieldValue('Image', event.target.files[0])
                    }
                    onBlur={formik.handleBlur}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.Favicon && formik.errors.Favicon ? (
                    <div className="text-red-500">{formik.errors.Favicon}</div>
                  ) : null}
                  <div className="mt-5">
                    <p>Your Exsisting Img File*</p>
                    <div className="grid grid-cols-4 gap-2 relative">
                      <div className="relative">
                        <img
                          className="w-full rounded border p-2 h-28 w-28"
                          src={formik.values.Favicon}
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
