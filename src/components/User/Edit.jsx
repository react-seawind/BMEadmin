import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import Logo from '../../images/mainlogo.png';
import favicon from '../../images/loaderimage.png';
import NewEditor from '../EDITOR/NewEditor';
import { name } from 'file-loader';

const UserEdit = () => {
  const [authoradd, setAuthoradd] = useState({
    name: '',
    email: '',
    phone: '',
    profileimage: '',
    password: '',
    cpassword: '',
    modules: [],
    selectedStatus: '1',
  });

  useEffect(() => {
    const getdata = JSON.parse(localStorage.getItem('Author-add-data'));
    setAuthoradd(getdata);
  }, []);

  const myHandler = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updatedModules = checked
        ? [...authoradd.modules, value]
        : authoradd.modules.filter((module) => module !== value);

      setAuthoradd((prevAuthoradd) => ({
        ...prevAuthoradd,
        modules: updatedModules,
      }));
    } else {
      setAuthoradd((prevAuthoradd) => ({
        ...prevAuthoradd,
        [name]: value,
      }));
    }
  };
  const mySubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('Author-add-data', JSON.stringify(authoradd));
  };
  return (
    <div>
      <Breadcrumb pageName="Author Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Sub Admin edit
              </h3>
              <p>
                Please fill all detail and edit new Sub Admin edit in your Sub
                Admin edit directory
              </p>
            </div>
            <form onSubmit={mySubmit}>
              {/*===========Name===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={myHandler}
                    name="name"
                    value={authoradd.name}
                    placeholder="Enter Your Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />

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
                    type="text"
                    onChange={myHandler}
                    name="email"
                    value={authoradd.email}
                    placeholder="Enter Your Email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
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
                    onChange={myHandler}
                    name="phone"
                    value={authoradd.phone}
                    placeholder="Enter Your Phone"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
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
                    onChange={myHandler}
                    name="profileimage"
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />

                  <p>Please select an a png,jpeg,jpg,gif file only.</p>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Your Exsisting Img File
                    <span className="text-danger">*</span>
                  </label>
                  <img src={authoradd.profileimage} alt="" className="w-40" />
                </div>
              </div>
              {/*===========Password===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={myHandler}
                    name="password"
                    value={authoradd.password}
                    placeholder="Enter Your Password"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <p>Please enter Password</p>
                </div>
              </div>
              {/*===========Confirm Password===========*/}
              <div className="flex flex-col gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={myHandler}
                    name="cpassword"
                    value={authoradd.cpassword}
                    placeholder="Enter Your Confirm Password"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <p>Please enter Confirm Password</p>
                </div>
              </div>
              {/*==========Module Enable=============*/}
              <div className="gap-5.5 py-3.5 px-5.5">
                <label className="mb-3 block text-black dark:text-white">
                  Module Enable <span className="text-danger">*</span>
                </label>
                <div className="grid grid-cols-5 ">
                  <div>
                    <input
                      type="checkbox"
                      className="mx-2"
                      onChange={myHandler}
                      name="AddressSettings"
                      value="AddressSettings"
                      checked={authoradd.modules.includes('AddressSettings')}
                    />
                    AddressSetings
                    <input
                      type="checkbox"
                      className="mx-2"
                      onChange={myHandler}
                      name="AddressSettings"
                      value="AddressSettings2"
                      checked={authoradd.modules.includes('AddressSettings2')}
                    />
                    AddressSetings
                    <input
                      type="checkbox"
                      className="mx-2"
                      onChange={myHandler}
                      name="AddressSettings"
                      value="AddressSettings3"
                      checked={authoradd.modules.includes('AddressSettings3')}
                    />
                    AddressSetings
                    <input
                      type="checkbox"
                      className="mx-2"
                      onChange={myHandler}
                      name="AddressSettings"
                      value="AddressSettings4"
                      checked={authoradd.modules.includes('AddressSettings4')}
                    />
                    AddressSetings
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
                      onChange={myHandler}
                      name="selectedStatus"
                      className="mx-2"
                      value="1"
                      checked={authoradd.selectedStatus === '1'}
                    />
                    Active
                  </div>
                  <div>
                    <input
                      type="radio"
                      onChange={myHandler}
                      name="selectedStatus"
                      className="mx-2"
                      value="2"
                      checked={authoradd.selectedStatus === '2'}
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
                  type="submit"
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
