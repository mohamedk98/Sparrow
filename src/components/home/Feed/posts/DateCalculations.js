import moment from 'moment';

let dateCalcFunction = date => {
  // console.log(moment(new Date(date).getTime()).fromNow());
  return moment(new Date(date).getTime(), true).fromNow();
};

export default dateCalcFunction;
