// import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import Breadcrumb from '../Breadcrumb';
// import ClipLoader from 'react-spinners/BounceLoader';
// import { useNavigate, useParams } from 'react-router-dom';
// import { GetAllBookedOrderByVendorId } from '../../API/OrderApi';

// const VendorIdBooking = () => {
//   const [service, setservice] = useState([]);
//   const [search, setsearch] = useState('');
//   const [loading, setLoading] = useState(true); // Loading state
//   const [filterdata, setfilterdata] = useState([]);

//   const Navigate = useNavigate();

//   const { Id } = useParams();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await GetAllBookedOrderByVendorId(Id);
//         setservice(result);
//         setfilterdata(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false); // Set loading to false after data is fetched
//       }
//     };

//     fetchData();
//   }, []);

//   const columns = [
//     {
//       name: '#',
//       selector: 'Id',
//       cell: (row, index) => <div>{index + 1}</div>,
//     },
//
//     {
//       name: 'Action',
//       cell: (row) => (
//         <div>
//           <button
//             onClick={() => {
//               Navigate(`/allbooking/view/${row.Id}`);
//             }}
//             className="bg-red-600 text-white px-4 py-1"
//           >
//             View
//           </button>
//         </div>
//       ),
//     },
//   ];

//   useEffect(() => {
//     const mySearch = service.filter(
//       (item) =>
//         item.EventName &&
//         item.EventName.toLowerCase().match(search.toLowerCase()),
//     );
//     setfilterdata(mySearch);
//   }, [search, service]);

//   const handleGoBack = () => {
//     Navigate('/vendor/listing');
//   };
//   return (
//     <div>
//       <Breadcrumb pageName="All Booking Listing" />
//       <div className="grid grid-cols-1 gap-9 ">
//         <div className="flex flex-col gap-9 ">
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               {loading ? (
//                 <div className="flex justify-center items-center py-60">
//                   <ClipLoader color={'#c82f32'} loading={loading} size={40} />
//                 </div>
//               ) : (
//                 <>
//                   {filterdata.length === 0 ? (
//                     <div className="mx-3 my-3 py-16 bg-slate-300 font-bold text-2xl text-bodydark2 text-center">
//                       No Booking Found
//                     </div>
//                   ) : (
//                     <DataTable
//                       className="text-2xl"
//                       columns={columns}
//                       data={filterdata}
//                       pagination
//                       highlightOnHover
//                       subHeader
//                       actions={
//                         <div
//                           onClick={handleGoBack}
//                           type="button"
//                           className="bg-blue-500 cursor-pointer text-white p-3 px-10 text-sm"
//                         >
//                           Back
//                         </div>
//                       }
//                       subHeaderComponent={
//                         <input
//                           type="text"
//                           placeholder="search"
//                           className="text-start me-auto -mt-25 border-2 py-3 px-5"
//                           value={search}
//                           onChange={(e) => {
//                             setsearch(e.target.value);
//                           }}
//                         />
//                       }
//                     />
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorIdBooking;

import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import ClipLoader from 'react-spinners/BounceLoader';
import { GetAllBookedOrderByVendorId } from '../../API/OrderApi';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { FaEye } from 'react-icons/fa6';
import NoDataFound from '../../common/Loader/NoDataFound';

const VendorIdBooking = () => {
  const [category, setcategory] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  const { Id } = useParams();
  // =============action button===============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetAllBookedOrderByVendorId(Id);
        setcategory(result);
        setfilterdata(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const mySearch = category.filter(
      (item) =>
        item.EventName &&
        item.EventName.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);

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
  const handleGoBack = () => {
    navigate(`/vendor/listing`);
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
                  <DataTable
                    value={filterdata}
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
                        <div
                          onClick={handleGoBack}
                          className="bg-blue-500 text-white p-3 px-10 text-sm cursor-pointer"
                        >
                          Back
                        </div>
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
                      field="TypeOfEvent"
                      header="Type Of Event"
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
