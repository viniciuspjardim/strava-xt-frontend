import moment from 'moment';
import numeral from 'numeral';

/** Recive data and trans */
export const dataFormat = {
  data() {
    return {
      usrVelUnit: 'km/h',
      apiVelUnit: 'm/s',
      usrDistanceUnit: 'km',
      apiDistanceUnit: 'm',
      usrTimeUnit: 'h',
      apiTimeUnit: 's',

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
    distanceToUsr(value, unit) {
      if(!unit) {
        unit = this.usrDistanceUnit;
      }
      if(unit == 'km') {
        return `${this.numberToUsr(value / 1000)} km`;
      }
    },
    dateToUsr(value, mask) {
      if(!mask) {
        mask = this.usrDateMask;
      }
      return moment(new Date(value)).format(mask);
    },
    numberToUsr(value, mask) {
      if(!mask) {
        mask = this.usrNumberMask;
      }
      return numeral(value).format(mask);
    }
  }
}