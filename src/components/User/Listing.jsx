// import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import Breadcrumb from '../Breadcrumb';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { FaChevronDown } from 'react-icons/fa6';
// import { getServicedata } from '../API';

// const UserListing = () => {
//   const [service, setservice] = useState([]);
//   const [search, setsearch] = useState('');
//   const [filterdata, setfilterdata] = useState([]);

//   const Navigate = useNavigate();

//   // =============action button===============
//   const [selectedRow, setSelectedRow] = useState(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getServicedata();
//         setservice(result);
//         setfilterdata(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const columns = [
//     {
//       name: ' # ',
//       selector: (row) => <h1 className="text-base">{row.Id}</h1>,
//
//     },
//     {
//       name: 'Title',
//       selector: (row) => <h1 className="text-base">{row.Title}</h1>,
//
//     },
//     {
//       name: 'SubTitle',
//       selector: (row) => <h1 className="text-base">{row.SubTitle}</h1>,
//
//     },
//     {
//       name: 'Image',
//       selector: (row) => (
//         <img className="p-2 overflow-hidden h-40 rounded-md w-40 border my-2 border-slate-200 bg-white " src={row.Image} />
//       ),
//
//     },
//     {
//       name: 'Status',
//       selector: (row) => (
//         <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
//           Active
//         </span>
//       ),
//
//     },
//     {
//       name: 'Action',
//       cell: (row) => (
//         <div>
//           <button
//             className="bg-red-600 text-white p-3 px-5 flex"
//             onClick={() => {
//               setSelectedRow((prevRow) => (prevRow === row ? null : row));
//             }}
//           >
//             Actions
//             <FaChevronDown className=" my-auto mx-2" />
//           </button>

//           {selectedRow && selectedRow.Id === row.Id && (
//             <div className="action-buttons ml-3">
//               <button
//                 className=" text-black  bg-white border rounded p-2 w-25"
//                 onClick={() => {
//                   setSelectedRow(null);
//                   Navigate('/user/edit');
//                 }}
//               >
//                 Edit
//               </button>
//               <br />
//               <button
//                 className=" text-black  bg-white border rounded p-2 w-25"
//                 onClick={() => {
//                   alert(`Deleting ${row.Title}`);
//                   setSelectedRow(null);
//                 }}
//               >
//                 Delete
//               </button>
//             </div>
//           )}
//         </div>
//       ),
//     },
//   ];

//   useEffect(() => {
//     const mySearch = service.filter(
//       (item) =>
//         item.Title && item.Title.toLowerCase().match(search.toLowerCase()),
//     );
//     setfilterdata(mySearch);
//   }, [search]);

//   return (
//     <div>
//       <Breadcrumb pageName="User Listing" />
//       <div className="grid grid-cols-1 gap-9 ">
//         <div className="flex flex-col gap-9 ">
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               <DataTable
//                 className="text-2xl"
//                 columns={columns}
//                 data={filterdata}
//                 pagination
//                 highlightOnHover
//                 actions={
//                   <Link
//                     to="/user/add"
//                     className="bg-blue-500 text-white p-3 px-10 text-sm"
//                   >
//                     Add
//                   </Link>
//                 }
//                 subHeader
//                 subHeaderComponent={
//                   <input
//                     type="text"
//                     placeholder="search"
//                     className="text-start me-auto -mt-25 border-2 py-3 px-5"
//                     value={search}
//                     onChange={(e) => {
//                       setsearch(e.target.value);
//                     }}
//                   />
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserListing;

import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';
import Logo from '../../images/mainlogo.png';
import Breadcrumb from '../Breadcrumb';

const UserListing = () => {
  const data = [
    {
      Id: '1',
      Title: '   1',
      SubTitle: 'Event 1',
      Image: Logo,
      Status: 'Avtive',
    },
    {
      Id: '2',
      Title: '   2',
      SubTitle: 'Event 2',
      Image: Logo,
      Status: 'Avtive',
    },
    {
      Id: '3',
      Title: '   3',
      SubTitle: 'Event 3',
      Image: Logo,
      Status: 'Avtive',
    },
  ];

  const [service, setservice] = useState(data);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState(data);

  const Navigate = useNavigate();

  // =============action button===============
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getServicedata();
        setservice(result);
        setfilterdata(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      name: 'Title',
      selector: (row) => <h1 className="text-base">{row.Title}</h1>,
    },
    {
      name: 'SubTitle',
      selector: (row) => <h1 className="text-base">{row.SubTitle}</h1>,
    },
    {
      name: 'Image',
      selector: (row) => (
        <img
          className="p-2 overflow-hidden h-40 rounded-md w-40 border my-2 border-slate-200 bg-white "
          src={row.Image}
        />
      ),
    },
    {
      name: 'Status',
      selector: (row) => (
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          Active
        </span>
      ),
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
                    Navigate('/user/edit');
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-black p-2 w-full border-b border-gray-300"
                  onClick={() => {
                    alert(`Deleting ${row.Title}`);
                    setSelectedRow(null);
                  }}
                >
                  Delete
                </button>
                <button
                  className="text-black p-2 w-full border-b border-gray-300"
                  onClick={() => {
                    setSelectedRow(null);
                    Navigate('/user/events');
                  }}
                >
                  Events
                </button>
                <button
                  className="text-black p-2 w-full border-b border-gray-300"
                  onClick={() => {
                    setSelectedRow(null);
                    Navigate('/user/bookings');
                  }}
                >
                  Bookings
                </button>
                <button
                  className="text-black p-2 w-full"
                  onClick={() => {
                    setSelectedRow(null);
                    Navigate('/user/kyc');
                  }}
                >
                  KYC
                </button>
              </div>
            )}
          </div>
        </div>
      ),
      allowOverflow: true,

      // cell: (row) => <CustomMaterialMenu size="small" row={row} />,
      // allowOverflow: true,
      // button: true,
      // width: '56px',
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
      <Breadcrumb pageName="User Listing" />
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
                    to="/user/add"
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

export default UserListing;
