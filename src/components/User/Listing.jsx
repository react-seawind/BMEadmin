import React, { useEffect, useRef, useState } from 'react';
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
import { deleteUser, getAllUserByCountrySlug } from '../../API/UserApi';
import { MdEmojiEvents } from 'react-icons/md';
import { getAllCountry } from '../../API/StateAPI';

const UserListing = () => {
  const [user, setuser] = useState([]);
  const [country, setcountry] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); // Default value 'Active'

  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state

  // =============action button===============
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading state for initial loading
      const result = await getAllUserByCountrySlug(statusFilter);
      setuser(result);
      setfilterdata(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };
  const fetchCountryData = async () => {
    try {
      const result = await getAllCountry();
      setcountry(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchCountryData();
    fetchData();
  }, []);
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // -------------------delete user------------------
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

  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon={<FaPencilAlt />}
          className="border my-1 border-blue-600 text-blue-600 mr-2 rounded-full py-2.5"
          onClick={() => {
            Navigate(`/user/edit/${rowData.Id}`);
          }}
        />
        <Button
          icon={<MdEmojiEvents />}
          title="booking"
          className="border my-1 border-green-600 text-green-600 mr-2 rounded-full py-2.5"
          onClick={() => {
            Navigate(`/user/booking/${rowData.Id}`);
          }}
        />
        <Button
          icon={<FaTrash />}
          className="border my-1 border-red-600 text-red-600 rounded-full py-2.5"
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
      <Breadcrumb pageName="User Listing" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="bg-[#7fc6e55c] p-3">
                <form className="flex items-center justify-between">
                  <select
                    className="md:w-80 w-40 h-10 border form-control form-select"
                    value={statusFilter}
                    onChange={handleStatusChange}
                  >
                    <option value="all">All</option>
                    {country.map((country) => (
                      <option key={country.Id} value={country.Slug}>
                        {country.Title}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="bg-blue-600 text-white h-10 px-5 border"
                    onClick={fetchData}
                  >
                    View Report
                  </button>
                </form>
              </div>
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
                    header="#"
                    className="border border-stroke"
                    body={(rowData, { rowIndex }) => rowIndex + 1}
                  />
                  <Column
                    field="Name"
                    header="Name"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="Email"
                    header="Email"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="CountryCode"
                    header="Country"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="Phone"
                    header="Phone"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="City"
                    header="City"
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

export default UserListing;
