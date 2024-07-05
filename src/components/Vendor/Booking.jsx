import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/BounceLoader';
import { GetAllBookedOrderByEventId } from '../../API/OrderApi';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { FaEye } from 'react-icons/fa';
import { format } from 'date-fns';
import { Button } from 'primereact/button';

const VendorBooking = () => {
  // ================ Get data by Id============
  const { Id } = useParams();
  const [EventData, setEventData] = useState();
  const [filterdata, setfilterdata] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const fetchData = async () => {
    try {
      if (Id) {
        const UserData = await GetAllBookedOrderByEventId(Id);
        setEventData(UserData);
        setfilterdata(UserData.Orders);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };
  const [search, setsearch] = useState('');
  useEffect(() => {
    fetchData();
  }, [Id]);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/allbooking/listing');
  };

  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon={<FaEye />}
          className="border border-blue-600 text-blue-600 mr-2 rounded-full py-2.5"
          onClick={() => {
            navigate(`/vendor/event/bookings/${rowData.EventId}/${rowData.Id}`);
          }}
        />
      </div>
    );
  };
  useEffect(() => {
    const mySearch = EventData?.Orders?.filter(
      (item) =>
        item.UserName &&
        item.UserName.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);

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
                        <div className="border p-3">
                          <div className="flex items-center foldsmall:flex-col foldsmall:justify-center mb-3">
                            <p className="m-0 border border-themecolor1 py-2.5 rounded px-2">
                              <span className="bg-themecolor1  text-white px-3 py-1.5 rounded-full mr-2">
                                {index + 1}
                              </span>
                              <span className="pr-3">{val.Location}</span>
                            </p>
                          </div>
                          {val.Dates?.map((val, index) => {
                            return (
                              <div className="shadow-md">
                                <div className="bg-themecolor2 py-2 text-white mb-3 font-bold text-center">
                                  {val.EventDate} - ({val.EventStartTime} -{' '}
                                  {val.EventEndTime})
                                </div>

                                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 my-2">
                                  {val.Tickets.map((val, index) => {
                                    return (
                                      <div key={index}>
                                        <div className="shadow-md">
                                          <div className="bg-themecolor1 py-2 text-white font-bold text-center">
                                            {val.TicketName}
                                          </div>
                                          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
                                            <tbody>
                                              <tr className="border-b">
                                                <th class="px-6 py-2">
                                                  Ticket Amount:
                                                </th>
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
                                                <td class="px-6 py-2">
                                                  {val.TotalQty}
                                                </td>
                                              </tr>
                                              <tr className="border-b">
                                                <th class="px-6 py-2">
                                                  Available:
                                                </th>
                                                <td class="px-6 py-2">
                                                  {val.TotalAvailable}
                                                </td>
                                              </tr>
                                              <tr className="border-b">
                                                <th class="px-6 py-2">
                                                  Ticket Count:
                                                </th>
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
                                      </div>
                                    );
                                  })}
                                </div>
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
                <DataTable
                  value={filterdata}
                  tableStyle={{
                    minWidth: '50rem',
                    border: '1px solid #e0e0e0',
                  }}
                  paginator
                  rows={10}
                  rowsPerPageOptions={[5, 10, 25]}
                  emptyMessage="No Data found"
                  globalFilter={search}
                  header={
                    <div className="flex justify-between pb-5 p-ai-center">
                      <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                          type="text"
                          className="text-start me-auto text-sm border-2 py-2 mt-2 pl-2 md:pr-20 pr-5"
                          onInput={(e) => setsearch(e.target.value)}
                          placeholder="Search"
                        />
                      </span>
                    </div>
                  }
                >
                  <Column
                    header="#"
                    className="border border-stroke"
                    body={(rowData, { rowIndex }) => rowIndex + 1}
                  />
                  <Column
                    field="UserName"
                    header="User Name"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="UserEmail"
                    header="User Email"
                    className="border border-stroke"
                  />
                  <Column
                    field="UserPhone"
                    header="User Phone"
                    className="border border-stroke"
                  />
                  <Column
                    field="EventName"
                    header="Event Name"
                    className="border border-stroke"
                  />
                  <Column
                    field="Country"
                    header="Country"
                    className="border border-stroke"
                  />
                  <Column
                    field="City"
                    header="City"
                    className="border border-stroke"
                  />
                  <Column
                    field="TicketName"
                    header="Ticket Name"
                    className="border border-stroke"
                  />
                  <Column
                    field="Price"
                    header="Price"
                    className="border border-stroke"
                  />
                  <Column
                    field="Qty"
                    header="Ticket Qty"
                    className="border border-stroke"
                  />
                  <Column
                    field="Charge"
                    header="Ticket Charge"
                    className="border border-stroke"
                  />
                  <Column
                    field="Total"
                    header="Total"
                    className="border border-stroke"
                  />
                  <Column
                    field="PaymentMethod"
                    header="Payment Method"
                    className="border border-stroke"
                  />
                  <Column
                    field="PaymentStatus"
                    header="Payment Status"
                    className="border border-stroke"
                    body={(rowData) => (
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          rowData.PaymentStatus === 1
                            ? 'bg-green-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {rowData.PaymentStatus === 1 ? 'Success' : 'Failed'}
                      </span>
                    )}
                  />
                  <Column
                    field="EntDt"
                    header="Entry Date"
                    className="border border-stroke"
                    body={(rowData) =>
                      format(new Date(rowData.EntDt), 'dd/MM/yyyy')
                    }
                  />
                  <Column
                    header="Action"
                    className="border border-stroke"
                    body={actionTemplate}
                  />
                </DataTable>
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
