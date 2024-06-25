import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { GetAllBookedOrderById } from '../../API/OrderApi';
import ClipLoader from 'react-spinners/BounceLoader';

const AllBookingView = () => {
  // ================ Get data by Id============
  const { Id } = useParams();
  const navigate = useNavigate();
  const [EventData, setEventData] = useState();
  const [loading, setLoading] = useState(true); // Loading state
  const fetchData = async () => {
    try {
      if (Id) {
        const UserData = await GetAllBookedOrderById(Id);
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
    navigate(`/allbooking/listing`);
  };
  const statusText = EventData?.PaymentStatus == '1' ? 'Success' : 'Failed';
  const statusColor =
    EventData?.PaymentStatus == '1'
      ? 'bg-green-600 text-white'
      : 'bg-red-600 text-white';

  return (
    <div>
      <div>
        <Breadcrumb pageName={EventData?.EventName} />

        <div className="grid grid-cols-1 gap-9 ">
          <div className="flex flex-col gap-9">
            {/* <!-- Input Fields --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex items-center">
                <h3 className="font-medium text-black dark:text-white">
                  {EventData?.EventName}
                </h3>
              </div>
              {loading ? (
                <div className="flex justify-center items-center py-60">
                  <ClipLoader color={'#c82f32'} loading={loading} size={40} />
                </div>
              ) : (
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5.5 p-3.5">
                    {/*== =========Name===========*/}
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        User Name
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.UserName}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        User Email
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.UserEmail}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        User Phone
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.UserPhone}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Event Name
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.EventName}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Event Email
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.EventEmail}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Event Organizer
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.EventOrganizer}
                      </div>
                    </div>

                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Ticket Name
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.TicketName}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        GST Percentage
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.gstPercentage}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Price
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.Price}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Ticket Qty
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.Qty}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Ticket SubTotal
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.SubTotal}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        GST Amount
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.gstAmount}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Charge
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.Charge}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Total
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.Total}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Payment Method
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.PaymentMethod}
                      </div>
                    </div>

                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Event Duration
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.Duration}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Event City
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.City}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Event Country
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.Country}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Event Language
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.Language}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Event Address
                      </label>
                      <div className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        {EventData?.Address}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Payment Status
                      </label>
                      <div
                        className={`text-center py-2 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${statusColor}`}
                      >
                        {statusText}
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBookingView;
