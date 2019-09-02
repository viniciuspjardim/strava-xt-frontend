import moment from 'moment';
import numeral from 'numeral';

/** Recive data and trans */
export const dataFormat = {
  data() {
    return {
      // Strava API units
      apiVelUnit: 'm/s',
      apiDistanceUnit: 'm',
      apiTimeUnit: 's',

      // App default units
      usrVelUnit: 'km/h',
      usrDistanceUnit: 'km',
      usrTimeUnit: 'h',

      // App default masks
      usrDateMask: 'DD/MM/YYYY',
      usrNumberMask: '0.0'
    };
  },
  methods: {
    velToUsr(value, unit) {
      if(!unit) {
        unit = this.usrVelUnit;
      }
      if(unit == 'km/h') {
        return `${this.numberToUsr(value * 3.6)} km/h`;
      }
      return null;
    },
    distanceToUsr(value, unit = this.usrDistanceUnit) {
      if(unit == 'km') {
        return `${this.numberToUsr(value / 1000)} km`;
      }
      return null;
    },
    dateToUsr(value, mask) {
      if(!mask) {
        mask = this.usrDateMask;
      }
      return moment(new Date(value)).format(mask);
    },
    timeToUsr(value) {
      return numeral(value).format('00:00:00');
    },
    numberToUsr(value, mask) {
      if(!mask) {
        mask = this.usrNumberMask;
      }
      return numeral(value).format(mask);
    }
  }
}