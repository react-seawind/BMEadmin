import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';
import { format } from 'date-fns';
import { deleteOffer, getAllOffer } from '../../API/OfferApi';
import ClipLoader from 'react-spinners/BounceLoader';
const OfferListing = () => {
  const [Offer, setOffer] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const Navigate = useNavigate();

  // =============action button===============
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllOffer();
        setOffer(result);
        setfilterdata(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  // -------------------delete Offer------------------
  const handleDelete = async (row) => {
    try {
      await deleteOffer(row.Id);
      setOffer((prevCategory) =>
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
    const mySearch = Offer.filter(
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
      name: 'Title',
      selector: (row) => (
        <h1 className="text-base min-h-29 mt-2">{row.Title}</h1>
      ),
    },
    {
      name: 'Status ',
      selector: (row) => {
        const statusText = row.Status == '1' ? 'Active' : 'Inactive';
        const statusColor =
          row.Status == '1'
            ? 'bg-green-600 text-white '
            : 'bg-red-600 text-white';

        return (
          <h1 className="min-h-29 mt-2">
            <span
              className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full   ${statusColor}`}
            >
              {statusText}
            </span>
          </h1>
        );
      },
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
          <div className="bg-red-600 text-white p-3 pl-5 w-26 flex relative">
            <button>Actions</button>
            <button
              onClick={() => {
                setSelectedRow((prevRow) => (prevRow === row ? null : row));
              }}
            >
              <FaChevronDown className=" my-auto ml-4 " />
            </button>
          </div>

          {selectedRow && selectedRow.Id === row.Id && (
            <div className="action-buttons  absolute z-99">
              <button
                className="text-black bg-white border  p-2 w-26"
                onClick={() => {
                  setSelectedRow(null);
                  Navigate(`/offer/edit/${row.Id}`);
                }}
              >
                Edit
              </button>

              <br />
              <button
                className=" text-black bg-white border  p-2 w-26"
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete ${row.Title}?`,
                    )
                  ) {
                    handleDelete(row); // Call handleDelete function on click of delete button
                  }
                  setSelectedRow(null);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb pageName="Offer Listing" />
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
                    <Link
                      to="/offer/add"
                      className="bg-blue-500 text-white p-3 px-10 text-sm"
                    >
                      Add
                    </Link>
                  }
                  subHeader
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferListing;
