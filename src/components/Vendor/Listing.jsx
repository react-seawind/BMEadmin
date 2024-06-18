import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ClipLoader from 'react-spinners/BounceLoader';
import { FaPencilAlt, FaTrash, FaCog } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { deleteUser, getAllUser } from '../../API/UserApi';
import { MdEmojiEvents, MdVerified } from 'react-icons/md';
import { IoTicket } from 'react-icons/io5';

const VendorListing = () => {
  const [user, setuser] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);
  const [visibleDropdown, setVisibleDropdown] = useState(null);

  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllUser();
        const filteredData = result.filter((item) => item.Type === 'V');
        setuser(filteredData);

        if (filteredData.length > 0) {
          setfilterdata(filteredData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (row) => {
    try {
      await deleteUser(row.Id);
      setuser((prevuser) => prevuser.filter((item) => item.Id !== row.Id));
      setfilterdata((prevFilterData) =>
        prevFilterData.filter((item) => item.Id !== row.Id),
      );
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    const mySearch = user.filter(
      (item) =>
        item.Name && item.Name.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);

  const imageBodyTemplate = (rowData) => {
    return (
      <>
        {rowData.Image !== '' ? (
          <img
            className="p-0.5 overflow-hidden mx-auto h-30 rounded-md w-30 border my-1 border-slate-200 bg-white"
            src={rowData.Image}
            alt="Uploaded"
          />
        ) : (
          <p className="p-0.5 overflow-hidden mx-auto h-30 rounded-md w-30 border my-1 border-slate-200 bg-white text-xl text-center">
            Image <br /> Not <br /> Uploaded
          </p>
        )}
      </>
    );
  };

  const actionTemplate = (rowData) => {
    const isVisible = visibleDropdown === rowData.Id;

    return (
      <div className="relative">
        <Button
          icon={<FaCog />}
          className="border my-1 border-gray-600 text-white bg-blue-500 rounded-full py-2.5"
          onClick={() => {
            setVisibleDropdown(isVisible ? null : rowData.Id);
          }}
        />
        {isVisible && (
          <div className="absolute z-10 mt-2  bg-white dark:bg-boxdark border border-gray-300 rounded shadow-lg">
            <Button
              label="Edit"
              icon={<FaPencilAlt className="mr-2" />}
              className="w-29 text-left p-2 border-b rounded-none"
              onClick={() => {
                Navigate(`/vendor/edit/${rowData.Id}`);
              }}
            />
            <Button
              label="Events"
              icon={<MdEmojiEvents className="mr-2" />}
              title="Events"
              className="w-29 text-left p-2 border-b rounded-none"
              onClick={() => {
                Navigate(`/vendor/event/listing/${rowData.Id}`);
              }}
            />
            <Button
              label="KYC"
              icon={<MdVerified className="mr-2" />}
              title="KYC"
              className="w-29 text-left p-2 border-b rounded-none"
              onClick={() => {
                Navigate(`/vendor/kyc/${rowData.Id}`);
              }}
            />
            <Button
              label="Booking"
              icon={<IoTicket className="mr-2" />}
              title="Booking"
              className="w-29 text-left p-2 border-b rounded-none"
              onClick={() => {
                Navigate(`/vendor/booking/${rowData.Id}`);
              }}
            />
            <Button
              label="Delete"
              icon={<FaTrash className="mr-2" />}
              className="w-29 text-left text-red-600 p-2"
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
        )}
      </div>
    );
  };

  return (
    <div>
      <Breadcrumb pageName="Vendor Listing" />

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
                    field="Name"
                    header="Name"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="image"
                    header="Image"
                    className="border border-stroke"
                    body={imageBodyTemplate}
                  ></Column>
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
                      format(new Date(rowData.EntDt), 'MM/dd/yyyy hh:mm a')
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

export default VendorListing;
