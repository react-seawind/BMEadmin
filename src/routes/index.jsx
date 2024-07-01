import { lazy } from 'react';
import Contactsetting from '../components/Setting/Contactsetting';
import Socialsetting from '../components/Setting/Socialsetting';
import Sitesetting from '../components/Setting/Sitesetting';
import SliderListing from '../components/Slider/Listing';
import SliderAdd from '../components/Slider/Add';
import SliderEdit from '../components/Slider/Edit';
import ContactdataListing from '../components/Datamanager/ContactUsData';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import ECommerce from '../pages/Dashboard/ECommerce';
import SignIn from '../pages/Authentication/SignIn';
import ArtistListing from '../components/Artist/Listing';
import ArtistAdd from '../components/Artist/Add';
import ArtistEdit from '../components/Artist/Edit';
import CityListing from '../components/City/Listing';
import CityAdd from '../components/City/Add';
import CityEdit from '../components/City/Edit';
import LanguageListing from '../components/Language/Listing';
import LanguageAdd from '../components/Language/Add';
import LanguageEdit from '../components/Language/Edit';
import CategoryListing from '../components/Category/Listing';
import CategoryAdd from '../components/Category/Add';
import CategoryEdit from '../components/Category/Edit';
import AllEventListing from '../components/AllEvent/Listing';
import UserListing from '../components/User/Listing';
import UserEdit from '../components/User/Edit';
import AllBookingListing from '../components/AllBooking/Listing';
import PageListing from '../components/Pages/Listing';
import PageAdd from '../components/Pages/Add';
import PageEdit from '../components/Pages/Edit';
import FaqListing from '../components/FAQ/Listing';
import FaqAdd from '../components/FAQ/Add';
import FaqEdit from '../components/FAQ/Edit';
import VendorListing from '../components/Vendor/Listing';
import VendorEdit from '../components/Vendor/Edit';
import VendorBooking from '../components/Vendor/Booking';
import VendorKyc from '../components/Vendor/Kyc';
import EventListing from '../components/Vendor/EventListing';
import EventEdit from '../components/Vendor/EventEdit';
import OfferListing from '../components/Offer/Listing';
import OfferAdd from '../components/Offer/Add';
import OfferEdit from '../components/Offer/Edit';
import AllBookingView from '../components/AllBooking/BookingView';
import VendorIdBooking from '../components/Vendor/VendorIdBooking';
import UserIdBooking from '../components/User/Booking';
import AllBooking from '../components/Datamanager/AllBooking';
import NewsletterListing from '../components/Datamanager/Newslatter';
import CountryEdit from '../components/Country/Edit';
import CountryAdd from '../components/Country/Add';
import CountryListing from '../components/Country/Listing';
import AllEventView from '../components/AllEvent/AllEventView';
import OrderBookingView from '../components/Vendor/OrderBookingView';
import OrderBookingViewUser from '../components/User/OrderBookingViewUser';
import AllBookingViewInVendor from '../components/Vendor/AllBookingView';
import NoDataFound from '../common/Loader/NoDataFound';
import Coupan from '../components/Vendor/Coupan';

