import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { EditEvent, getEventByEventId } from '../../API/EventApi';
import FormLoader from '../../common/Loader/FormLoader';

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

  const [isFormLoading, setIsFormLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      Id: Id,
      UserId: UserId,
      Reason: '',
      Status: 0,
    },
    onSubmit: async (values, actions) => {
      setIsFormLoading(true);
      try {
        await EditEvent(values);
      } catch (error) {
        console.error('Error updating user:', error);
      } finally {
        setIsFormLoading(false); // Set loading state to false when submission ends
      }
    },
  });
  const handleGoBack = () => {
    navigate(`/vendor/event/listing/${UserId}`);
  };
  return (
    <div>
      {isFormLoading && <FormLoader loading={isFormLoading} />}
      {EventData.Status === 0 ? (
        <h1 className="bg-blue-100 text-blue-800  px-5 py-2 rounded-lg border border-black font-medium lg:mx-0 mb-2">
          Your Event is Under Review
        </h1>
      ) : EventData.Status === 1 ? (
        <h1 className="bg-green-100 text-green-800 px-5 py-2 rounded-lg border border-black font-medium lg:mx-0 mb-2">
          Your Event is Approved
        </h1>
      ) : EventData.Status === 2 ? (
        <h1 className="bg-gray-100 text-gray-800 px-5 py-2 rounded-lg border border-black  font-medium lg:mx-0 mb-2">
          Your Event is InActive
        </h1>
      ) : EventData.Status === 3 ? (
        <h1 className="bg-purple-100 text-purple-800 px-5 py-2 rounded-lg border border-black font-medium lg:mx-0 mb-2">
          Your Event is Expired/Complete
        </h1>
      ) : EventData.Status === 4 ? (
        <h1 className="bg-red-100 text-red-800 px-5 py-2 rounded-lg border border-black  font-medium lg:mx-0 mb-2">
          Your Event is Reject Reason Is : {EventData.Reason}
        </h1>
      ) : EventData.Status === 5 ? (
        <h1 className="bg-red-100 text-red-800 px-5 py-2 rounded-lg border border-black  font-medium lg:mx-0 mb-2">
          Your Event is Cancel
        </h1>
      ) : (
        <h1 className="bg-blue-100 text-blue-800  px-5 py-2 rounded-lg border border-black font-medium lg:mx-0 mb-2">
          Your Event is Under Review
        </h1>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
            Event Information
          </h1>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              {/*===================EventName=================*/}
              {EventData.EventName !== '' ? (
                <tr class="bg-white dark:bg-boxdark-2 border-b dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">Event Name:</th>
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
                  <th class="px-6 py-4 w-1/2 ">Event Slug:</th>
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
                  <th class="px-6 py-4 w-1/2 ">Event Email:</th>
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
                  <th class="px-6 py-4 w-1/2 ">Event Organizer:</th>
                  <td class="px-6 py-4 w-1/2 text-base">
                    {EventData.EventOrganizer}
                  </td>
                </tr>
              ) : (
                ''
              )}

              {/*===================EventDescription=================*/}
              {EventData.EventDescription !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">Event Description:</th>
                  <td class="px-6 py-4 w-1/2 text-base text-justify">
                    {EventData.EventDescription}
                  </td>
                </tr>
              ) : (
                ''
              )}
              {/*===================EventStartDateTime=================*/}
              {EventData.EventStartDateTime !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">Event Start Date-Time:</th>
                  <td class="px-6 py-4 w-1/2 text-base">
                    {EventData.EventStartDateTime}
                  </td>
                </tr>
              ) : (
                ''
              )}

              {/*===================CategoryTitle=================*/}
              {EventData.CategoryTitle !== '' ? (
                <tr class="bg-white border-b dark:bg-boxdark-2 dark:text-white dark:border-zinc-600">
                  <th class="px-6 py-4 w-1/2 ">Event Category:</th>
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
                  <th class="px-6 py-4 w-1/2 ">Artist Title:</th>
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
                  <th class="px-6 py-4 w-1/2 ">Age Restriction:</th>
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
                  <th class="px-6 py-4 w-1/2 ">Healthy Safety Precautions:</th>
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
          <div className="container mx-auto p-4 bg-white border grid grid-cols-1 lg:grid-cols-2">
            {EventData?.Addresses?.map((address, index) => (
              <div key={index} className="">
                <div className="border p-3 ">
                  <div className="flex items-center foldsmall:flex-col foldsmall:justify-center">
                    <p className="m-0 border border-themecolor1 py-1.5 rounded-3xl">
                      <span className="bg-themecolor1  text-white px-3.5 py-2 rounded-full mr-2">
                        {index + 1}
                      </span>
                      <span className="pr-3">Address</span>
                    </p>
                  </div>

                  <table class="w-full text-sm mt-3 text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <tbody className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                      {/*===================CityTitle=================*/}
                      {address.CityTitle !== '' ? (
                        <p class="">
                          <b>City: </b>
                          {address.CityTitle}
                        </p>
                      ) : (
                        ''
                      )}
                      {/*===================StateTitle=================*/}
                      {address.CountryTitle !== '' ? (
                        <p class="">
                          <b>Country: </b>
                          {address.CountryTitle}
                        </p>
                      ) : (
                        ''
                      )}
                      {/*===================LanguageTitle=================*/}
                      {address.LanguageTitle !== '' ? (
                        <p class="">
                          <b>Language: </b>
                          {address.LanguageTitle}
                        </p>
                      ) : (
                        ''
                      )}
                      {/*===================Duration=================*/}
                      {address.Duration !== '' ? (
                        <p class="">
                          <b>Duration: </b>
                          {address.Duration}
                        </p>
                      ) : (
                        ''
                      )}
                      {/*===================Type=================*/}
                      {address.Type !== '' ? (
                        <p class="">
                          <b>Type: </b>
                          {address.Type}
                        </p>
                      ) : (
                        ''
                      )}
                      {/*===================Location=================*/}
                      {address.Location !== '' ? (
                        <p class="">
                          <b>Location: </b>
                          {address.Location}
                        </p>
                      ) : (
                        ''
                      )}
                      {/*===================Location=================*/}
                      {address.Address !== '' ? (
                        <>
                          <p class="my-auto">
                            <b>Address: </b>
                          </p>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: address.Address ? address.Address : '',
                            }}
                            class="text-base map-container"
                          />
                        </>
                      ) : (
                        ''
                      )}
                    </tbody>
                  </table>

                  <table class="w-full text-sm mt-3 text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <h1 className="text-lg  p-2 mt-4 text-white font-bold bg-themecolor1">
                      Ticket Information
                    </h1>
                    <tbody className="grid grid-cols-1 lg:grid-cols-1 gap-5">
                      {address?.Dates?.map((ticket, subIndex) => (
                        <div className="gap-3">
                          <div className="flex items-center foldsmall:flex-col foldsmall:justify-center mt-4">
                            <p className="m-0 border border-themecolor1 py-1.5 rounded-3xl">
                              <span className="bg-themecolor1  text-white px-3.5 py-2 rounded-full mr-2">
                                {subIndex + 1}
                              </span>
                              <span className="pr-3"> {ticket.EventDate}</span>
                            </p>
                            <p className="m-0 border border-themecolor1 py-1.5 ml-1.5 rounded-3xl">
                              <span className="px-3">
                                {ticket.EventStartTime}
                              </span>
                            </p>
                            <p className="m-0 border border-themecolor1 py-1.5 ml-1.5 rounded-3xl">
                              <span className="px-3">
                                {ticket.EventEndTime}
                              </span>
                            </p>
                          </div>
                          {ticket?.Tickets?.map((ticket, subIndex) => (
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
                                <tr class="bg-white   w-full dark:bg-boxdark-2 px-2 dark:text-white dark:border-zinc-600">
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
                          ))}
                        </div>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
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
                      value="0"
                      checked={formik.values.Status == '0'}
                    />
                    Pending
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Status"
                      className="mx-2 "
                      value="1"
                      checked={formik.values.Status == '1'}
                    />
                    Approved
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Status"
                      className="mx-2 "
                      value="2"
                      checked={formik.values.Status == '2'}
                    />
                    InActive
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Status"
                      className="mx-2 "
                      value="3"
                      checked={formik.values.Status == '3'}
                    />
                    Expired
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Status"
                      className="mx-2"
                      value="4"
                      checked={formik.values.Status == '4'}
                    />
                    Reject
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Status"
                      className="mx-2"
                      value="5"
                      checked={formik.values.Status == '5'}
                    />
                    Canceled
                  </div>
                  {formik.values.Status == '4' ? (
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
