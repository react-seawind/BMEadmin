import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';
import { deleteSlider, getAllSlider } from '../API';

const SliderListing = () => {
  const [slider, setslider] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);

  const Navigate = useNavigate();

  // =============action button===============
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllSlider();
        setslider(result);
        setfilterdata(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // -------------------delete slider------------------
  const handleDelete = async (row) => {
    try {
      await deleteSlider(row.Id);
      setslider((prevCategory) =>
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
    const mySearch = slider.filter(
      (item) =>
        item.Title && item.Title.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);
  const columns = [
    {
      name: '#',
      selector: 'Id',
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: 'Title',
      selector: (row) => <h1 className="text-base">{row.Title}</h1>,
    },

    {
      name: 'Image',
      selector: (row) => (
        <img className="p-1 overflow-hidden h-50 w-60 border" src={row.Image} />
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
      name: 'Ent Date',
      selector: (row) => <h1 className="text-base">{row.EntDt}</h1>,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div>
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
                  Navigate(`/slider/edit/${row.Id}`);
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
      <Breadcrumb pageName="Slider Listing" />
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
                  <Link
                    to="/slider/add"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderListing;
