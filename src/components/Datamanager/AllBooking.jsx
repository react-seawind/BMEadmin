import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';
import { GetAllBookedOrder } from '../../API/OrderApi';
import { CSVLink } from 'react-csv';
import ClipLoader from 'react-spinners/BounceLoader';

const AllBooking = () => {
  const [service, setservice] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);

  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  // =============action button===============
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetAllBookedOrder();
        setservice(result);
        setfilterdata(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: '#',
      selector: 'Id',
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: 'EventName',
      selector: (row) => <h1 className="text-base">{row.EventName}</h1>,
    },
    {
      name: 'TypeOfEvent',
      selector: (row) => <h1 className="text-base">{row.TypeOfEvent}</h1>,
    },
    {
      name: 'PaymentMethod',
      selector: (row) => <h1 className="text-base">{row.PaymentMethod}</h1>,
    },

    {
      name: 'PaymentStatus',
      selector: (row) => {
        const statusText = row.PaymentStatus == '1' ? 'Success' : 'Failed';
        const statusColor =
          row.PaymentStatus == '1'
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white';

        return (
          <span
            className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full  ${statusColor}`}
          >
            {statusText}
          </span>
        );
      },
    },
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <button
            onClick={() => {
              Navigate(`/allbooking/view/${row.Id}`);
            }}
            className="bg-red-600 text-white px-4 py-1"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const mySearch = service.filter(
      (item) =>
        item.EventName &&
        item.EventName.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);
  const csvHeaders = [
    { label: 'Id', key: 'Id' },
    { label: 'UserId', key: 'UserId' },
    { label: 'UserName', key: 'UserName' },
    { label: 'UserEmail', key: 'UserEmail' },
    { label: 'UserPhone', key: 'UserPhone' },
    { label: 'VendorId', key: 'VendorId' },
    { label: 'EventName', key: 'EventName' },
    { label: 'EventSlug', key: 'EventSlug' },
    { label: 'EventEmail', key: 'EventEmail' },
    { label: 'EventOrganizer', key: 'EventOrganizer' },
    { label: 'TypeOfEvent', key: 'TypeOfEvent' },
    { label: 'EventStartDateTime', key: 'EventStartDateTime' },
    { label: 'EventEndDateTime', key: 'EventEndDateTime' },
    { label: 'EventArtistId', key: 'EventArtistId' },
    { label: 'AgeRestriction', key: 'AgeRestriction' },
    { label: 'PointOfContactName', key: 'PointOfContactName' },
    { label: 'PointOfContactEmail', key: 'VendorId' },
    { label: 'PointOfContactPhone', key: 'PointOfContactPhone' },
    { label: 'HealthySafetyPrecautions', key: 'HealthySafetyPrecautions' },
    { label: 'ArtistTitle', key: 'ArtistTitle' },
    { label: 'Status', key: 'Status' },
    { label: 'City', key: 'City' },
    { label: 'State', key: 'State' },
    { label: 'Language', key: 'Language' },
    { label: 'Address', key: 'Address' },
    { label: 'Type', key: 'Type' },
    { label: 'Duration', key: 'Duration' },
    { label: 'TicketName', key: 'TicketName' },
    { label: 'gstPercentage', key: 'gstPercentage' },
    { label: 'Price', key: 'Price' },
    { label: 'Qty', key: 'Qty' },
    { label: 'SubTotal', key: 'SubTotal' },
    { label: 'gstAmount', key: 'gstAmount' },
    { label: 'Charge', key: 'Charge' },
    { label: 'Total', key: 'Total' },
    { label: 'PaymentMethod', key: 'PaymentMethod' },
    { label: 'PaymentStatus', key: 'PaymentStatus' },
    { label: 'ExpiryDateTime', key: 'ExpiryDateTime' },
    { label: 'EntDt', key: 'EntDt' },
    { label: 'ModDt', key: 'ModDt' },
  ];
  return (
    <div>
      <Breadcrumb pageName="All Booking Listing" />
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              {loading ? (
                <div className="flex justify-center items-center py-60">
                  <ClipLoader color={'#c82f32'} loading={loading} size={40} />
                </div>
              ) : (
                <DataTable
                  className="text-2x"
                  columns={columns}
                  data={filterdata}
                  pagination
                  highlightOnHover
                  actions={
                    <CSVLink
                      data={filterdata}
                      headers={csvHeaders}
                      filename={'booking_data_data.csv'}
                      className="bg-blue-500 text-white px-5 py-3"
                    >
                      Export CSV
                    </CSVLink>
                  }
                  subHeader
                  subHeaderComponent={
                    <input
                      type="text"
                      placeholder="search"
                      className="text-start me-auto border-2 py-3 px-5"
                      value={search}
                      onChange={(e) => {
                        setsearch(e.target.value);
                      }}
                    />
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooking;
