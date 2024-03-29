import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import Logo from '../../images/mainlogo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import NewEditor from '../EDITOR/NewEditor';

const validateSchema = Yup.object().shape({
  name: Yup.string().required('City Name is required.'),
  content: Yup.string().required('Content is required.'),
});

const ArtistEdit = () => {
  // ================ Get data by Id============
  // const { Id } = useParams();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (Id) {
  //         const SliderData = await getCategoryById(Id);
  //         formik.setValues({
  //           Id: SliderData.Id || '',
  //           Title: SliderData.Title || '',
  //           Slug: SliderData.Slug || '',
  //           Content: SliderData.Content || '',
  //           Icon: SliderData.Icon || '',
  //           Hid_Icon: SliderData.Hid_Icon || '',
  //           Image: SliderData.Image || '',
  //           Hid_Image: SliderData.Hid_Image || '',
  //           Status: SliderData.Status || '0',
  //         });
  //         console.log('====================================');
  //         console.log(SliderData);
  //         console.log('====================================');
  //       } else {
  //         console.log('error');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [Id]);
  const formik = useFormik({
    initialValues: {
      name: '',
      icon: '',
      content: '',
      Status: '',
    },
    validationSchema: validateSchema,
    onSubmit: async (values, actions) => {
      sessionStorage.setItem('Artist-Edit-Data', JSON.stringify(values));
      // try {
      //   const formData = new FormData();
      //   formData.append('Title', values.Title);
      //   formData.append('Url', values.Url);
      //   if (values.Image instanceof File) {
      //     formData.append('Image', values.Image);
      //   } else {
      //     formData.append('Image', values.Image);
      //   }
      //   formData.append('Content', values.Content);
      //   formData.append('Status', values.Status);

      //   await AddSlider(formData);
      //   actions.resetForm();
      //   navigate('/slider/listing');
      // } catch (error) {
      //   console.error('Error updating slider:', error);
      // }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/slider/listing');
  };
  return (
    <div>
      <Breadcrumb pageName="Artist Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Artist edit
              </h3>
              <p>
                Please fill all detail and edit new Artist edit in your Sub
                Admin edit directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              {/*===========Name===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500">{formik.errors.name}</div>
                  )}

                  <p>Please enter Name</p>
                </div>
              </div>

              {/*===========Profile Image===========*/}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Profile Image
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="icon"
                    value={formik.values.icon}
                    onChange={(event) =>
                      formik.setFieldValue('Image', event.target.files[0])
                    }
                    onBlur={formik.handleBlur}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.icon && formik.errors.icon && (
                    <div className="text-red-500">{formik.errors.icon}</div>
                  )}
                  <p>Please select an a jpg, png, gif, jpeg, webp file only.</p>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Your Exsisting Img File
                    <span className="text-danger">*</span>
                  </label>
                  <img src={Logo} alt="" className="w-40 rounded border p-2 " />
                </div>
              </div>

              {/*===========Content===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Content <span className="text-danger">*</span>
                  </label>
                  <NewEditor
                    name="content"
                    value={formik.values.content}
                    onChange={(content) => {
                      formik.setFieldValue('content', content);
                      formik.setFieldTouched('content', true);
                    }}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.content && formik.errors.content && (
                    <div className="text-red-500">{formik.errors.content}</div>
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

export default ArtistEdit;
