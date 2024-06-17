import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AddPages } from '../../API/PageApi';
import NewEditor from '../EDITOR/NewEditor';
import { AddOffer } from '../../API/OfferApi';
import FormLoader from '../../common/Loader/FormLoader';

const validateSchema = Yup.object().shape({
  Title: Yup.string().required('Title is required.'),
  Slug: Yup.string().required('Slug is required.'),
  Content: Yup.string().required('Content is required.'),
  Image: Yup.mixed().required('Image is required.'),
  Icon: Yup.mixed().required('Icon is required.'),
});

const OfferAdd = () => {
  const navigate = useNavigate();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    Title: '',
    Slug: '',
    Content: '',
    Image: '',
    Icon: '',
    Status: '1',
    faqData: [{ Title: '', Content: '' }],
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validateSchema,
    onSubmit: async (values, actions) => {
      setIsFormLoading(true);
      try {
        const formDataToSend = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key === 'faqData') {
            formDataToSend.append(key, JSON.stringify(formData[key]));
          } else {
            formDataToSend.append(key, value);
          }
        });

        await AddOffer(formDataToSend);
        actions.resetForm();
        navigate('/offer/listing');
      } catch (error) {
        console.error('Error adding Offer:', error);
      } finally {
        setIsFormLoading(false); // Set loading state to false when submission ends
      }
    },
  });

  const addVenue = () => {
    setFormData((prevState) => ({
      ...prevState,
      faqData: [...prevState.faqData, { Title: '', Content: '' }],
    }));
    formik.setFieldValue('faqData', [
      ...formik.values.faqData,
      { Title: '', Content: '' },
    ]);
  };

  const handleVenueChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVenue = [...formData.faqData];
    updatedVenue[index][name] = value;
    setFormData({ ...formData, faqData: updatedVenue });
    formik.setFieldValue('faqData', updatedVenue);
  };

  const removeVenue = (index) => {
    const updatedVenues = [...formData.faqData];
    updatedVenues.splice(index, 1);
    setFormData({ ...formData, faqData: updatedVenues });
    formik.setFieldValue('faqData', updatedVenues);
  };

  const handleGoBack = () => {
    navigate('/offer/listing');
  };

  return (
    <div>
      <Breadcrumb pageName="Offer Add" />
      {isFormLoading && <FormLoader loading={isFormLoading} />}
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Offer Add
              </h3>
              <p>
                Please fill all detail and add new Offer Add in your Sub Admin
                directory
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 py-3.5 px-5.5">
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
                    placeholder="Enter Title"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Title && formik.errors.Title && (
                    <div className="text-red-500">{formik.errors.Title}</div>
                  )}
                  <p>Please enter Title</p>
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
                  />

                  {formik.touched.Slug && formik.errors.Slug && (
                    <div className="text-red-500">{formik.errors.Slug}</div>
                  )}
                  <p>Please enter Slug</p>
                </div>
              </div>

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Image<span className="text-danger">*</span>
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
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Icon<span className="text-danger">*</span>
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
                </div>
              </div>

              <div className="gap-5.5 py-3.5 px-5.5">
                <h1 className="mt-2 text-gray-700 dark:text-gray-300">
                  Add FAQ for this Offer
                </h1>
                <div className="mt-1.5 border-[1.5px] border-gray-500">
                  {formik.values.faqData.map((val, index) => (
                    <div
                      key={index}
                      className="p-2 rounded-3 lg:flex border-b border-gray-500"
                    >
                      <div className="lg:w-2/5 w-auto mx-2">
                        <label className="my-auto whitespace-nowrap text-gray-700 dark:text-gray-200">
                          Question
                        </label>
                        <input
                          type="text"
                          name="Title"
                          onChange={(e) => handleVenueChange(index, e)}
                          value={val.Title}
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          placeholder="Title"
                        />
                      </div>
                      <div className="lg:w-2/5 w-auto mx-2">
                        <label className="my-auto whitespace-nowrap text-gray-700 dark:text-gray-200">
                          Content
                        </label>
                        <input
                          type="text"
                          name="Content"
                          onChange={(e) => handleVenueChange(index, e)}
                          value={val.Content}
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          placeholder="Content"
                        />
                      </div>
                      <div className="lg:w-1/5 w-auto mx-2">
                        <button
                          className="w-full bg-themecolor2 py-2 mt-5 text-white rounded-full font-semibold"
                          type="button"
                          onClick={() => removeVenue(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-white bg-red-700 p-2 px-5 my-3 block m-auto rounded-md"
                    onClick={addVenue}
                  >
                    Add FAQ
                  </button>
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
                      checked={formik.values.Status === '1'}
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
                      checked={formik.values.Status === '0'}
                    />
                    Inactive
                  </div>
                </div>
                <p>Please select a status. Default is inactive.</p>
              </div>

              <div className="flex gap-5.5 py-3.5 px-5.5">
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

export default OfferAdd;
