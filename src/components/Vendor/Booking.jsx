import React from 'react';
import { Bookingdata } from '../API';

const VendorBooking = () => {
  return (
    <div>
      <div className="container mx-auto my-10 ">
        <div className="text-center text-3xl">Booking Detail</div>

        <div className="mt-5 mx-3">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4">
            <div className="shadow-md">
              <div className="bg-themecolor1 py-2 text-white font-bold text-center">
                GOLD
              </div>
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
                <tbody>
                  <tr className="border-b">
                    <th class="px-6 py-2">Total:</th>
                    <td class="px-6 py-2">500</td>
                  </tr>
                  <tr className="border-b">
                    <th class="px-6 py-2">Alloted:</th>
                    <td class="px-6 py-2">400</td>
                  </tr>
                  <tr className="border-b">
                    <th class="px-6 py-2">Available:</th>
                    <td class="px-6 py-2">100</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-center font-bold border py-3 border-black">
                Ticket Price : ₹500
              </p>
            </div>
            <div className="shadow-md">
              <div className="bg-themecolor1 py-2 text-white font-bold text-center">
                DIMOND
              </div>
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
                <tbody>
                  <tr className="border-b">
                    <th class="px-6 py-2">Total:</th>
                    <td class="px-6 py-2">500</td>
                  </tr>
                  <tr className="border-b">
                    <th class="px-6 py-2">Alloted:</th>
                    <td class="px-6 py-2">400</td>
                  </tr>
                  <tr className="border-b">
                    <th class="px-6 py-2">Available:</th>
                    <td class="px-6 py-2">100</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-center font-bold border py-3 border-black">
                Ticket Price : ₹1000
              </p>
            </div>
            <div className="shadow-md">
              <div className="bg-themecolor1 py-2 text-white font-bold text-center">
                SILVER
              </div>
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
                <tbody>
                  <tr className="border-b">
                    <th class="px-6 py-2">Total:</th>
                    <td class="px-6 py-2">500</td>
                  </tr>
                  <tr className="border-b">
                    <th class="px-6 py-2">Alloted:</th>
                    <td class="px-6 py-2">400</td>
                  </tr>
                  <tr className="border-b">
                    <th class="px-6 py-2">Available:</th>
                    <td class="px-6 py-2">100</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-center font-bold border py-3 border-black">
                Ticket Price : ₹1500
              </p>
            </div>
            <div className="shadow-md">
              <div className="bg-themecolor1 py-2 text-white font-bold text-center">
                PLATINUM
              </div>
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
                <tbody>
                  <tr className="border-b">
                    <th class="px-6 py-2">Total:</th>
                    <td class="px-6 py-2">500</td>
                  </tr>
                  <tr className="border-b">
                    <th class="px-6 py-2">Alloted:</th>
                    <td class="px-6 py-2">400</td>
                  </tr>
                  <tr className="border-b">
                    <th class="px-6 py-2">Available:</th>
                    <td class="px-6 py-2">100</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-center font-bold border py-3 border-black">
                Ticket Price : ₹2000
              </p>
            </div>
          </div>
        </div>

        <div class="relative overflow-x-auto shadow-lg   mt-8 mx-3">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-slate-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="border-b">
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Ticket Type
                </th>
                <th scope="col" class="px-6 py-3">
                  No of Ticket
                </th>
                <th scope="col" class="px-6 py-3">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {Bookingdata.map((val) => {
                return (
                  <tr className="border-b">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {val.name}
                    </th>
                    <td class="px-6 py-4"> {val.email}</td>
                    <td class="px-6 py-4"> {val.Tickettype}</td>
                    <td class="px-6 py-4"> {val.noofticket}</td>
                    <td class="px-6 py-4"> {val.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorBooking;
