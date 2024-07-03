import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import ClipLoader from 'react-spinners/BounceLoader';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { getAllEventByVendorIdId } from '../../API/EventApi';
import { IoTicket } from 'react-icons/io5';

const EventListing = () => {
  const [category, setcategory] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);

  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  const { Id } = useParams();
  // =============action button===============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllEventByVendorIdId(Id);
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
          icon={<FaPencilAlt />}
          className="border border-blue-600 text-blue-600 mr-2 rounded-full py-2.5 my-1"
          onClick={() => {
            Navigate(`/vendor/event/edit/${rowData.UserId}/${rowData.Id}`);
          }}
        />
        <Button
          icon={<IoTicket />}
          className="border border-green-600 text-green-600 mr-2 rounded-full py-2.5 my-1"
          onClick={() => {
            Navigate(`/vendor/event/bookings/${rowData.Id}`);
          }}
        />
      </div>
    );
  };

  const handleGoBack = () => {
    Navigate(`/vendor/listing`);
  };

  return (
    <div>
      <Breadcrumb pageName="Event Listing" />

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
                    header="EventName"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="EventEmail"
                    header="EventEmail"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="EventOrganizer"
                    header="EventOrganizer"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="EventStartDateTime"
                    header="EventStartDate"
                    className="border border-stroke"
                    body={(rowData) =>
                      format(new Date(rowData.EventStartDateTime), 'dd/MM/yyyy')
                    }
                  />

                  <Column
                    field="CategoryTitle"
                    header="Category"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="ArtistTitle"
                    header="Artist"
                    sortable
                    className="border border-stroke"
                  />

                  <Column
                    field="Status"
                    header="Status"
                    className="border border-stroke"
                    body={(rowData) => (
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full  `}
                      >
                        {rowData.Status === 0 ? (
                          <span className="badge bg-blue-500 text-white rounded text-xs px-3 py-1">
                            Pending
                          </span>
                        ) : rowData.Status === 1 ? (
                          <span className="badge bg-green-500 text-white rounded text-xs px-3 py-1">
                            Active
                          </span>
                        ) : rowData.Status === 2 ? (
                          <span className="badge bg-graydark text-white rounded text-xs px-3 py-1">
                            Inactive
                          </span>
                        ) : rowData.Status === 3 ? (
                          <span className="badge bg-yellow-500 text-white rounded text-xs px-3 py-1">
                            Expired/Complete
                          </span>
                        ) : rowData.Status === 4 ? (
                          <span className="badge bg-red-500 text-white rounded text-xs px-3 py-1">
                            Reject
                          </span>
                        ) : (
                          ''
                        )}
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

export default EventListing;
