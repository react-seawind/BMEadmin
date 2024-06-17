import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/BounceLoader';
import { GetAllBookedOrderByEventId } from '../../API/OrderApi';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb';

const VendorBooking = () => {
  // ================ Get data by Id============
  const { Id } = useParams();
  const [EventData, setEventData] = useState();
  const [loading, setLoading] = useState(true); // Loading state
  const fetchData = async () => {
    try {
      if (Id) {
        const UserData = await GetAllBookedOrderByEventId(Id);
        setEventData(UserData);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };
  useEffect(() => {
    fetchData();
  }, [Id]);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/allbooking/listing');
  };
  console.log(Id);
  return (
    <div>
      <Breadcrumb pageName={EventData?.EventName} />
      <div className="container bg-white dark:bg-boxdark-2  mx-auto py-5 dark:border-white dark:border">
        <div className="text-center text-2xl border-b border-black dark:border-white pb-2">
          Booking Detail - {EventData?.EventName}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-60">
            <ClipLoader color={'#c82f32'} loading={loading} size={40} />
          </div>
        ) : (
          <>
            {EventData?.Addresses !== null ? (
              <div className="mt-2 mx-3">
                <div className="w-full ">
                  <h1 className="text-lg text-center p-2 mt-4 text-white font-bold bg-themecolor1">
                    Address Information
                  </h1>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {EventData?.Addresses?.map((val, index) => (
                      <div
                        key={index}
                        className="container mx-auto  p-4 bg-white dark:bg-boxdark-2 border"
                      >
                        <div className="flex items-center foldsmall:flex-col foldsmall:justify-center">
                          <p className="m-0 border border-themecolor1 py-2.5 rounded px-2">
                            <span className="bg-themecolor1  text-white px-3 py-1.5 rounded-full mr-2">
                              {index + 1}
                            </span>
                            <span className="pr-3">{val.Address}</span>
                          </p>
                        </div>
                        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 mt-2">
                          {val.Tickets.map((val, index) => {
                            return (
                              <div className="shadow-md">
                                <div className="bg-themecolor1 py-2 text-white font-bold text-center">
                                  {val.TicketName}
                                </div>
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
                                  <tbody>
                                    <tr className="border-b">
                                      <th class="px-6 py-2">Ticket Amount:</th>
                                      <td class="px-6 py-2">
                                        {val.TicketAmount}
                                      </td>
                                    </tr>
                                    <tr className="border-b">
                                      <th class="px-6 py-2">
                                        Ticket Quantity:
                                      </th>
                                      <td class="px-6 py-2">
                                        {val.TicketQuantity}
                                      </td>
                                    </tr>
                                    <tr className="border-b">
                                      <th class="px-6 py-2">
                                        Booked Quantity:
                                      </th>
                                      <td class="px-6 py-2">{val.TotalQty}</td>
                                    </tr>
                                    <tr className="border-b">
                                      <th class="px-6 py-2">Available:</th>
                                      <td class="px-6 py-2">
                                        {val.TotalAvailable}
                                      </td>
                                    </tr>
                                    <tr className="border-b">
                                      <th class="px-6 py-2">Ticket Count:</th>
                                      <td class="px-6 py-2">
                                        {val.TicketCount}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <p className="text-center font-bold border py-3 border-black">
                                  Ticket Earning : ₹{val.Total}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mx-3 my-3 py-16 bg-slate-300 font-bold text-2xl text-bodydark2 text-center">
                No Address Found
              </div>
            )}

            <div className="w-full ">
              <h1 className="text-lg text-center p-2 mt-4 text-white font-bold mx-3 bg-themecolor1">
                Booking Information
              </h1>
            </div>
            <div class="relative overflow-x-auto shadow-lg  mx-3">
              {EventData?.Orders && EventData.Orders.length > 0 ? (
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="border-b">
                      <th scope="col" class="px-6 py-3">
                        No
                      </th>
                      <th scope="col" class="px-6 py-3">
                        User Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        User Email
                      </th>
                      <th scope="col" class="px-6 py-3">
                        User Phone
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Ticket Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Ticket Price
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Ticket Qty
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Ticket Total
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Ticket PaymentMethod
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Ticket PaymentStatus
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {EventData?.Orders?.map((val, index) => {
                      return (
                        <tr className="border-b">
                          <td class="px-6 py-4"> {index + 1}</td>
                          <td class="px-6 py-4"> {val.UserName}</td>
                          <td class="px-6 py-4"> {val.UserEmail}</td>
                          <td class="px-6 py-4"> {val.UserPhone}</td>
                          <td class="px-6 py-4"> {val.TicketName}</td>
                          <td class="px-6 py-4"> {val.Price}</td>
                          <td class="px-6 py-4"> {val.Qty}</td>
                          <td class="px-6 py-4"> {val.Total}</td>
                          <td class="px-6 py-4"> {val.PaymentMethod}</td>
                          <td class="px-6 py-4"> {val.PaymentStatus}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="mx-3 my-3 py-16 bg-slate-300 font-bold text-2xl text-bodydark2 text-center">
                  No Booking Found
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VendorBooking;
