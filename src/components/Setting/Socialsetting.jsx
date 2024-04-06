import React, { useEffect } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getSocialSettingById,
  updateSocialSettingById,
} from '../../API/SocialSettingApi';

const validationSchema = Yup.object().shape({
  whatsapp: Yup.string()
    .matches(/^[0-9]+$/, 'Only Number are allowed for this field ')
    .min(10, 'User Phone must be at most 10 characters')
    .max(10, 'User Phone must be at most 10 characters'),
});

const Socialsetting = () => {
  // ================ Get data by Id============
  const { Id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SocialData = await getSocialSettingById(Id);
        formik.setValues({
          Id: SocialData.Id || '',
          Facebook: SocialData.Facebook || '',
          Twitter: SocialData.Twitter || '',
          GooglePlus: SocialData.GooglePlus || '',
          Instagram: SocialData.Instagram || '',
          Youtube: SocialData.Youtube || '',
          Linkedin: SocialData.Linkedin || '',
          Skype: SocialData.Skype || '',
          WhatsApp: SocialData.WhatsApp || '',
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Id]);
  const formik = useFormik({
    initialValues: {
      Facebook: '',
      Twitter: '',
      GooglePlus: '',
      Instagram: '',
      Youtube: '',
      Linkedin: '',
      Skype: '',
      WhatsApp: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        await updateSocialSettingById(values);
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
                    name="Facebook"
                    value={formik.values.Facebook}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Facebook"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Facebook && formik.errors.Facebook ? (
                    <div className="text-red-500">{formik.errors.Facebook}</div>
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
                    name="Twitter"
                    value={formik.values.Twitter}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Twitter"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Twitter && formik.errors.Twitter ? (
                    <div className="text-red-500">{formik.errors.Twitter}</div>
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
                    name="GooglePlus"
                    value={formik.values.GooglePlus}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your GooglePlus"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.GooglePlus && formik.errors.GooglePlus ? (
                    <div className="text-red-500">
                      {formik.errors.GooglePlus}
                    </div>
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
                    name="Instagram"
                    value={formik.values.Instagram}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Instagram"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Instagram && formik.errors.Instagram ? (
                    <div className="text-red-500">
                      {formik.errors.Instagram}
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
                    name="Youtube"
                    value={formik.values.Youtube}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Youtube"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Youtube && formik.errors.Youtube ? (
                    <div className="text-red-500">{formik.errors.Youtube}</div>
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
                    name="Linkedin"
                    value={formik.values.Linkedin}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Linkedin"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Linkedin && formik.errors.Linkedin ? (
                    <div className="text-red-500">{formik.errors.Linkedin}</div>
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
                    name="Skype"
                    value={formik.values.Skype}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Skype"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Skype && formik.errors.Skype ? (
                    <div className="text-red-500">{formik.errors.Skype}</div>
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
                    name="Whatsapp"
                    value={formik.values.Whatsapp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your WhatsApp"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Whatsapp && formik.errors.Whatsapp ? (
                    <div className="text-red-500">{formik.errors.Whatsapp}</div>
                  ) : null}
                  <p>Please enter Whatsapp number</p>
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

export default Socialsetting;
