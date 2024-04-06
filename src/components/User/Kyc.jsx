import React from 'react';
import { FaDownload } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const UserKyc = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/user/listing');
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div>
        {/*------------------GENERAL INFORMATION------------------*/}
        <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
          General Informmation
        </h1>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th class="px-6 py-4 w-1/2 ">GSTIN </th>
                <td class="px-6 py-4 w-1/2 text-base">1234567981</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th class="px-6 py-4 w-1/2 ">PAN </th>
                <td class="px-6 py-4 w-1/2 text-base">ABCDE1212H</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th class="px-6 py-4 w-1/2 ">Registered Company Name </th>
                <td class="px-6 py-4 w-1/2 text-base">Test</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th class="px-6 py-4 w-1/2 ">Registered Company Address </th>
                <td class="px-6 py-4 w-1/2 text-base">Test</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th class="px-6 py-4 w-1/2 ">State </th>
                <td class="px-6 py-4 w-1/2 text-base">Gujarat</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th class="px-6 py-4 w-1/2 ">Contact No </th>
                <td class="px-6 py-4 w-1/2 text-base">12345612</td>
              </tr>
              <tr class="bg-white   dark:bg-gray-800 dark:border-gray-700">
                <th class="px-6 py-4 w-1/2 ">Email </th>
                <td class="px-6 py-4 w-1/2 text-base">Gujarat</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {/*------------------GENERAL INFORMATION------------------*/}
        <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
          Bank Account Details
        </h1>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th class="px-6 py-4 w-1/2 ">Account Type </th>
                <td class="px-6 py-4 w-1/2 text-base">Saving</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th class="px-6 py-4 w-1/2 ">Beneficiary Names </th>
                <td class="px-6 py-4 w-1/2 text-base">Test</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th class="px-6 py-4 w-1/2 ">Account Number </th>
                <td class="px-6 py-4 w-1/2 text-base">123231321</td>
              </tr>
              <tr class="bg-white  dark:bg-gray-800 dark:border-gray-700">
                <th class="px-6 py-4 w-1/2 ">IFSC </th>
                <td class="px-6 py-4 w-1/2 text-base">BARBOAFD21</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {/*------------------Documnet------------------*/}
        <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
          Documents
        </h1>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th class="px-6 py-4 w-1/2 ">Pan </th>
                <td class="px-6 py-4 w-1/2 text-base">
                  <a href="javascript:void(0)" className="flex items-center">
                    <FaDownload className="mr-2" />
                    View
                  </a>
                </td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th class="px-6 py-4 w-1/2 ">Cancelled Cheque </th>
                <td class="px-6 py-4 w-1/2 text-base">
                  <a href="javascript:void(0)" className="flex items-center">
                    <FaDownload className="mr-2" />
                    View
                  </a>
                </td>
              </tr>
              <tr class="bg-white  dark:bg-gray-800 dark:border-gray-700">
                <th class="px-6 py-4 w-1/2 ">Agreement </th>
                <td class="px-6 py-4 w-1/2 text-base">
                  <a href="javascript:void(0)" className="flex items-center">
                    <FaDownload className="mr-2" />
                    View
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {/*------------------Documnet------------------*/}
        <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
          Action
        </h1>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white py-4">
          <form className="grid grid-cols-1 lg:grid-cols-3 ">
            <div className="col-span-2">
              <div className="flex flex-col   px-5.5 pb-3">
                <label className="  block text-black dark:text-white">
                  KYC Status <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <div>
                    <input
                      type="radio"
                      name="KStatus"
                      className="mx-2 ml-0"
                      value="1"
                      // checked={blogadd.Status === '1'}
                    />
                    Pending
                    <input
                      type="radio"
                      name="KStatus"
                      className="mx-2"
                      value="0"
                      // checked={blogadd.Status == = '0'}
                    />
                    Approved
                  </div>
                </div>
              </div>
              <div className="flex flex-col   px-5.5 pb-2">
                <label className="  block text-black dark:text-white">
                  Status <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <div>
                    <input
                      type="radio"
                      name="Status"
                      className="mx-2 ml-0"
                      value="1"
                      // checked={blogadd.Status === '1'}
                    />
                    Active
                    <input
                      type="radio"
                      name="Status"
                      className="mx-2"
                      value="0"
                      // checked={blogadd.Status == = '0'}
                    />
                    In Active
                  </div>
                </div>
                <p>Please select an a one status by default is inactive.</p>
              </div>
            </div>
            <div className="flex  items-center  gap-5.5 py-3.5   col-span-1">
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
  );
};

export default UserKyc;
