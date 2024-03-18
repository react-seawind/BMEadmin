import { lazy } from 'react';
import Contactsetting from '../components/Setting/Contactsetting';
import Socialsetting from '../components/Setting/Socialsetting';
import Sitesetting from '../components/Setting/Sitesetting';
import SliderListing from '../components/Slider/Listing';
import SliderAdd from '../components/Slider/Add';
import SliderEdit from '../components/Slider/Edit';
import QuotedataListing from '../components/Datamanager/QuoteData';
import ContactdataListing from '../components/Datamanager/ContactUsData';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import ECommerce from '../pages/Dashboard/ECommerce';
import SignIn from '../pages/Authentication/SignIn';
import ArtistListing from '../components/Artist/Listing';
import ArtistAdd from '../components/Artist/Add';
import ArtistEdit from '../components/Artist/Edit';
import CityListing from '../components/City/Listing';
import NewslatterListing from '../components/Datamanager/Newslatter';
import StateListing from '../components/State/Listing';
import StateAdd from '../components/State/Add';
import StateEdit from '../components/State/Edit';
import CityAdd from '../components/City/Add';
import CityEdit from '../components/City/Edit';
import LanguageListing from '../components/Language/Listing';
import LanguageAdd from '../components/Language/Add';
import LanguageEdit from '../components/Language/Edit';
import CategoryListing from '../components/Category/Listing';
import CategoryAdd from '../components/Category/Add';
import CategoryEdit from '../components/Category/Edit';
import AllEventListing from '../components/AllEvent/Listing';
import AllEventEdit from '../components/AllEvent/Edit';
import UserListing from '../components/User/Listing';
import UserEdit from '../components/User/Edit';
import UserAdd from '../components/User/Add';
import UserEvents from '../components/User/Events';
import UserBooking from '../components/User/Booking';
import UserKyc from '../components/User/Kyc';
import AllBookingListing from '../components/AllBooking/Listing';
import PageListing from '../components/Pages/Listing';
import PageAdd from '../components/Pages/Add';
import PageEdit from '../components/Pages/Edit';

const coreRoutes = [
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
    path: '/slider/edit',
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
    path: '/city/edit',
    component: CityEdit,
  },
  // ----------State-------------
  {
    path: '/state/listing',
    component: StateListing,
  },
  {
    path: '/state/add',
    component: StateAdd,
  },
  {
    path: '/state/edit',
    component: StateEdit,
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
    path: '/page/edit',
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
    path: '/artist/edit',
    component: ArtistEdit,
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
    path: '/language/edit',
    component: LanguageEdit,
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
    path: '/category/edit',
    component: CategoryEdit,
  },
  // ================AllEvent======================
  {
    path: '/allevent/listing',
    component: AllEventListing,
  },
  {
    path: '/allevent/edit',
    component: AllEventEdit,
  },

  // ================User======================
  {
    path: '/user/listing',
    component: UserListing,
  },
  {
    path: '/user/edit',
    component: UserEdit,
  },
  {
    path: '/user/add',
    component: UserAdd,
  },
  {
    path: '/user/events',
    component: UserEvents,
  },
  {
    path: '/user/bookings',
    component: UserBooking,
  },
  {
    path: '/user/kyc',
    component: UserKyc,
  },

  // ================All Bookung======================
  {
    path: '/allbooking/listing',
    component: AllBookingListing,
  },

  // ================Data Manager======================
  {
    path: '/newslatter/listing',
    component: NewslatterListing,
  },
  {
    path: '/contactusdata/listing',
    component: ContactdataListing,
  },
  {
    path: '/quotedata/listing',
    component: QuotedataListing,
  },
];

const routes = [...coreRoutes];
export default routes;
