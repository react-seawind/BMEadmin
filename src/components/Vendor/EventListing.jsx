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

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.Thumb}
        alt={rowData.Thumb}
        className="mx-auto overflow-hidden h-40 rounded-md w-30 border my-0.5 border-slate-200 bg-white"
      />
    );
  };

  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon={<FaPencilAlt />}
          className="border border-blue-600 text-blue-600 mr-2 rounded-full py-2.5"
          onClick={() => {
            Navigate(`/vendor/event/edit/${rowData.UserId}/${rowData.Id}`);
          }}
        />
        <Button
          icon={<IoTicket />}
          className="border border-green-600 text-green-600 mr-2 rounded-full py-2.5"
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

export default EventListing;
