const ReactionClassHandler = (name, setReactClass) => {
  let className = 'font-bold timepicker-clock-animation ';

  switch (name) {
    case 'Like':
      className += 'text-facebook-blue';
      break;

    case 'Love':
      className += 'text-red-500';
      break;

    case 'Care':
    case 'Haha':
    case 'Wow':
    case 'Sad':
      className += 'text-yellow-400';
      break;

    case 'Angry':
      className += 'text-rose-500';
      break;

    default:
      className = '';
      break;
  }

  return setReactClass(className);
};

export default ReactionClassHandler;
