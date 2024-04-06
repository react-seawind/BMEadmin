import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';
import { deleteSlider, getAllSlider } from '../../API/SliderApi';

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
        <img
          className="p-2 overflow-hidden h-40 rounded-md w-40 border my-2 border-slate-200 bg-white "
          src={row.Image}
        />
      ),
      //
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
      //
    },
    {
      name: 'Ent Date',
      selector: (row) => <h1 className="text-base">{row.EntDt}</h1>,
      //
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

// import React, { useEffect, useState } from 'react';
// import Breadcrumb from '../Breadcrumb';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaChevronDown } from 'react-icons/fa6';
// import { deleteSlider, getAllSlider } from '../API';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// const SliderListing = () => {
//   const navigate = useNavigate();
//   const [slider, setSlider] = useState([]);
//   const [search, setSearch] = useState('');
//   const [filterData, setFilterData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getAllSlider();

//         setSlider(result);
//         setFilterData(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const mySearch = slider.filter(
//       (item) =>
//         item.Title && item.Title.toLowerCase().includes(search.toLowerCase()),
//     );
//     setFilterData(mySearch);
//   }, [search, slider]);

//   const ActionRenderer = (params) => {
//     const { data: row } = params; // Extract row data for clarity

//     const handleDeleteClick = async () => {
//       try {
//         await deleteSlider(row.Id);

//         setSlider((prevSlider) =>
//           prevSlider.filter((item) => item.Id !== row.Id),
//         );
//         setFilterData((prevFilterData) =>
//           prevFilterData.filter((item) => item.Id !== row.Id),
//         );
//       } catch (error) {
//         console.error('Error deleting slider:', error);
//       }
//     };

//     const handleEditClick = () => {
//       navigate(`/slider/edit/${row.Id}`);
//     };

//     return (
//       <div className="dropdown">
//         <button
//           className="bg-orange-700 text-white py-1 px-2 flex items-center justify-center rounded"
//           type="button"
//           id="dropdownMenuButton"
//         >
//           Actions <FaChevronDown className="ml-3" />
//         </button>
//         <div className="dropdown-content flex">
//           <button className="dropdown-item" onClick={handleEditClick}>
//             Edit
//           </button>
//           <button
//             className="dropdown-item text-red-500"
//             onClick={() => {
//               if (
//                 window.confirm(`Are you sure you want to delete ${row.Title}?`)
//               ) {
//                 handleDeleteClick(row);
//               }
//             }}
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const columns = [
//     { headerName: '#', field: 'Id', sortable: true },
//     { headerName: 'Title', field: 'Title', sortable: true },
//     {
//       headerName: 'Image',
//       field: 'Image',
//       cellRenderer: (params) => (
//         <img
//           style={{ width: '1000px' }}
//           className="p-1 overflow-hidden h-full w-46 border"
//           src={params.data.Image}
//           alt={params.data.Title}
//         />
//         // <h1>{params.Image}</h1>
//       ),
//
//     },
//     {
//       headerName: 'Status',
//       field: 'Status',
//
//       cellRenderer: (params) => (
//         <span
//           className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${
//             params.value == '1'
//               ? 'bg-green-600 text-white'
//               : 'bg-red-600 text-white'
//           }`}
//         >
//           {params.value == '1' ? 'Active' : 'Inactive'}
//         </span>
//       ),
//     },
//     {
//       headerName: 'Button',
//       field: 'button',
//       cellRenderer: ActionRenderer,
//     },
//     { headerName: 'Ent Date', field: 'EntDt', sortable: true },
//   ];

//   return (
//     <div>
//       <Breadcrumb pageName="Slider Listing" />
//       <div className="grid grid-cols-1 gap-9">
//         <div className="flex flex-col gap-9">
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               <div className="flex justify-between items-center mb-4">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="border rounded py-2 px-3 w-64"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <Link
//                   to="/slider/add"
//                   className="bg-blue-500 text-white p-3 px-10 text-sm"
//                 >
//                   Add
//                 </Link>
//               </div>
//               <div
//                 className="ag-theme-alpine"
//                 style={{ height: '500px', width: '100%' }}
//               >
//                 <AgGridReact
//                   rowData={filterData}
//                   columnDefs={columns}
//                   pagination={true}
//                   paginationPageSize={10}
//                   suppressCellSelection={true}
//                   rowHeight={100}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SliderListing;
