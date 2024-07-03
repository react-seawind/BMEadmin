import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { GetAllBookedOrderById } from '../../API/OrderApi';
import ClipLoader from 'react-spinners/BounceLoader';
import { format } from 'date-fns';

const OrderBookingViewUser = () => {
  // ================ Get data by Id============
  const { OrderId } = useParams();
  const { Id } = useParams();
  console.log(OrderId, Id);
  const navigate = useNavigate();
  const [EventData, setEventData] = useState();
  const [loading, setLoading] = useState(true); // Loading state
  const fetchData = async () => {
    try {
      if (Id) {
        const UserData = await GetAllBookedOrderById(OrderId);
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
  const handleGoBack = () => {
    navigate(`/user/booking/${Id}`);
  };
  const statusText = EventData?.PaymentStatus == '1' ? 'Success' : 'Failed';
  const statusColor =
    EventData?.PaymentStatus == '1'
      ? 'bg-green-600 text-white py-1 px-2 text-sm'
      : 'bg-red-600 text-white';

  return (
    <div>
      <div>
        <Breadcrumb pageName={EventData?.EventName} />

        <div className="grid grid-cols-1 gap-9 ">
          <div className="flex flex-col gap-9">
            {/* <!-- Input Fields --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
              {loading ? (
                <div className="flex justify-center items-center py-60">
                  <ClipLoader color={'#c82f32'} loading={loading} size={40} />
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 p-3.5 ">
                    {/*== =========Name===========*/}
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>User Name:</b> {EventData?.UserName}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>User Email:</b> {EventData?.UserEmail}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>User Phone:</b> {EventData?.UserPhone}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>EventName:</b> {EventData?.EventName}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>EventEmail:</b> {EventData?.EventEmail}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>EventOrganizer:</b> {EventData?.EventOrganizer}
                      </label>

                      <label className="mb-3 block text-black dark:text-white">
                        <b>EventStartDateTime:</b>
                        {format(
                          new Date(EventData?.EventStartDateTime),
                          'dd/MM/yyyy',
                        )}
                      </label>

                      <label className="mb-3 block text-black dark:text-white">
                        <b>AgeRestriction:</b> {EventData?.AgeRestriction}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>HealthySafetyPrecautions:</b>{' '}
                        {EventData?.HealthySafetyPrecautions}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>City:</b> {EventData?.City}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>Country:</b> {EventData?.Country}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>Language:</b> {EventData?.Language}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>Location:</b> {EventData?.Location}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>Event Start Time:</b> {EventData?.EventStartTime}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>Event End Time:</b> {EventData?.EventEndTime}
                      </label>
                    </div>
                    <div className="relative">
                      <div className="absolute right-0 text-center">
                        <b>Ticket QR</b>
                        <img src={EventData?.QRCODE} className="w-40" alt="" />
                      </div>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>Type:</b> {EventData?.Type}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>Duration:</b> {EventData?.Duration}
                      </label>

                      <label className="mb-3 block text-black dark:text-white">
                        <b>TicketName:</b> {EventData?.TicketName}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>gstPercentage:</b> {EventData?.gstPercentage}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>Price:</b> {EventData?.Price}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>Qty:</b> {EventData?.Qty}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>SubTotal:</b> {EventData?.SubTotal}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>gstAmount:</b> {EventData?.gstAmount}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>Charge:</b> {EventData?.Charge}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>Coupon Code:</b> {EventData?.CouponCode}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>Coupon Amount:</b> {EventData?.CouponAmount}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>Total:</b> {EventData?.Total}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>PaymentMethod:</b> {EventData?.PaymentMethod}
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>PaymentStatus:</b>{' '}
                        <span className={statusColor}>{statusText}</span>
                      </label>
                      <label className="mb-3 block text-black dark:text-white">
                        <b>Expiry Date Time:</b>{' '}
                        {format(
                          new Date(EventData?.ExpiryDateTime),
                          'dd/MM/yyyy',
                        )}
                      </label>
                    </div>
                  </div>
                  <div class="relative overflow-x-auto shadow-md   bg-white dark:bg-boxdark-2 py-2 pt-1 border-t">
                    <div className="col-span-2">
                      <div className="flex px-5.5 items-center  gap-5.5 py-3.5   col-span-1">
                        <button
                          className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                          onClick={handleGoBack}
                          type="button"
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBookingViewUser;
