// import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import Breadcrumb from '../Breadcrumb';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { FaChevronDown } from 'react-icons/fa6';
// import { format } from 'date-fns';
// import { deleteLanguage, getAllLanguage } from '../../API/LanguageApi';
// import ClipLoader from 'react-spinners/BounceLoader';
// const LanguageListing = () => {
//   const [language, setlanguage] = useState([]);
//   const [search, setsearch] = useState('');
//   const [filterdata, setfilterdata] = useState([]);

//   const Navigate = useNavigate();
//   const [loading, setLoading] = useState(true); // Loading state
//   // =============action button===============
//   const [selectedRow, setSelectedRow] = useState(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getAllLanguage();
//         setlanguage(result);
//         setfilterdata(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false); // Set loading to false after data is fetched
//       }
//     };

//     fetchData();
//   }, []);

//   // -------------------delete language------------------
//   const handleDelete = async (row) => {
//     try {
//       await deleteLanguage(row.Id);
//       setlanguage((prevCategory) =>
//         prevCategory.filter((item) => item.Id !== row.Id),
//       );
//       setfilterdata((prevFilterData) =>
//         prevFilterData.filter((item) => item.Id !== row.Id),
//       );
//     } catch (error) {
//       console.error('Error deleting category:', error);
//     }
//   };
//   useEffect(() => {
//     const mySearch = language.filter(
//       (item) =>
//         item.Title && item.Title.toLowerCase().match(search.toLowerCase()),
//     );
//     setfilterdata(mySearch);
//   }, [search]);

//   const columns = [
//     {
//       name: '#',
//       selector: (row) => <h1 className="text-base min-h-29 mt-2">{row.Id}</h1>,
//     },
//     {
//       name: 'Title',
//       selector: (row) => (
//         <h1 className="text-base min-h-29 mt-2">{row.Title}</h1>
//       ),
//     },
//     {
//       name: 'Status ',
//       selector: (row) => {
//         const statusText = row.Status == '1' ? 'Active' : 'Inactive';
//         const statusColor =
//           row.Status == '1'
//             ? 'bg-green-600 text-white '
//             : 'bg-red-600 text-white';

//         return (
//           <h1 className="min-h-29 mt-2">
//             <span
//               className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full   ${statusColor}`}
//             >
//               {statusText}
//             </span>
//           </h1>
//         );
//       },
//     },
//     {
//       name: 'Entry Date',
//       selector: (row) => (
//         <h1 className="text-base min-h-29 mt-2">
//           {format(new Date(row.EntDt), 'dd/MM/yyyy hh:mm a')}
//         </h1>
//       ),
//     },
//     {
//       name: 'Action',
//       cell: (row) => (
//         <div className="min-h-29 mt-2">
//           <div className="bg-red-600 text-white p-3 pl-5 w-26 flex relative">
//             <button>Actions</button>
//             <button
//               onClick={() => {
//                 setSelectedRow((prevRow) => (prevRow === row ? null : row));
//               }}
//             >
//               <FaChevronDown className=" my-auto ml-4 " />
//             </button>
//           </div>

//           {selectedRow && selectedRow.Id === row.Id && (
//             <div className="action-buttons  absolute z-99">
//               <button
//                 className="text-black bg-white border  p-2 w-26"
//                 onClick={() => {
//                   setSelectedRow(null);
//                   Navigate(`/language/edit/${row.Id}`);
//                 }}
//               >
//                 Edit
//               </button>

//               <br />
//               <button
//                 className=" text-black bg-white border  p-2 w-26"
//                 onClick={() => {
//                   if (
//                     window.confirm(
//                       `Are you sure you want to delete ${row.Title}?`,
//                     )
//                   ) {
//                     handleDelete(row); // Call handleDelete function on click of delete button
//                   }
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

//   return (
//     <div>
//       <Breadcrumb pageName="Language Listing" />
//       <div className="grid grid-cols-1 gap-9 ">
//         <div className="flex flex-col gap-9 ">
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               {loading ? (
//                 <div className="flex justify-center items-center py-60">
//                   <ClipLoader color={'#c82f32'} loading={loading} size={40} />
//                 </div>
//               ) : (
//                 <DataTable
//                   className="text-2xl"
//                   columns={columns}
//                   data={filterdata}
//                   pagination
//                   highlightOnHover
//                   actions={
//                     <Link
//                       to="/language/add"
//                       className="bg-blue-500 text-white p-3 px-10 text-sm"
//                     >
//                       Add
//                     </Link>
//                   }
//                   subHeader
//                   subHeaderComponent={
//                     <input
//                       type="text"
//                       placeholder="search"
//                       className="text-start me-auto -mt-25 border-2 py-3 px-5"
//                       value={search}
//                       onChange={(e) => {
//                         setsearch(e.target.value);
//                       }}
//                     />
//                   }
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LanguageListing;

import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ClipLoader from 'react-spinners/BounceLoader';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { deleteLanguage, getAllLanguage } from '../../API/LanguageApi';

const LanguageListing = () => {
  const [language, setlanguage] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);

  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  // =============action button===============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllLanguage();
        setlanguage(result);
        setfilterdata(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  // -------------------delete State------------------
  const handleDelete = async (row) => {
    try {
      await deleteLanguage(row.Id);
      setlanguage((prevCategory) =>
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
    const mySearch = language.filter(
      (item) =>
        item.Title && item.Title.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);
  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon={<FaPencilAlt />}
          className="border border-blue-600 text-blue-600 mr-2 rounded-full py-2.5"
          onClick={() => {
            Navigate(`/language/edit/${rowData.Id}`);
          }}
        />
        <Button
          icon={<FaTrash />}
          className="border border-red-600 text-red-600 rounded-full py-2.5"
          onClick={() => {
            Swal.fire({
              title: 'Are you sure?',
              text: `You won't be able to revert this! Are you sure you want to delete ${rowData.Title}?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!',
            }).then((result) => {
              if (result.isConfirmed) {
                handleDelete(rowData);
                Swal.fire(
                  'Deleted!',
                  `${rowData.Title} has been deleted.`,
                  'success',
                );
              }
            });
          }}
        />
      </div>
    );
  };

  return (
    <div>
      <Breadcrumb pageName="Language Listing" />

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
                  value={filterdata}
                  tableStyle={{
                    minWidth: '50rem',
                    border: '1px solid #e0e0e0',
                  }}
                  paginator
                  rows={10}
                  rowsPerlanguageOptions={[5, 10, 25]}
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
                      <Link
                        to="/language/add"
                        className="bg-blue-500 text-white p-3 px-10 text-sm"
                      >
                        Add
                      </Link>
                    </div>
                  }
                >
                  <Column
                    header="#"
                    className="border border-stroke"
                    body={(rowData, { rowIndex }) => rowIndex + 1}
                  />
                  <Column
                    field="Title"
                    header="Title"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="Status"
                    header="Status"
                    className="border border-stroke"
                    body={(rowData) => (
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          rowData.Status === 1
                            ? 'bg-green-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {rowData.Status === 1 ? 'Active' : 'Inactive'}
                      </span>
                    )}
                  />
                  <Column
                    field="EntDt"
                    header="Entry Date"
                    className="border border-stroke"
                    body={(rowData) =>
                      format(new Date(rowData.EntDt), 'dd/MM/yyyy hh:mm a')
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

export default LanguageListing;
