import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ClipLoader from 'react-spinners/BounceLoader';
import { GetAllBookedOrder } from '../../API/OrderApi';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { FaEye } from 'react-icons/fa6';
import { getAllCountry } from '../../API/StateAPI';
import { getAllBookingByCountryId } from '../../API/EventApi';

const AllBookingListing = () => {
  const [category, setcategory] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);
  const [country, setcountry] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); // Default value 'Active'

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  // =============action button===============
  const fetchData = async () => {
    try {
      const result = await getAllBookingByCountryId(statusFilter);
      setcategory(result);
      setfilterdata(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };
  const fetchCountryData = async () => {
    try {
      const result = await getAllCountry();
      setcountry(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchCountryData();
    fetchData();
  }, []);
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  useEffect(() => {
    const mySearch = category.filter(
      (item) =>
        item.EventName &&
        item.EventName.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);

  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon={<FaEye />}
          className="border border-blue-600 text-blue-600 mr-2 rounded-full py-2.5"
          onClick={() => {
            navigate(`/allbooking/view/${rowData.Id}`);
          }}
        />
      </div>
    );
  };

  return (
    <div>
      <Breadcrumb pageName="All Booking Listing" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="bg-[#7fc6e55c] p-3">
              <form className="flex items-center justify-between">
                <select
                  className="md:w-80 w-40 h-10 border form-control form-select"
                  value={statusFilter}
                  onChange={handleStatusChange}
                >
                  <option value="all">All</option>
                  {country.map((country) => (
                    <option key={country.Id} value={country.Slug}>
                      {country.Title}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="bg-blue-600 text-white h-10 px-5 border"
                  onClick={fetchData}
                >
                  View Report
                </button>
              </form>
            </div>
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              {loading ? (
                <div className="flex justify-center items-center py-60">
                  <ClipLoader color={'#c82f32'} loading={loading} size={40} />
                </div>
              ) : (
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
                    field="Id"
                    header="#"
                    sortable
                    className="border border-stroke"
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
                    header="PaymentStatus"
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
                      format(new Date(rowData.EntDt), 'MM/dd/yyyy')
                    }
                  />
                  <Column
                    header="Action"
                    className="border border-stroke"
                    body={actionTemplate}
                  />
                </DataTable>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBookingListing;
