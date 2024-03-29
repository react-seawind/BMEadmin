import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import Logo from '../../images/mainlogo.png';
import favicon from '../../images/loaderimage.png';
import NewEditor from '../EDITOR/NewEditor';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const validateSchema = Yup.object().shape({
  title: Yup.string().required('Title is required.'),
  slug: Yup.string().required('Slug is required.'),
  content: Yup.string().required('Content is required.'),
  image: Yup.string().required('Image is required.'),
  Status: Yup.string().required('Status is required.'),
});

const PageEdit = () => {
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
      title: '',
      slug: '',
      content: '',
      image: '',
      seotitle: '',
      seokey: '',
      seodis: '',
      Status: '',
    },
    validationSchema: validateSchema,
    onSubmit: async (values, actions) => {
      sessionStorage.setItem('Page-Edit-Data', JSON.stringify(values));
      actions.resetForm();
      toast('Page Add Successfully');
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/slider/listing');
  };
  return (
    <div>
      <Breadcrumb pageName="Page Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Page Add
              </h3>
              <p>
                Please fill all detail and add new Page in your Page directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              {/*===========title===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Title"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <div className="text-red-500">{formik.errors.title}</div>
                  ) : null}
                  <p>Please enter Title</p>
                </div>
              </div>
              {/*===========Slug===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Slug <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formik.values.slug}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Slug"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.slug && formik.errors.slug ? (
                    <div className="text-red-500">{formik.errors.slug}</div>
                  ) : null}
                  <p>Please enter Slug</p>
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

              {/*===========Banner Img===========*/}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Banner Img
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    value={formik.values.image}
                    onChange={(event) =>
                      formik.setFieldValue('Image', event.target.files[0])
                    }
                    onBlur={formik.handleBlur}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.image && formik.errors.image ? (
                    <div className="text-red-500">{formik.errors.image}</div>
                  ) : null}

                  <p>Please select an a jpg, png, gif, jpeg, webp file only.</p>
                </div>

                <div className="mt-5">
                  <p>Your Exsisting Img File*</p>
                  <div className="grid grid-cols-4 gap-2 relative">
                    <div className="relative">
                      <img
                        src={Logo}
                        alt=""
                        className="w-full rounded border p-2 "
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/*===========SeoTitle===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    SeoTitle <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="seotitle"
                    value={formik.values.seotitle}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your SeoTitle"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.seotitle && formik.errors.seotitle ? (
                    <div className="text-red-500">{formik.errors.seotitle}</div>
                  ) : null}
                  <p>Please enter SeoTitle</p>
                </div>
              </div>
              {/*===========SeoKeyword===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    SeoKeyword <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="seokey"
                    value={formik.values.seokey}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your SeoKeyword"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.seokey && formik.errors.seokey ? (
                    <div className="text-red-500">{formik.errors.seokey}</div>
                  ) : null}
                  <p>Please enter SeoKeyword</p>
                </div>
              </div>
              {/*===========SeoDescription===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    SeoDescription <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows={2}
                    name="seodis"
                    value={formik.values.seodis}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Please enter SeoDescription"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                  {formik.touched.seodis && formik.errors.seodis ? (
                    <div className="text-red-500">{formik.errors.seodis}</div>
                  ) : null}
                  <p>Please enter SeoDescription</p>
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

export default PageEdit;
