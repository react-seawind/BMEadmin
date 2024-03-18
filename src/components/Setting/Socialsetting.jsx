import React from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  whatsapp: Yup.string()
    .matches(/^[0-9]+$/, 'Only Number are allowed for this field ')
    .min(10, 'User Phone must be at most 10 characters')
    .max(10, 'User Phone must be at most 10 characters'),
});

const Socialsetting = () => {
  const formik = useFormik({
    initialValues: {
      facebook: '',
      twitter: '',
      google: '',
      instagram: '',
      youtube: '',
      linkedin: '',
      skype: '',
      whatsapp: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      sessionStorage.setItem('SocialSettingData', JSON.stringify(values));
      actions.resetForm();
      toast('Data Update Successfully');
    },
  });
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Breadcrumb pageName="Social Settings Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Social Settings Edit
              </h3>
              <p>
                Please fill all detail and Edit Social settings in your Social
                settings directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Facebook
                  </label>
                  <input
                    type="text"
                    name="facebook"
                    value={formik.values.facebook}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Facebook"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.facebook && formik.errors.facebook ? (
                    <div className="text-red-500">{formik.errors.facebook}</div>
                  ) : null}
                  <p>Please enter facebook page url</p>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Twitter
                  </label>
                  <input
                    type="text"
                    name="twitter"
                    value={formik.values.twitter}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Twitter"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.twitter && formik.errors.twitter ? (
                    <div className="text-red-500">{formik.errors.twitter}</div>
                  ) : null}
                  <p>Please enter twitter page url</p>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    GooglePlus
                  </label>
                  <input
                    type="text"
                    name="google"
                    value={formik.values.google}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your GooglePlus"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.google && formik.errors.google ? (
                    <div className="text-red-500">{formik.errors.google}</div>
                  ) : null}
                  <p>Please enter googleplus page url</p>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Instagram
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    value={formik.values.instagram}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Instagram"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.instagram && formik.errors.instagram ? (
                    <div className="text-red-500">
                      {formik.errors.instagram}
                    </div>
                  ) : null}
                  <p>Please enter instagram page url</p>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Youtube
                  </label>
                  <input
                    type="text"
                    name="youtube"
                    value={formik.values.youtube}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Youtube"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.youtube && formik.errors.youtube ? (
                    <div className="text-red-500">{formik.errors.youtube}</div>
                  ) : null}
                  <p>Please enter youtube page url</p>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Linkedin
                  </label>
                  <input
                    type="text"
                    name="linkedin"
                    value={formik.values.linkedin}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Linkedin"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.linkedin && formik.errors.linkedin ? (
                    <div className="text-red-500">{formik.errors.linkedin}</div>
                  ) : null}
                  <p>Please enter linkedin page url</p>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Skype
                  </label>
                  <input
                    type="text"
                    name="skype"
                    value={formik.values.skype}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Skype"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.skype && formik.errors.skype ? (
                    <div className="text-red-500">{formik.errors.skype}</div>
                  ) : null}
                  <p>Please enter skype page url</p>
                </div>
              </div>
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formik.values.whatsapp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your WhatsApp"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.whatsapp && formik.errors.whatsapp ? (
                    <div className="text-red-500">{formik.errors.whatsapp}</div>
                  ) : null}
                  <p>Please enter whatsapp number</p>
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
                  type="submit"
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

export default Socialsetting;
