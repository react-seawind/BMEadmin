import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { format } from 'date-fns';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Breadcrumb from '../Breadcrumb';

const Coupan = () => {
  // ==================Event Data===============
  const [EventData, setEventData] = useState(null);
  const [filterdata, setfilterdata] = useState([]);
  const [search, setsearch] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const { Id } = useParams();
  const fetchEventData = async () => {
    try {
      const result = await getAllCoupon(Id);
      setEventData(result);
      setfilterdata(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };
  useEffect(() => {
    fetchEventData();
  }, []);

  const [isFormLoading, setIsFormLoading] = useState(false);
  // -------------------delete venue------------------
  const handleDelete = async (Id) => {
    setIsFormLoading(true);
    try {
      await deleteCoupon(Id);
      fetchEventData();
    } catch (error) {
      console.error('Error deleting student:', error);
    } finally {
      setIsFormLoading(false); // Set loading state to false when submission ends
    }
  };

  useEffect(() => {
    const mySearch = EventData?.filter(
      (item) =>
        item.Code && item.Code.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);
  const Navigate = useNavigate();
  const handleGoBack = () => {
    Navigate(`/vendor/listing`);
  };

  return (
    <div className=" dark:bg-boxdark-2 dark:text-white">
      <Breadcrumb pageName="Vendor Listing" />
      <div className="w-full container mx-auto">
        {/* ===============================Nav Pilss data ====================================*/}

        <div className="bg-white  dark:bg-boxdark-2 dark:text-white dark:border-zinc-600 p-3">
          <div className="border-b flex items-center bg-themecolor2">
            <h1 className="text-lg text-center text-white mx-auto py-1 font-bold pt-0">
              Coupon Listing
            </h1>
          </div>

          {loading ? (
            <div className="flex justify-center items-center my-40">
              <ClipLoader color={'#DC3558'} loading={loading} size={40} />
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
                  <div className="flex justify-between p-ai-center">
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
                  field="Code"
                  header="Code"
                  sortable
                  className="border border-stroke"
                />
                <Column
                  field="Amount"
                  header="Amount"
                  className="border border-stroke"
                />

                <Column
                  field="StartDate"
                  header="StartDate"
                  className="border border-stroke"
                  body={(rowData) =>
                    format(new Date(rowData.StartDate), 'dd/MM/yyyy')
                  }
                />
                <Column
                  field="EndDate"
                  header="EndDate"
                  className="border border-stroke"
                  body={(rowData) =>
                    format(new Date(rowData.EndDate), 'dd/MM/yyyy')
                  }
                />
                <Column
                  field="Status"
                  header="Status"
                  className="border border-stroke"
                  body={(rowData) => (
                    <span>
                      {rowData.Status === 0 ? (
                        <span className="badge bg-red-500 text-white rounded text-xs px-3 py-1">
                          In Active
                        </span>
                      ) : (
                        <span className="badge bg-green-500 text-white rounded text-xs px-3 py-1">
                          Active
                        </span>
                      )}
                    </span>
                  )}
                />
              </DataTable>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coupan;
