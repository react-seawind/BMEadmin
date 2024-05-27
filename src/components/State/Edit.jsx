import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getStateById, updateStateById } from '../../API/StateAPI';

const validateSchema = Yup.object().shape({
  Title: Yup.string().required('State Name is required.'),
  Slug: Yup.string().required('Slug is required.'),
  Image: Yup.string().required('Image is required.'),
});

const StateEdit = () => {
  // ================ Get data by Id============
  const { Id } = useParams();
  const [imagePreview, setImagePreview] = useState();
  const fetchData = async () => {
    try {
      if (Id) {
        const StateData = await getStateById(Id);
        formik.setValues(StateData);
        if (StateData.Image) {
          setImagePreview(StateData.Image); // Update image preview if image exists
        }
      } else {
        console.log('error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [Id]);
  const formik = useFormik({
    initialValues: {
      Title: '',
      Slug: '',
      Image: null,
      Hid_Image: '',
      Status: '',
    },
    validationSchema: validateSchema,
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        await updateStateById(formData);
        fetchData();
      } catch (error) {
        console.error('Error updating slider:', error);
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/state/listing');
  };
  return (
    <div>
      <Breadcrumb pageName="State Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                State Add
              </h3>
              <p>
                Please fill all detail and add new State in your State directory
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <input
                type="hidden"
                name="Hid_Image"
                value={formik.values.Hid_Image}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 p-6.5">
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
                    placeholder="Enter State Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Title && formik.errors.Title ? (
                    <div className="text-red-500">{formik.errors.Title}</div>
                  ) : null}

                  <p>Please enter State Name</p>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Slug <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
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
                    name="Slug"
                    placeholder="Enter Slug"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Slug && formik.errors.Slug ? (
                    <div className="text-red-500">{formik.errors.Slug}</div>
                  ) : null}

                  <p>Please enter Slug</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 p-6.5">
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
                  <p>Please select an a jpg, png, gif, jpeg, webp file only.</p>
                </div>
                <div className="mt-5">
                  <p>Your Exsisting Img File</p>
                  <div className="grid grid-cols-4 gap-2 relative">
                    <div className="relative">
                      <img
                        src={imagePreview}
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

export default StateEdit;
