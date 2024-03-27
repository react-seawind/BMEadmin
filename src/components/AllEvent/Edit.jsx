import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import Logo from '../../images/mainlogo.png';
import favicon from '../../images/loaderimage.png';
import NewEditor from '../EDITOR/NewEditor';
import { name } from 'file-loader';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const AllEventEdit = () => {
  // // ================ Get data by Id============
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
      type: '',
      organiser: '',
      desc: '',
      actor: '',
      bimage: '',
      timage: '',
      actorimg: '',
      estime: '',
      eetime: '',
      maincategory: '',
      subcategory: '',
      cname: '',
      cemail: '',
      cphone: '',
      Status: '',
      Approve: '',
    },
    onSubmit: async (values, actions) => {
      sessionStorage.setItem('event-edit-data', JSON.stringify(values));
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
      <Breadcrumb pageName="Event Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Event</h3>
              <p>
                Please fill all detail and edit new Event in your Event edit
                directory
              </p>
            </div>
            <form onSubmit={formik.handleChange}>
              {/*===========Name===========*/}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Event Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500">{formik.errors.name}</div>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500">{formik.errors.email}</div>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Event Type <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.type && formik.errors.type && (
                    <div className="text-red-500">{formik.errors.type}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Organiser Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="organiser"
                    value={formik.values.organiser}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.organiser && formik.errors.organiser && (
                    <div className="text-red-500">
                      {formik.errors.organiser}
                    </div>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Description <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="desc"
                    value={formik.values.desc}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.desc && formik.errors.desc && (
                    <div className="text-red-500">{formik.errors.desc}</div>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Actor Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="actor"
                    value={formik.values.actor}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.actor && formik.errors.actor && (
                    <div className="text-red-500">{formik.errors.actor}</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Banner Image <span className="text-danger">*</span>
                  </label>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Your Exsisting Img File
                      <span className="text-danger">*</span>
                    </label>
                    <img
                      src={Logo}
                      alt=""
                      className="w-40 rounded border p-2 "
                    />
                  </div>
                  {formik.touched.bimage && formik.errors.bimage && (
                    <div className="text-red-500">{formik.errors.bimage}</div>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Thumb Image <span className="text-danger">*</span>
                  </label>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Your Exsisting Img File
                      <span className="text-danger">*</span>
                    </label>
                    <img
                      src={Logo}
                      alt=""
                      className="w-40 rounded border p-2 "
                    />
                  </div>
                  {formik.touched.timage && formik.errors.timage && (
                    <div className="text-red-500">{formik.errors.timage}</div>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Actor Image <span className="text-danger">*</span>
                  </label>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Your Exsisting Img File
                      <span className="text-danger">*</span>
                    </label>
                    <img
                      src={Logo}
                      alt=""
                      className="w-40 rounded border p-2 "
                    />
                  </div>
                  {formik.touched.actorimg && formik.errors.actorimg && (
                    <div className="text-red-500">{formik.errors.actorimg}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Event Start Time <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="estime"
                    value={formik.values.estime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.estime && formik.errors.estime && (
                    <div className="text-red-500">{formik.errors.estime}</div>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Event End Time <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="eetime"
                    value={formik.values.eetime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.eetime && formik.errors.eetime && (
                    <div className="text-red-500">{formik.errors.eetime}</div>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Event main category <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="maincategory"
                    value={formik.values.maincategory}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.maincategory &&
                    formik.errors.maincategory && (
                      <div className="text-red-500">
                        {formik.errors.maincategory}
                      </div>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Event Sub category <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="subcategory"
                    value={formik.values.subcategory}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.subcategory && formik.errors.subcategory && (
                    <div className="text-red-500">
                      {formik.errors.subcategory}
                    </div>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Contact Person Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="cname"
                    value={formik.values.cname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.cname && formik.errors.cname && (
                    <div className="text-red-500">{formik.errors.cname}</div>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Contact person Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="cemail"
                    value={formik.values.cemail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.cemail && formik.errors.cemail && (
                    <div className="text-red-500">{formik.errors.cemail}</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Contact Person Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="cphone"
                    value={formik.values.cphone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.cphone && formik.errors.cphone && (
                    <div className="text-red-500">{formik.errors.cphone}</div>
                  )}
                </div>
              </div>

              <div className="my-5 mx-3">
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4">
                  <div className="shadow-md">
                    <div className="bg-themecolor1 py-2 text-white font-bold text-center">
                      GOLD
                    </div>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
                      <tbody>
                        <tr className="border-b">
                          <th class="px-6 py-2">Total:</th>
                          <td class="px-6 py-2">500</td>
                        </tr>
                        <tr className="border-b">
                          <th class="px-6 py-2">Alloted:</th>
                          <td class="px-6 py-2">400</td>
                        </tr>
                        <tr className="border-b">
                          <th class="px-6 py-2">Available:</th>
                          <td class="px-6 py-2">100</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="text-center font-bold border py-3 border-black">
                      Ticket Price : ₹500
                    </p>
                  </div>
                  <div className="shadow-md">
                    <div className="bg-themecolor1 py-2 text-white font-bold text-center">
                      DIMOND
                    </div>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
                      <tbody>
                        <tr className="border-b">
                          <th class="px-6 py-2">Total:</th>
                          <td class="px-6 py-2">500</td>
                        </tr>
                        <tr className="border-b">
                          <th class="px-6 py-2">Alloted:</th>
                          <td class="px-6 py-2">400</td>
                        </tr>
                        <tr className="border-b">
                          <th class="px-6 py-2">Available:</th>
                          <td class="px-6 py-2">100</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="text-center font-bold border py-3 border-black">
                      Ticket Price : ₹1000
                    </p>
                  </div>
                  <div className="shadow-md">
                    <div className="bg-themecolor1 py-2 text-white font-bold text-center">
                      SILVER
                    </div>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
                      <tbody>
                        <tr className="border-b">
                          <th class="px-6 py-2">Total:</th>
                          <td class="px-6 py-2">500</td>
                        </tr>
                        <tr className="border-b">
                          <th class="px-6 py-2">Alloted:</th>
                          <td class="px-6 py-2">400</td>
                        </tr>
                        <tr className="border-b">
                          <th class="px-6 py-2">Available:</th>
                          <td class="px-6 py-2">100</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="text-center font-bold border py-3 border-black">
                      Ticket Price : ₹1500
                    </p>
                  </div>
                  <div className="shadow-md">
                    <div className="bg-themecolor1 py-2 text-white font-bold text-center">
                      PLATINUM
                    </div>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
                      <tbody>
                        <tr className="border-b">
                          <th class="px-6 py-2">Total:</th>
                          <td class="px-6 py-2">500</td>
                        </tr>
                        <tr className="border-b">
                          <th class="px-6 py-2">Alloted:</th>
                          <td class="px-6 py-2">400</td>
                        </tr>
                        <tr className="border-b">
                          <th class="px-6 py-2">Available:</th>
                          <td class="px-6 py-2">100</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="text-center font-bold border py-3 border-black">
                      Ticket Price : ₹2000
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5  px-5.5">
                <label className="  block text-black dark:text-white">
                  Status <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <div>
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Approve"
                      className="mx-2"
                      value="1"
                      // checked={blogadd.Status === '1'}
                    />
                    Reject
                  </div>
                  <div>
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Approve"
                      className="mx-2"
                      value="0"
                      // checked={blogadd.Status == = '0'}
                    />
                    Approved
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 py-3.5 px-5.5">
                <label className=" block text-black dark:text-white">
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
                >
                  Cancel
                </button>
                <Link className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
                  View Event
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEventEdit;
