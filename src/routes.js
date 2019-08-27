import Home from './components/Home';
import Activities from './components/activities/Activities';
import Activity from './components/activities/Activity';
import GearCalculator from './components/GearCalculator';
import Map from './components/maps/Map';

export const routes = [
  { path: '', component: Home },
  { path: '/activities', component: Activities },
  { path: '/activities/:id', component: Activity },
  { path: '/gear', component: GearCalculator },
  { path: '/map', component: Map }
];