import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ClipLoader from 'react-spinners/BounceLoader';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import Breadcrumb from '../Breadcrumb';
import { CSVLink } from 'react-csv';
import { GetAllBookedOrder } from '../../API/OrderApi';
import { FaEye } from 'react-icons/fa6';

const AllBooking = () => {
  const [contact, setcontact] = useState([]);
  const [search, setsearch] = useState('');
  const [filterData, setfilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [csvData, setCsvData] = useState([]);
  const navigate = useNavigate();
  const dt = useRef(null);

  // =============action button===============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetAllBookedOrder();
        setcontact(result);
        setfilterData(result);
        setCsvData(
          result.map((item) => ({
            Id: item.Id,
            UserId: item.UserId,
            UserName: item.UserName,
            UserEmail: item.UserEmail,
            UserPhone: item.UserPhone,
            VendorId: item.VendorId,
            EventName: item.EventName,
            EventSlug: item.EventSlug,
            EventEmail: item.EventEmail,
            EventOrganizer: item.EventOrganizer,
            EventStartDateTime: item.EventStartDateTime,
            EventEndDateTime: item.EventEndDateTime,
            EventArtistId: item.EventArtistId,
            AgeRestriction: item.AgeRestriction,
            PointOfContactName: item.PointOfContactName,
            PointOfContactEmail: item.VendorId,
            PointOfContactPhone: item.PointOfContactPhone,
            HealthySafetyPrecautions: item.HealthySafetyPrecautions,
            ArtistTitle: item.ArtistTitle,
            Status: item.Status,
            City: item.City,
            State: item.State,
            Language: item.Language,
            Address: item.Address,
            Type: item.Type,
            Duration: item.Duration,
            TicketName: item.TicketName,
            gstPercentage: item.gstPercentage,
            Price: item.Price,
            Qty: item.Qty,
            SubTotal: item.SubTotal,
            gstAmount: item.gstAmount,
            Charge: item.Charge,
            Total: item.Total,
            PaymentMethod: item.PaymentMethod,
            PaymentStatus: item.PaymentStatus,
            ExpiryDateTime: item.ExpiryDateTime,
            EntDt: item.EntDt,
            ModDt: item.ModDt,
          })),
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // -----------------------filter--------------------
  useEffect(() => {
    const mySearch = contact.filter((item) =>
      item.EventName && item.EventName
        ? item.EventName.toLowerCase().includes(search.toLowerCase())
        : false,
    );
    setfilterData(mySearch);
  }, [search, contact]);

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
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark card">
              {loading ? (
                <div className="flex justify-center items-center py-60">
                  <ClipLoader color={'#c82f32'} loading={loading} size={45} />
                </div>
              ) : (
                <DataTable
                  ref={dt}
                  value={filterData}
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
                      <CSVLink
                        data={csvData}
                        headers={[
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
                          {
                            label: 'EventStartDateTime',
                            key: 'EventStartDateTime',
                          },
                          {
                            label: 'EventEndDateTime',
                            key: 'EventEndDateTime',
                          },
                          { label: 'EventArtistId', key: 'EventArtistId' },
                          { label: 'AgeRestriction', key: 'AgeRestriction' },
                          {
                            label: 'PointOfContactName',
                            key: 'PointOfContactName',
                          },
                          { label: 'PointOfContactEmail', key: 'VendorId' },
                          {
                            label: 'PointOfContactPhone',
                            key: 'PointOfContactPhone',
                          },
                          {
                            label: 'HealthySafetyPrecautions',
                            key: 'HealthySafetyPrecautions',
                          },
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
                        ]}
                        filename={'booking-data.csv'}
                        className="bg-blue-500 text-white p-3 px-10 text-sm"
                      >
                        Export
                      </CSVLink>
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
                    field="EventName"
                    header="Event Name"
                    sortable
                    className="border border-stroke"
                  />

                  <Column
                    field="PaymentMethod"
                    header="Payment Method"
                    sortable
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
                      format(new Date(rowData.EntDt), 'MM/dd/yyyy hh:mm a')
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

export default AllBooking;
