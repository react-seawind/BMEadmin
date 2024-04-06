import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import Logo from '../../images/mainlogo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const validateSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z a-z]+$/, 'Only alphabets are allowed for this field ')
    .required('Name is required'),
  email: Yup.string().email().required('Email is required.'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Only Number are allowed for this field ')
    .min(10, 'User Phone must be at most 10 characters')
    .max(10, 'User Phone must be at most 10 characters')
    .required('Number is Required'),
  pimage: Yup.string().required('Profile image is required.'),
  city: Yup.string().required('City is required.'),
  state: Yup.string().required('State is required.'),
  pincode: Yup.string()
    .matches(/^[0-9]+$/, 'Only numbres are allowed for this field ')
    .max(6)
    .min(6)
    .required('Pincode is required'),
  password: Yup.string().required('Password is required.'),
  cpassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const UserEdit = () => {
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
      email: '',
      phone: '',
      pimage: '',
      city: '',
      state: '',
      pincode: '',
      password: '',
      cpassword: '',
      Status: '',
    },
    validationSchema: validateSchema,
    onSubmit: async (values, actions) => {
      sessionStorage.setItem('User-Add-Data', JSON.stringify(values));
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
    navigate('/user/listing');
  };
  return (
    <div>
      <Breadcrumb pageName="User Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                User edit
              </h3>
              <p>
                Please fill all detail and edit new User edit in your User edit
                directory
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
              {/*===========Email===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500">{formik.errors.email}</div>
                  )}
                  <p>Please enter Email</p>
                </div>
              </div>
              {/*===========Phone===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Phone"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="text-red-500">{formik.errors.phone}</div>
                  )}
                  <p>Please enter Phone</p>
                </div>
              </div>{' '}
              {/*===========Profile Image===========*/}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Profile Image
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="pimage"
                    value={formik.values.pimage}
                    onChange={(event) =>
                      formik.setFieldValue('Image', event.target.files[0])
                    }
                    onBlur={formik.handleBlur}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.pimage && formik.errors.pimage && (
                    <div className="text-red-500">{formik.errors.pimage}</div>
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
              {/*===========city===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    City <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter City"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />{' '}
                  {formik.touched.city && formik.errors.city && (
                    <div className="text-red-500">{formik.errors.city}</div>
                  )}
                  <p>Please enter City</p>
                </div>
              </div>
              {/*===========state===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    State <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter State"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />{' '}
                  {formik.touched.state && formik.errors.state && (
                    <div className="text-red-500">{formik.errors.state}</div>
                  )}
                  <p>Please enter State</p>
                </div>
              </div>
              {/*===========Pincode===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Pincode <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formik.values.pincode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Pincode"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />{' '}
                  {formik.touched.pincode && formik.errors.pincode && (
                    <div className="text-red-500">{formik.errors.pincode}</div>
                  )}
                  <p>Please enter Pincode</p>
                </div>
              </div>
              {/*===========Password===========*/}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Password"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />{' '}
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500">{formik.errors.password}</div>
                  )}
                  <p>Please enter Password</p>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="cpassword"
                    value={formik.values.cpassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Confirm Password"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />{' '}
                  {formik.touched.cpassword && formik.errors.cpassword && (
                    <div className="text-red-500">
                      {formik.errors.cpassword}
                    </div>
                  )}
                  <p>Please enter Confirm Password</p>
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

export default UserEdit;
