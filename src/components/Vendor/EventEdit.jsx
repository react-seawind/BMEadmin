import React, { useEffect, useState } from 'react';
import { FaDownload, FaEye } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUserById } from '../../API/UserApi';
import { useFormik } from 'formik';
import { EditEvent, getEventByEventId } from '../../API/EventApi';

const VendorEvents = () => {
  const navigate = useNavigate();

  // ================ Get data by Id============
  const { Id } = useParams();
  const { UserId } = useParams();
  const [EventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Id) {
          const UserData = await getEventByEventId(UserId, Id);
          setEventData(UserData);
          formik.setValues(UserData);
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
      UserId: UserId,
      Reason: '',
      Status: 0,
    },
    onSubmit: async (values, actions) => {
      try {
        await EditEvent(values);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
  });
  const handleGoBack = () => {
    navigate(`/vendor/event/listing/${UserId}`);
  };
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
            Event Information
          </h1>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              {/*===================EventName=================*/}
              {EventData.EventName !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">EventName:</th>
                  <td class="px-6 py-4 w-1/2 text-base">
                    {EventData.EventName}
                  </td>
                </tr>
              ) : (
                ''
              )}

              {/*===================EventSlug=================*/}
              {EventData.EventSlug !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">EventSlug:</th>
                  <td class="px-6 py-4 w-1/2 text-base">
                    {EventData.EventSlug}
                  </td>
                </tr>
              ) : (
                ''
              )}

              {/*===================EventEmail=================*/}
              {EventData.EventEmail !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">EventEmail:</th>
                  <td class="px-6 py-4 w-1/2 text-base">
                    {EventData.EventEmail}
                  </td>
                </tr>
              ) : (
                ''
              )}
              {/*===================EventOrganizer=================*/}
              {EventData.EventOrganizer !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">EventOrganizer:</th>
                  <td class="px-6 py-4 w-1/2 text-base">
                    {EventData.EventOrganizer}
                  </td>
                </tr>
              ) : (
                ''
              )}
              {/*===================TypeOfEvent=================*/}
              {EventData.TypeOfEvent !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">TypeOfEvent:</th>
                  <td class="px-6 py-4 w-1/2 text-base">
                    {EventData.TypeOfEvent}
                  </td>
                </tr>
              ) : (
                ''
              )}
              {/*===================EventDescription=================*/}
              {EventData.EventDescription !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">EventDescription:</th>
                  <td class="px-6 py-4 w-1/2 text-base">
                    {EventData.EventDescription}
                  </td>
                </tr>
              ) : (
                ''
              )}
              {/*===================EventStartDateTime=================*/}
              {EventData.EventStartDateTime !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">EventStartDateTime:</th>
                  <td class="px-6 py-4 w-1/2 text-base">
                    {EventData.EventStartDateTime}
                  </td>
                </tr>
              ) : (
                ''
              )}
              {/*===================EventEndDateTime=================*/}
              {EventData.EventEndDateTime !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">EventEndDateTime:</th>
                  <td class="px-6 py-4 w-1/2 text-base">
                    {EventData.EventEndDateTime}
                  </td>
                </tr>
              ) : (
                ''
              )}
              {/*===================CategoryTitle=================*/}
              {EventData.CategoryTitle !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">EventCategory:</th>
                  <td class="px-6 py-4 w-1/2 text-base">
                    {EventData.CategoryTitle}
                  </td>
                </tr>
              ) : (
                ''
              )}
              {/*===================ArtistTitle=================*/}
              {EventData.ArtistTitle !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">ArtistTitle:</th>
                  <td class="px-6 py-4 w-1/2 text-base">
                    {EventData.ArtistTitle}
                  </td>
                </tr>
              ) : (
                ''
              )}
              {/*===================AgeRestriction=================*/}
              {EventData.AgeRestriction !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">AgeRestriction:</th>
                  <td class="px-6 py-4 w-1/2 text-base">
                    {EventData.AgeRestriction}
                  </td>
                </tr>
              ) : (
                ''
              )}
              {/*===================HealthySafetyPrecautions=================*/}
              {EventData.HealthySafetyPrecautions !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">HealthySafetyPrecautions:</th>
                  <td class="px-6 py-4 w-1/2 text-base">
                    {EventData.HealthySafetyPrecautions}
                  </td>
                </tr>
              ) : (
                ''
              )}
            </tbody>
          </table>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
            Event Image
          </h1>
          <div class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {/*===================Banner=================*/}
            {EventData.Banner !== '' ? (
              <div class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                <th class="px-6 py-2 ">Banner:</th>
                <img
                  src={EventData.Banner}
                  className="px-3 pb-2 w-full h-80"
                  alt=""
                />
              </div>
            ) : (
              ''
            )}

            {/*===================Thumb=================*/}
            {EventData.Thumb !== '' ? (
              <div class="bg-white dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                <th class="px-6 py-2 ">Thumb:</th>
                <img
                  src={EventData.Thumb}
                  className="px-3 pb-2 w-auto mx-auto h-73"
                  alt=""
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
            Address Information
          </h1>
          {EventData.Addresses?.map((address, index) => (
            <div key={index} className="container mx-auto  p-4 bg-white">
              <div className="flex items-center foldsmall:flex-col foldsmall:justify-center">
                <p className="m-0 border border-themecolor1 py-1.5 rounded-3xl">
                  <span className="bg-themecolor1  text-white px-3.5 py-2 rounded-full mr-2">
                    {index + 1}
                  </span>
                  <span className="pr-3">Address {index + 1}</span>
                </p>
              </div>

              <table class="w-full text-sm mt-3 text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <tbody className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/*===================CityTitle=================*/}
                  {address.CityTitle !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 px-2 dark:text-white dark:border-zinc-600">
                      <th class="py-3 w-1/2 ">CityTitle:</th>
                      <td class="py-3 w-1/2 text-base text-end">
                        {address.CityTitle}
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {/*===================StateTitle=================*/}
                  {address.StateTitle !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 px-2 dark:text-white dark:border-zinc-600">
                      <th class="py-3 w-1/2 ">StateTitle:</th>
                      <td class="py-3 w-1/2 text-base text-end">
                        {address.StateTitle}
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {/*===================LanguageTitle=================*/}
                  {address.LanguageTitle !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 px-2 dark:text-white dark:border-zinc-600">
                      <th class="py-3 w-1/2 ">LanguageTitle:</th>
                      <td class="py-3 w-1/2 text-base text-end">
                        {address.LanguageTitle}
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {/*===================Duration=================*/}
                  {address.Duration !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 px-2 dark:text-white dark:border-zinc-600">
                      <th class="py-3 w-1/2 ">Duration:</th>
                      <td class="py-3 w-1/2 text-base text-end">
                        {address.Duration}
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {/*===================Type=================*/}
                  {address.Type !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 px-2 dark:text-white dark:border-zinc-600">
                      <th class="py-3 w-1/2 ">Type:</th>
                      <td class="py-3 w-1/2 text-base text-end">
                        {address.Type}
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {/*===================Location=================*/}
                  {address.Location !== '' ? (
                    <tr class="bg-white border-b dark:bg-boxdark-2 px-2 dark:text-white dark:border-zinc-600">
                      <th class="py-3 w-1/2 ">Location:</th>
                      <td
                        class="py-3 w-1/2 text-base text-end"
                        dangerouslySetInnerHTML={{
                          __html: address.Location ? address.Location : '',
                        }}
                      />
                    </tr>
                  ) : (
                    ''
                  )}
                </tbody>
              </table>
              <table class="w-full text-sm mt-3 text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
                  Ticket Information
                </h1>
                <tbody className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {address.Tickets.map((ticket, subIndex) => (
                    <div className="gap-3">
                      <div className="w-full border dark:border-zinc-600 p-2 my-6 mb-0 relative">
                        {ticket.TicketName !== '' ? (
                          <tr class="bg-white border-b w-full dark:bg-boxdark-2 px-2 dark:text-white dark:border-zinc-600">
                            <th class="py-3 w-full ">Ticket Name:</th>
                            <td class="py-3 w-full text-base  ">
                              {ticket.TicketName}
                            </td>
                          </tr>
                        ) : (
                          ''
                        )}

                        {ticket.TicketAmount !== '' ? (
                          <tr class="bg-white border-b w-full dark:bg-boxdark-2 px-2 dark:text-white dark:border-zinc-600">
                            <th class="py-3 w-full ">Ticket Amount:</th>
                            <td class="py-3 w-full text-base  ">
                              {ticket.TicketAmount}
                            </td>
                          </tr>
                        ) : (
                          ''
                        )}

                        {ticket.TicketQuantity !== '' ? (
                          <tr class="bg-white border-b w-full dark:bg-boxdark-2 px-2 dark:text-white dark:border-zinc-600">
                            <th class="py-3 w-full ">Ticket Quantity:</th>
                            <td class="py-3 w-full text-base  ">
                              {ticket.TicketQuantity}
                            </td>
                          </tr>
                        ) : (
                          ''
                        )}

                        <h1 className="absolute bg-themecolor2 text-white px-2 -top-3">
                          {subIndex + 1}
                        </h1>
                      </div>
                    </div>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
      <div>
        {/*------------------Documnet------------------*/}
        <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
          Action
        </h1>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-boxdark-2 py-4">
          <form className="grid grid-cols-1 " onSubmit={formik.handleSubmit}>
            <div className="col-span-2">
              <div className="flex flex-col px-5.5 pb-3">
                <label className="  block text-black dark:text-white">
                  Event Status <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <div>
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Status"
                      className="mx-2 ml-0"
                      value="1"
                      checked={formik.values.Status == '1'}
                    />
                    Approved
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Status"
                      className="mx-2"
                      value="0"
                      checked={formik.values.Status == '0'}
                    />
                    Reject
                  </div>

                  {formik.values.Status == '0' ? (
                    <>
                      <input
                        type="text"
                        name="Reason"
                        value={formik.values.Reason}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Reason of Event Rejection"
                        className="w-full rounded-lg border-[1.5px] mt-2 border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  <p className="pt-2">Please select event status</p>
                </div>
              </div>
              <div className="flex px-5.5 items-center  gap-5.5 py-3.5   col-span-1">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorEvents;
