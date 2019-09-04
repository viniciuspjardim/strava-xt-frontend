import Home from './components/Home';
import Auth from './components/Auth';
import Activities from './components/activities/Activities';
import Activity from './components/activities/Activity';
import GearCalculator from './components/GearCalculator';
import Map from './components/maps/Map';

export const routes = [
  { path: '', component: Home },
  { path: '/auth', component: Auth },
  { path: '/activities', component: Activities },
  { path: '/activities/:id', component: Activity },
  { path: '/gear', component: GearCalculator },
  { path: '/map', component: Map },
  { path: '*', redirect: '/' }
];