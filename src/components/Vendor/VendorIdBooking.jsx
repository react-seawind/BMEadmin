import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../Breadcrumb';
import ClipLoader from 'react-spinners/BounceLoader';
import { useNavigate, useParams } from 'react-router-dom';
import { GetAllBookedOrderByVendorId } from '../../API/OrderApi';

const VendorIdBooking = () => {
  const [service, setservice] = useState([]);
  const [search, setsearch] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [filterdata, setfilterdata] = useState([]);

  const Navigate = useNavigate();

  const { Id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetAllBookedOrderByVendorId(Id);
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
  }, [search, service]);

  const handleGoBack = () => {
    Navigate('/vendor/listing');
  };
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
                <>
                  {filterdata.length === 0 ? (
                    <div className="mx-3 my-3 py-16 bg-slate-300 font-bold text-2xl text-bodydark2 text-center">
                      No Booking Found
                    </div>
                  ) : (
                    <DataTable
                      className="text-2xl"
                      columns={columns}
                      data={filterdata}
                      pagination
                      highlightOnHover
                      subHeader
                      actions={
                        <div
                          onClick={handleGoBack}
                          type="button"
                          className="bg-blue-500 cursor-pointer text-white p-3 px-10 text-sm"
                        >
                          Back
                        </div>
                      }
                      subHeaderComponent={
                        <input
                          type="text"
                          placeholder="search"
                          className="text-start me-auto -mt-25 border-2 py-3 px-5"
                          value={search}
                          onChange={(e) => {
                            setsearch(e.target.value);
                          }}
                        />
                      }
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorIdBooking;