const coreRoutes = [
  {
    path: '/*',
    title: 'No Page',
    component: NoDataFound,
  },
  {
    path: '/login',
    title: 'Login',
    component: SignIn,
  },
  {
    path: '/profile', //Profile
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/dashboard', //dashboard
    title: 'dashboard',
    component: ECommerce,
  },
  {
    path: '/settings', //Setting
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/contact/edit',
    component: Contactsetting,
  },
  {
    path: '/social/edit',
    component: Socialsetting,
  },
  {
    path: '/site/edit',
    component: Sitesetting,
  },

  // =================slider=============
  {
    path: '/slider/listing',
    component: SliderListing,
  },
  {
    path: '/slider/add',
    component: SliderAdd,
  },
  {
    path: '/slider/edit/:Id',
    component: SliderEdit,
  },

  // =================Location Manager=============

  // ----------City-------------
  {
    path: '/city/listing',
    component: CityListing,
  },
  {
    path: '/city/add',
    component: CityAdd,
  },
  {
    path: '/city/edit/:Id',
    component: CityEdit,
  },
  // ----------State-------------
  {
    path: '/country/listing',
    component: CountryListing,
  },
  {
    path: '/country/add',
    component: CountryAdd,
  },
  {
    path: '/country/edit/:Id',
    component: CountryEdit,
  },

  // ================Page======================
  {
    path: '/page/listing',
    component: PageListing,
  },
  {
    path: '/page/add',
    component: PageAdd,
  },
  {
    path: '/page/edit/:Id',
    component: PageEdit,
  },
  // ================Artist======================
  {
    path: '/artist/listing',
    component: ArtistListing,
  },
  {
    path: '/artist/add',
    component: ArtistAdd,
  },
  {
    path: '/artist/edit/:Id',
    component: ArtistEdit,
  },
  // ================Offer======================
  {
    path: '/offer/listing',
    component: OfferListing,
  },
  {
    path: '/offer/add',
    component: OfferAdd,
  },
  {
    path: '/offer/edit/:Id',
    component: OfferEdit,
  },
  // ================language======================
  {
    path: '/language/listing',
    component: LanguageListing,
  },
  {
    path: '/language/add',
    component: LanguageAdd,
  },
  {
    path: '/language/edit/:Id',
    component: LanguageEdit,
  },

  // ================Faq======================
  {
    path: '/faq/listing',
    component: FaqListing,
  },
  {
    path: '/faq/add',
    component: FaqAdd,
  },
  {
    path: '/faq/edit/:Id',
    component: FaqEdit,
  },
  // ================Category======================
  {
    path: '/category/listing',
    component: CategoryListing,
  },
  {
    path: '/category/add',
    component: CategoryAdd,
  },
  {
    path: '/category/edit/:Id',
    component: CategoryEdit,
  },
  // ================AllEvent======================
  {
    path: '/allevent/listing',
    component: AllEventListing,
  },
  {
    path: '/allevent/view/:UserId/:Id',
    component: AllEventView,
  },

  // ================User======================
  {
    path: '/user/listing',
    component: UserListing,
  },
  {
    path: '/user/edit/:Id',
    component: UserEdit,
  },
  {
    path: '/user/booking/:Id',
    component: UserIdBooking,
  },
  {
    path: '/user/booking/:Id/:OrderId',
    component: OrderBookingViewUser,
  },
  // ================Vendor======================
  {
    path: '/vendor/listing',
    component: VendorListing,
  },
  {
    path: '/vendor/edit/:Id',
    component: VendorEdit,
  },
  {
    path: '/vendor/booking/:Id',
    component: VendorIdBooking,
  },
  {
    path: '/vendor/booking/:Id/:OrderId',
    component: AllBookingViewInVendor,
  },
  {
    path: '/vendor/event/listing/:Id',
    component: EventListing,
  },
  {
    path: '/vendor/event/edit/:UserId/:Id',
    component: EventEdit,
  },
  {
    path: '/vendor/event/bookings/:Id',
    component: VendorBooking,
  },
  {
    path: '/vendor/event/bookings/:Id/:OrderId',
    component: OrderBookingView,
  },
  {
    path: '/vendor/kyc/:Id',
    component: VendorKyc,
  },
  {
    path: '/vendor/coupan/listing/:Id',
    component: Coupan,
  },

  // ================All Bookung======================
  {
    path: '/allbooking/listing',
    component: AllBookingListing,
  },
  {
    path: '/allbooking/view/:Id',
    component: AllBookingView,
  },

  // ================Data Manager======================
  {
    path: '/newsletter/listing',
    component: NewsletterListing,
  },
  {
    path: '/contactusdata/listing',
    component: ContactdataListing,
  },
  {
    path: '/booking/listing',
    component: AllBooking,
  },
];

const routes = [...coreRoutes];
export default routes;
