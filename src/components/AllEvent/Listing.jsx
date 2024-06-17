import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';
import { getServicedata } from '../API';
import { GetAllEvent } from '../../API/EventApi';
import { format } from 'date-fns';
import ClipLoader from 'react-spinners/BounceLoader';
const AllEventListing = () => {
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
        const result = await GetAllEvent();
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
      name: 'Image',
      selector: (row) => (
        <>
          {row.Image !== '' ? (
            <img
              className="p-2 overflow-hidden h-40 rounded-md w-30 border my-2 border-slate-200 bg-white "
              src={row.Thumb}
            />
          ) : (
            <p className="p-2 overflow-hidden h-30 rounded-md w-30 border my-2 border-slate-200 bg-white text-xl text-center">
              Image <br></br> Not <br></br> Uploaded
            </p>
          )}
        </>
      ),
    },
    {
      name: 'Entry Date',
      selector: (row) => (
        <h1 className="text-base">
          {format(new Date(row.EntDt), 'MM/dd/yyyy hh:mm a')}
        </h1>
      ),
    },
    {
      name: 'Status',
      selector: (row) => {
        const statusText = row.Status == '1' ? 'Active' : 'Inactive';
        const statusColor =
          row.Status == '1'
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
  ];

  useEffect(() => {
    const mySearch = service.filter(
      (item) =>
        item.Title && item.Title.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);

  return (
    <div>
      <Breadcrumb pageName="All Event Listing" />
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
                  className="text-2xl"
                  columns={columns}
                  data={filterdata}
                  pagination
                  highlightOnHover
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

export default AllEventListing;
