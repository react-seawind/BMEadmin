import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { BiCategory, BiRupee } from 'react-icons/bi';
import { getAllDashbaord } from '../../API/DashboardAPI.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowUp, FaEarthAsia, FaTicket, FaUser } from 'react-icons/fa6';
import { FaPencilAlt } from 'react-icons/fa';
import { IoTicket } from 'react-icons/io5';
import { getAllEventByVendorIdId } from '../../API/EventApi.jsx';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import ClipLoader from 'react-spinners/BounceLoader';
import { format } from 'date-fns';
import { Button } from 'primereact/button';

const ECommerce = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [CountryData, setCountryData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [VendorData, setVendorData] = useState([]);
  const [TotalEventData, setTotalEventData] = useState([]);
  const [country, setcountry] = useState([]);
  const [CountryWiseTotal, setCountryWiseTotal] = useState([]);
  const [CountryWiseEvent, setCountryWiseEvent] = useState([]);
  const [CountryWiseEventStatus, setCountryWiseEventStatus] = useState([]);

  const [category, setcategory] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);

  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  // =============action button===============
  const fetchCountryData = async () => {
    try {
      const result = await getAllDashbaord();
      setCategoryData(result.CategoryCount);
      setCountryData(result.CountryCount);
      setUserData(result.TotalUser);
      setVendorData(result.TotalVendor);
      setcountry(result.CountryWiseUser);
      setCountryWiseTotal(result.CountryWiseTotal);
      setcategory(result.pendingEvents);
      setfilterdata(result.pendingEvents);
      setTotalEventData(result.TotalEventCount);
      setCountryWiseEvent(result.CountryWiseEvent);
      setCountryWiseEventStatus(result.CountryWiseEventStatus);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };
  useEffect(() => {
    fetchCountryData();
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
      </div>
    );
  };

  // --------------------Income-------------------
  // Extract country names and user counts
  const labelsIncome = CountryWiseTotal?.map((country) => country.Country);
  const userCountsIncome = CountryWiseTotal?.map((country) => country.Total);

  // Extract country names and user counts
  const labels = country?.map((country) => country.Country);
  const userCounts = country?.map((country) => country.UserCount);
  // Extract CountryWiseEvent
  const CountryWiseEventlabels = CountryWiseEvent.map(
    (country) => country.Country,
  );
  const CountryWiseEventCounts = CountryWiseEvent.map(
    (country) => country.EventCount,
  );
  // Extract CountryWiseEventStatus
  const CountryWiseEventStatuslabels = CountryWiseEventStatus.map(
    (country) => country.Country,
  );
  const CountryWiseEventStatusPending = CountryWiseEventStatus.map(
    (country) => country.Pending,
  );
  const CountryWiseEventStatusActive = CountryWiseEventStatus.map(
    (country) => country.Active,
  );
  const CountryWiseEventStatusInactive = CountryWiseEventStatus.map(
    (country) => country.Inactive,
  );
  const CountryWiseEventStatusExpired = CountryWiseEventStatus.map(
    (country) => country.Expired,
  );
  const CountryWiseEventStatusReject = CountryWiseEventStatus.map(
    (country) => country.Reject,
  );
  const CountryWiseEventStatusCanceled = CountryWiseEventStatus.map(
    (country) => country.Canceled,
  );
  // -------------user-----------------
  const dataIncome = {
    labels: labelsIncome,
    datasets: [
      {
        label: 'Income',
        data: userCountsIncome,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  // -------------user-----------------
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Users',
        data: userCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // ----------------------Pie--------------------
  const PieChartdata = {
    labels: CountryWiseEventlabels,
    datasets: [
      {
        label: 'Event Count',
        data: CountryWiseEventCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // -----------------------event-status-------------------

  const eventstatusdata = {
    labels: CountryWiseEventStatuslabels,
    datasets: [
      {
        label: 'Pending Event',
        data: CountryWiseEventStatusPending,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Active Event',
        data: CountryWiseEventStatusActive,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Inactive Event',
        data: CountryWiseEventStatusInactive,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
      },
      {
        label: 'Expired Event',
        data: CountryWiseEventStatusExpired,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Reject Event',
        data: CountryWiseEventStatusReject,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
      {
        label: 'Canceled Event',
        data: CountryWiseEventStatusCanceled,
        backgroundColor: 'rgba(51, 161, 231, 0.1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const Pieoptions = {
    maintainAspectRatio: false, // Disable the default aspect ratio
  };
  const eventstatusdataOption = {
    maintainAspectRatio: false, // Disable the default aspect ratio
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">
        <Link to={'/category/listing'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <BiCategory className="fill-primary dark:fill-white text-2xl" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {categoryData}
                </h4>
                <span className="text-sm font-medium">Total Categories</span>
              </div>
            </div>
          </div>
        </Link>

        <Link to={'/country/listing'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <FaEarthAsia className="fill-primary dark:fill-white text-2xl" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {CountryData}
                </h4>
                <span className="text-sm font-medium">Total Country</span>
              </div>
            </div>
          </div>
        </Link>

        <Link to={'/user/listing'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <FaUser className="fill-primary dark:fill-white text-2xl" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {UserData}
                </h4>
                <span className="text-sm font-medium">Total User</span>
              </div>
            </div>
          </div>
        </Link>

        <Link to={'/vendor/listing'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <FaUser className="fill-primary dark:fill-white text-2xl" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {VendorData}
                </h4>
                <span className="text-sm font-medium">Total Vendor</span>
              </div>
            </div>
          </div>
        </Link>
        <Link to={'/allevent/listing'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <FaTicket className="fill-primary dark:fill-white text-2xl" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {TotalEventData}
                </h4>
                <span className="text-sm font-medium">Total Event</span>
              </div>
            </div>
          </div>
        </Link>

        {CountryWiseTotal.map((val) => {
          return (
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <BiRupee className="fill-primary dark:fill-white text-2xl" />
              </div>
              <div class="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    {val.Total}
                  </h4>
                  <span className="text-sm font-medium">{val.Country}</span>
                </div>
                <span class="flex items-center gap-1 text-sm font-medium text-meta-3 undefined ">
                  <FaArrowUp />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark mt-7">
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
              padding: '10px',
            }}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            emptyMessage="No Data found"
            globalFilter={search}
            header={
              <div className="flex justify-between pb-5 p-ai-center">
                Pending Event
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
                format(new Date(rowData.EventStartDateTime), 'MM/dd/yyyy')
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:gap-7.5 my-7">
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <Bar data={data} options={options} />
          <p className="text-center mt-3 font-bold">Total User</p>
        </div>
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="h-80">
            <Pie data={PieChartdata} options={Pieoptions} />
          </div>
          <p className="text-center mt-3 font-bold">Total Events</p>
        </div>
      </div>
      <div className="rounded-sm border h-125 border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <Bar data={eventstatusdata} options={eventstatusdataOption} />
      </div>
    </div>
  );
};

export default ECommerce;
