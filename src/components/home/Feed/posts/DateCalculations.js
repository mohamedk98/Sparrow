import moment from 'moment';

let dateCalcFunction = date => {
  return moment(new Date(date).getTime(), true).fromNow();
};

export default dateCalcFunction;
