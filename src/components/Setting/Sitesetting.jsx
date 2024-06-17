import React, { useEffect, useState } from 'react';
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
import FormLoader from '../../common/Loader/FormLoader';

const Sitesetting = () => {
  // ================ Get data by Id============
  const { Id } = useParams();
  const [Logo, setLogo] = useState(null);
  const [Favicon, setFavicon] = useState(null);
  const fetchData = async () => {
    try {
      const ContactData = await getSiteSettingById();
      formik.setValues(ContactData);
      if (ContactData.Logo) {
        setLogo(ContactData.Logo);
      }
      if (ContactData.Favicon) {
        setFavicon(ContactData.Favicon);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [Id]);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      Logo: '',
      Hid_Logo: '',
      Favicon: '',
      Hid_Favicon: '',
      SiteUrl: '',
      copyright: '',
    },
    onSubmit: async (values, actions) => {
      setIsFormLoading(true);
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        await updateSiteSettingById(formData);
        fetchData();
      } catch (error) {
        console.error('Error updating slider:', error);
      } finally {
        setIsFormLoading(false); // Set loading state to false when submission ends
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
      {isFormLoading && <FormLoader loading={isFormLoading} />}
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
                    onChange={(event) => {
                      formik.setFieldValue(
                        'Logo',
                        event.currentTarget.files[0],
                      );
                    }}
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
                          src={Logo}
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
                    onChange={(event) => {
                      formik.setFieldValue(
                        'Favicon',
                        event.currentTarget.files[0],
                      );
                    }}
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
                          src={Favicon}
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
