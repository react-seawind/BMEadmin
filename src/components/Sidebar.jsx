import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../images/mainlogo.png';
import SidebarLinkGroup from './SidebarLinkGroup';
import { MdDashboard } from 'react-icons/md';
import { IoSettingsOutline, IoShareSocial } from 'react-icons/io5';
import { GrServices } from 'react-icons/gr';
import { IoIosContact, IoMdAdd } from 'react-icons/io';
import { TfiLayoutSliderAlt } from 'react-icons/tfi';
import { FcAbout } from 'react-icons/fc';
import {
  FaBookOpenReader,
  FaChevronDown,
  FaLanguage,
  FaMapLocation,
  FaNewspaper,
  FaUser,
} from 'react-icons/fa6';

import {
  FaAddressCard,
  FaArrowLeft,
  FaBlog,
  FaBookOpen,
  FaClipboardList,
  FaDatabase,
  FaEdit,
  FaHome,
  FaQuestionCircle,
  FaRegUser,
  FaSitemap,
  FaUserCircle,
} from 'react-icons/fa';
import { BsChatQuoteFill } from 'react-icons/bs';
import { BiSolidOffer } from 'react-icons/bi';

const Sidebar = ({ sidebarOpen, setSidebarOpen }, SidebarProps) => {
  const location = useLocation();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebarOpen || !sidebar.current || !trigger.current) return;
      if (sidebar.current.contains(target) || trigger.current.contains(target))
        return;
      setSidebarOpen(false);
    };

    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (sidebarOpen && keyCode === 27) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center lg:justify-center   gap-2 px-6 py-2.5 lg:py-4.5">
        <NavLink to="/dashboard">
          <img src={Logo} alt="Logo" className="w-15 lg:w-30 lg:mx-auto" />
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden ms-auto text-1xl text-white"
        >
          <FaArrowLeft />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* ===============DASHBOARD============== */}
              <li>
                <NavLink
                  to="/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                >
                  <MdDashboard />
                  Dashboard
                </NavLink>
              </li>

              {/* ===============Setting============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4  `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <IoSettingsOutline />
                        Settings
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown className="bg-red-700" />
                        </div>
                      </NavLink>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <SidebarLinkGroup>
                              {(handleClick, open) => {
                                return (
                                  <React.Fragment>
                                    <NavLink
                                      to="#"
                                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true);
                                      }}
                                    >
                                      <IoIosContact />
                                      Contact Setting
                                      <span
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                          open && 'rotate-180'
                                        }`}
                                      >
                                        <FaChevronDown />
                                      </span>
                                    </NavLink>
                                    {/* <!-- Dropdown Menu Start --> */}
                                    <div
                                      className={`translate transform overflow-hidden ${
                                        !open && 'hidden'
                                      }`}
                                    >
                                      <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                                        <li>
                                          <NavLink
                                            to="/contact/edit"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <FaEdit />
                                            Edit
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                  </React.Fragment>
                                );
                              }}
                            </SidebarLinkGroup>
                          </li>
                        </ul>
                      </div>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <SidebarLinkGroup>
                              {(handleClick, open) => {
                                return (
                                  <React.Fragment>
                                    <NavLink
                                      to="#"
                                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4  `}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true);
                                      }}
                                    >
                                      <IoShareSocial />
                                      Social Setting
                                      <span
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                          open && 'rotate-180'
                                        }`}
                                      >
                                        <FaChevronDown />
                                      </span>
                                    </NavLink>
                                    {/* <!-- Dropdown Menu Start --> */}
                                    <div
                                      className={`translate transform overflow-hidden ${
                                        !open && 'hidden'
                                      }`}
                                    >
                                      <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                                        <li>
                                          <NavLink
                                            to="/social/edit"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <FaEdit />
                                            Edit
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                  </React.Fragment>
                                );
                              }}
                            </SidebarLinkGroup>
                          </li>
                        </ul>
                      </div>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <SidebarLinkGroup>
                              {(handleClick, open) => {
                                return (
                                  <React.Fragment>
                                    <NavLink
                                      to="#"
                                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4  `}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true);
                                      }}
                                    >
                                      <FaSitemap />
                                      Site Setting
                                      <span
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                          open && 'rotate-180'
                                        }`}
                                      >
                                        <FaChevronDown />
                                      </span>
                                    </NavLink>
                                    {/* <!-- Dropdown Menu Start --> */}
                                    <div
                                      className={`translate transform overflow-hidden ${
                                        !open && 'hidden'
                                      }`}
                                    >
                                      <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                                        <li>
                                          <NavLink
                                            to="/site/edit"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <FaEdit />
                                            Edit
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                  </React.Fragment>
                                );
                              }}
                            </SidebarLinkGroup>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* ===============Home Manager============== */}

              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <TfiLayoutSliderAlt />
                        Slider
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown className="bg-red-700" />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/slider/listing"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <FaClipboardList />
                              List
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/slider/add"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <IoMdAdd />
                              Add
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* ===============Location Manager============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaMapLocation />
                        Location Manager
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown className="bg-red-700" />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <SidebarLinkGroup>
                              {(handleClick, open) => {
                                return (
                                  <React.Fragment>
                                    <NavLink
                                      to="#"
                                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true);
                                      }}
                                    >
                                      {' '}
                                      <FaMapLocation />
                                      City
                                      <span
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                          open && 'rotate-180'
                                        }`}
                                      >
                                        <FaChevronDown />
                                      </span>
                                    </NavLink>
                                    {/* <!-- Dropdown Menu Start --> */}
                                    <div
                                      className={`translate transform overflow-hidden ${
                                        !open && 'hidden'
                                      }`}
                                    >
                                      <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                                        <li>
                                          <NavLink
                                            to="/city/listing"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <FaClipboardList />
                                            Listing
                                          </NavLink>
                                        </li>
                                        <li>
                                          <NavLink
                                            to="/city/add"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <IoMdAdd />
                                            Add
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                  </React.Fragment>
                                );
                              }}
                            </SidebarLinkGroup>
                          </li>
                        </ul>
                      </div>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <SidebarLinkGroup>
                              {(handleClick, open) => {
                                return (
                                  <React.Fragment>
                                    <NavLink
                                      to="#"
                                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true);
                                      }}
                                    >
                                      {' '}
                                      <FaMapLocation />
                                      State
                                      <span
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                          open && 'rotate-180'
                                        }`}
                                      >
                                        <FaChevronDown />
                                      </span>
                                    </NavLink>
                                    {/* <!-- Dropdown Menu Start --> */}
                                    <div
                                      className={`translate transform overflow-hidden ${
                                        !open && 'hidden'
                                      }`}
                                    >
                                      <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                                        <li>
                                          <NavLink
                                            to="/state/listing"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <FaClipboardList />
                                            Listing
                                          </NavLink>
                                        </li>
                                        <li>
                                          <NavLink
                                            to="/state/add"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <IoMdAdd />
                                            Add
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                  </React.Fragment>
                                );
                              }}
                            </SidebarLinkGroup>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* ===============Pages============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaBookOpen />
                        Pages
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown className="bg-red-700" />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/page/listing"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <FaClipboardList />
                              List
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/page/add"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <IoMdAdd />
                              Add
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* ===============Faq============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaQuestionCircle />
                        Faq
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown className="bg-red-700" />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/faq/listing"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <FaClipboardList />
                              List
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/faq/add"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <IoMdAdd />
                              Add
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* ===============User Manager============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaRegUser />
                        User Manager
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown className="bg-red-700" />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/user/listing"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <FaClipboardList />
                              List
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/user/add"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <IoMdAdd />
                              Add
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* ===============Vendor Manager============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaRegUser />
                        Vendor Manager
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/vendor/listing"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <FaClipboardList />
                              List
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/vendor/add"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <IoMdAdd />
                              Add
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* ===============ARTIST============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaRegUser />
                        Artist
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown className="bg-red-700" />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/artist/listing"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <FaClipboardList />
                              List
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/artist/add"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <IoMdAdd />
                              Add
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* ===============OFFER============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <BiSolidOffer />
                        Offer
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown className="bg-red-700" />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/offer/listing"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <FaClipboardList />
                              List
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/offer/add"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <IoMdAdd />
                              Add
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* ===============language============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaLanguage />
                        Language
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown className="bg-red-700" />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/language/listing"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <FaClipboardList />
                              List
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/language/add"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <IoMdAdd />
                              Add
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* ===============Category============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaUser />
                        Category
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown className="bg-red-700" />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/category/listing"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <FaClipboardList />
                              List
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/category/add"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <IoMdAdd />
                              Add
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* ===============AllEvent============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaUser />
                        All Event
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown className="bg-red-700" />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/allevent/listing"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <FaClipboardList />
                              List
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* ===============AllBooking============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaUser />
                        All Booking
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/allbooking/listing"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                            >
                              <FaClipboardList />
                              List
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* ===============Data Manager============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaDatabase />
                        Data Manager
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <SidebarLinkGroup>
                              {(handleClick, open) => {
                                return (
                                  <React.Fragment>
                                    <NavLink
                                      to="#"
                                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true);
                                      }}
                                    >
                                      <IoIosContact />
                                      Contact Us Data
                                      <span
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                          open && 'rotate-180'
                                        }`}
                                      >
                                        <FaChevronDown />
                                      </span>
                                    </NavLink>
                                    {/* <!-- Dropdown Menu Start --> */}
                                    <div
                                      className={`translate transform overflow-hidden ${
                                        !open && 'hidden'
                                      }`}
                                    >
                                      <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                                        <li>
                                          <NavLink
                                            to="/contactusdata/listing"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <FaClipboardList />
                                            Listing
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                  </React.Fragment>
                                );
                              }}
                            </SidebarLinkGroup>
                          </li>
                        </ul>
                      </div>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <SidebarLinkGroup>
                              {(handleClick, open) => {
                                return (
                                  <React.Fragment>
                                    <NavLink
                                      to="#"
                                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true);
                                      }}
                                    >
                                      <FaNewspaper />
                                      Newslatter
                                      <span
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                          open && 'rotate-180'
                                        }`}
                                      >
                                        <FaChevronDown />
                                      </span>
                                    </NavLink>
                                    {/* <!-- Dropdown Menu Start --> */}
                                    <div
                                      className={`translate transform overflow-hidden ${
                                        !open && 'hidden'
                                      }`}
                                    >
                                      <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                                        <li>
                                          <NavLink
                                            to="/newslatter/listing"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <FaClipboardList />
                                            Listing
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                  </React.Fragment>
                                );
                              }}
                            </SidebarLinkGroup>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
