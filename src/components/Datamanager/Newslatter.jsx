import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';
import { getServicedata } from '../API';
import { CSVLink } from 'react-csv';
import ClipLoader from 'react-spinners/BounceLoader';
import 'jspdf-autotable';
import { deleteNewsletter, getAllNewsletter } from '../../API/DataManagerApi';
import { format } from 'date-fns';

const NewslatterListing = () => {
  const [contact, setcontact] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);

  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  // =============action button===============
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllNewsletter();
        setcontact(result);
        setfilterdata(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  // -------------------delete contact------------------
  const handleDelete = async (row) => {
    try {
      await deleteNewsletter(row.Id);
      setcontact((prevCategory) =>
        prevCategory.filter((item) => item.Id !== row.Id),
      );
      setfilterdata((prevFilterData) =>
        prevFilterData.filter((item) => item.Id !== row.Id),
      );
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  useEffect(() => {
    const mySearch = contact.filter(
      (item) =>
        item.Title && item.Title.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);
  const columns = [
    {
      name: '#',
      selector: (row) => <h1 className="text-base min-h-29 mt-2">{row.Id}</h1>,
    },
    {
      name: 'Email',
      selector: (row) => (
        <h1 className="text-base min-h-29 mt-2">{row.Email}</h1>
      ),
    },

    {
      name: 'Entry Date',
      selector: (row) => (
        <h1 className="text-base min-h-29 mt-2">
          {format(new Date(row.EntDt), 'MM/dd/yyyy hh:mm a')}
        </h1>
      ),
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="min-h-29 mt-2">
          <div className="">
            <button
              className="bg-red-600 text-white p-3 justify-center w-26 flex relative"
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete ${row.Email}?`,
                  )
                ) {
                  handleDelete(row);
                }
                setSelectedRow(null);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
    },
  ];

  const csvHeaders = [
    { label: 'Id', key: 'Id' },
    { label: 'Email', key: 'Email' },
    { label: 'EntDt', key: 'EntDt' },
  ];
  return (
    <div>
      <Breadcrumb pageName="Newsletter Listing" />
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
                  actions={
                    <div>
                      <CSVLink
                        data={filterdata}
                        headers={csvHeaders}
                        filename={'newslatter_data.csv'}
                        className="bg-blue-500 text-white px-5 py-3"
                      >
                        Export CSV
                      </CSVLink>
                    </div>
                  }
                  subHeader
                  subHeaderComponent={
                    <input
                      type="text"
                      placeholder="search"
                      className="text-start me-auto -mt-25  border-2 py-3 px-2 md:px-5"
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

export default NewslatterListing;
