import React, { useEffect, useState } from 'react';
import { FaDownload, FaEye } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUserById } from '../../API/UserApi';
import { useFormik } from 'formik';

const VendorKyc = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/vendor/listing');
  };

  // ================ Get data by Id============
  const { Id } = useParams();
  const [kycData, setKycData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Id) {
          const UserData = await getUserById(Id);
          setKycData(UserData[0]);
          formik.setValues(UserData[0]);
        } else {
          console.log('error');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Id]);

  const formik = useFormik({
    initialValues: {
      Id: Id,
      Reason: '',
      KYCStatus: '',
    },
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        await updateUserById(formData);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
  });
  return (
    <div>
      <div>
        <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
          Basic Information
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-l border-r">
            <tbody>
              {/*===================Name=================*/}
              {kycData.Name !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">Name: </th>
                  <td class="px-6 py-4 w-1/2 text-base">{kycData.Name}</td>
                </tr>
              ) : (
                ''
              )}
              {/*===================Type=================*/}
              {kycData.Type !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">Type: </th>
                  <td class="px-6 py-4 w-1/2 text-base">Vendor</td>
                </tr>
              ) : (
                ''
              )}
              {/*===================City=================*/}
              {kycData.City !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">City: </th>
                  <td class="px-6 py-4 w-1/2 text-base">{kycData.City}</td>
                </tr>
              ) : (
                ''
              )}
            </tbody>
          </table>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-l border-r">
            <tbody>
              {/*===================Area=================*/}
              {kycData.Area !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">Area: </th>
                  <td class="px-6 py-4 w-1/2 text-base">{kycData.Area}</td>
                </tr>
              ) : (
                ''
              )}
              {/*===================Pincode=================*/}
              {kycData.Pincode !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">Pincode: </th>
                  <td class="px-6 py-4 w-1/2 text-base">{kycData.Pincode}</td>
                </tr>
              ) : (
                ''
              )}
              {/*===================Address=================*/}
              {kycData.Address !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">Address: </th>
                  <td class="px-6 py-4 w-1/2 text-base">{kycData.Address}</td>
                </tr>
              ) : (
                ''
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/*------------------GENERAL INFORMATION------------------*/}
        {kycData.GSTRegistration !== '' ||
        kycData.RegisteredCompanyName !== '' ||
        kycData.RegisteredCompanyAddress !== '' ||
        kycData.State !== '' ||
        kycData.Phone !== '' ||
        kycData.Email !== '' ||
        kycData.RegisteredCompanyAddress !== '' ? (
          <>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
                General Information
              </h1>
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  {/*===================GST=================*/}
                  {kycData.GSTRegistration !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                      <th class="px-6 py-4 w-1/2 ">GST Registration </th>
                      <td class="px-6 py-4 w-1/2 text-base">
                        {kycData.GSTRegistration}
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {/*===================GST document=============*/}
                  {kycData.GSTRegistration === 'yes' ? (
                    <>
                      {/*===================GSTIN=================*/}
                      {kycData.GSTIN !== '' ? (
                        <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                          <th class="px-6 py-4 w-1/2 ">GSTIN</th>
                          <td class="px-6 py-4 w-1/2 text-base">
                            {kycData.GSTIN}
                          </td>
                        </tr>
                      ) : (
                        ''
                      )}
                      {/*===================PAN=================*/}
                      {kycData.PAN !== '' ? (
                        <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                          <th class="px-6 py-4 w-1/2 ">PAN</th>
                          <td class="px-6 py-4 w-1/2 text-base">
                            {kycData.PAN}
                          </td>
                        </tr>
                      ) : (
                        ''
                      )}
                    </>
                  ) : (
                    ''
                  )}

                  {/*===================RegisteredCompanyName=================*/}
                  {kycData.RegisteredCompanyName !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                      <th class="px-6 py-4 w-1/2 ">Registered Company Name </th>
                      <td class="px-6 py-4 w-1/2 text-base">
                        {kycData.RegisteredCompanyName}
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}

                  {/*===================RegisteredCompanyAddress=================*/}
                  {kycData.RegisteredCompanyAddress !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                      <th class="px-6 py-4 w-1/2 ">
                        Registered Company Address{' '}
                      </th>
                      <td class="px-6 py-4 w-1/2 text-base">
                        {kycData.RegisteredCompanyAddress}
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}

                  {/*===================State=================*/}
                  {kycData.State !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                      <th class="px-6 py-4 w-1/2 ">State </th>
                      <td class="px-6 py-4 w-1/2 text-base">{kycData.State}</td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {/*===================Phone=================*/}
                  {kycData.Phone !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                      <th class="px-6 py-4 w-1/2 ">Contact No </th>
                      <td class="px-6 py-4 w-1/2 text-base">{kycData.Phone}</td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {/*===================Email=================*/}
                  {kycData.Email !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                      <th class="px-6 py-4 w-1/2 ">Email </th>
                      <td class="px-6 py-4 w-1/2 text-base">{kycData.Email}</td>
                    </tr>
                  ) : (
                    ''
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          ' '
        )}
        {/*------------------GENERAL INFORMATION------------------*/}
        {kycData.AccountType !== '' ||
        kycData.BeneficiaryNames !== '' ||
        kycData.IFSC !== '' ||
        kycData.AccountNumber !== '' ? (
          <>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
                Bank Account Details
              </h1>
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  {/*===================AccountType=================*/}
                  {kycData.AccountType !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                      <th class="px-6 py-4 w-1/2 ">Account Type </th>
                      <td class="px-6 py-4 w-1/2 text-base">
                        {kycData.AccountType}
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {/*===================BeneficiaryNames=================*/}
                  {kycData.BeneficiaryNames !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                      <th class="px-6 py-4 w-1/2 ">Beneficiary Name</th>
                      <td class="px-6 py-4 w-1/2 text-base">
                        {kycData.BeneficiaryNames}
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}

                  {/*===================Account Number=================*/}
                  {kycData.AccountNumber !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                      <th class="px-6 py-4 w-1/2 ">Account Number</th>
                      <td class="px-6 py-4 w-1/2 text-base">
                        {kycData.AccountNumber}
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}

                  {/*===================IFSC=================*/}
                  {kycData.IFSC !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                      <th class="px-6 py-4 w-1/2 ">IFSC</th>
                      <td class="px-6 py-4 w-1/2 text-base">{kycData.IFSC}</td>
                    </tr>
                  ) : (
                    ''
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          ''
        )}

        {/*------------------Documnet------------------*/}
        {kycData.PanCard !== '' ||
        kycData.CancelledCheque !== '' ||
        kycData.SignAgreement !== '' ? (
          <>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
                Document Details
              </h1>
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  {/*===================PanCard=================*/}
                  {kycData.PanCard !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                      <th class="px-6 py-4 w-1/2 ">Pan Card </th>
                      <td class="px-6 py-4 w-1/2 text-base">
                        <a
                          href={kycData.PanCard}
                          target="_blank"
                          className="flex items-center"
                        >
                          <FaEye className="mr-2" />
                          View
                        </a>
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}

                  {/*===================RegisteredCompanyName=================*/}
                  {kycData.CancelledCheque !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                      <th class="px-6 py-4 w-1/2 ">Cancelled Cheque </th>
                      <td class="px-6 py-4 w-1/2 text-base">
                        <a
                          href={kycData.CancelledCheque}
                          target="_blank"
                          className="flex items-center"
                        >
                          <FaEye className="mr-2" />
                          View
                        </a>
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}

                  {/*===================RegisteredCompanyName=================*/}
                  {kycData.SignAgreement !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                      <th class="px-6 py-4 w-1/2 ">Agreement </th>
                      <td class="px-6 py-4 w-1/2 text-base">
                        <a
                          href={kycData.SignAgreement}
                          target="_blank"
                          className="flex items-center"
                        >
                          <FaEye className="mr-2" />
                          View
                        </a>
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          ''
        )}
        <div>
          {/*------------------Documnet------------------*/}
          <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
            Action
          </h1>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-boxdark-2 py-4">
            {kycData.Type == 'V' ? (
              <form
                className="grid grid-cols-1 lg:grid-cols-3 "
                onSubmit={formik.handleSubmit}
              >
                <div className="col-span-2">
                  <div className="flex flex-col   px-5.5 pb-3">
                    <label className="  block text-black dark:text-white">
                      KYC Status <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <div>
                        <input
                          type="radio"
                          onChange={formik.handleChange}
                          name="KYCStatus"
                          className="mx-2 ml-0"
                          value="1"
                          checked={formik.values.KYCStatus == '1'}
                        />
                        Approved
                        <input
                          type="radio"
                          onChange={formik.handleChange}
                          name="KYCStatus"
                          className="mx-2"
                          value="0"
                          checked={formik.values.KYCStatus == '0'}
                        />
                        Reject
                      </div>

                      {formik.values.KYCStatus == '0' ? (
                        <>
                          <input
                            type="text"
                            name="Reason"
                            value={formik.values.Reason}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Reason of Kyc Rejection"
                            className="w-full rounded-lg border-[1.5px] mt-2 border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </>
                      ) : (
                        <></>
                      )}
                      <p>Please select kyc status</p>
                    </div>
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
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 px-5.5">
                <button
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  onClick={handleGoBack}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorKyc;
