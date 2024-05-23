import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';
import { format } from 'date-fns';
import { deleteUser, getAllUser } from '../../API/UserApi';
import { getAllEventByVendorIdId } from '../../API/EventApi';

const EventListing = () => {
  const [user, setuser] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);

  const Navigate = useNavigate();

  // =============action button===============
  const [selectedRow, setSelectedRow] = useState(null);
  const { Id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllEventByVendorIdId(Id);
        setuser(result);
        setfilterdata(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // -------------------delete user------------------
  const handleDelete = async (row) => {
    try {
      await deleteUser(row.Id);
      setuser((prevCategory) =>
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
    const mySearch = user.filter(
      (item) =>
        item.EventName &&
        item.EventName.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);

  const columns = [
    {
      name: '#',
      selector: 'Id',
      cell: (row, index) => <div>{row.Id}</div>,
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

    {
      name: 'Action',

      cell: (row) => (
        <div>
          <div className="relative">
            <button
              className="bg-red-600 text-white p-3 pl-5 w-26 flex"
              onClick={() => {
                setSelectedRow((prevRow) => (prevRow === row ? null : row));
              }}
            >
              Actions <FaChevronDown className="my-auto ml-4" />
            </button>
            {selectedRow && selectedRow.Id === row.Id && (
              <div className="action-buttons absolute z-10 bg-white border border-gray-300 rounded-md rounded-t-none shadow-lg   ">
                <button
                  className="text-black p-2 w-full border-b border-gray-300"
                  onClick={() => {
                    setSelectedRow(null);
                    Navigate(`/vendor/event/edit/${row.UserId}/${row.Id}`);
                  }}
                >
                  Edit
                </button>

                <button
                  className=" text-black p-2 w-full "
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
        </div>
      ),
      allowOverflow: true,
    },
  ];
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(`/vendor/listing`);
  };

  return (
    <div>
      <Breadcrumb pageName="Event Listing" />
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <DataTable
                className="text-2xl"
                columns={columns}
                data={filterdata}
                pagination
                highlightOnHover
                actions={
                  <div
                    onClick={handleGoBack}
                    type="button"
                    className="bg-blue-500 cursor-pointer text-white p-3 px-10 text-sm"
                  >
                    Back
                  </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventListing;
