const ReactionClassHandler = (name, setReactClass,t) => {
  let className = 'font-bold timepicker-clock-animation ';

  switch (name) {
    case 'Like':
      case 'اعجبنى':
      className += 'text-indigo-500';
      break;

    case 'Love':
      case 'احببته':
      className += 'text-red-500';
      break;

    case 'Care':
    case 'ادعمه':
    case 'Haha':
    case 'هاهاها':
    case 'Wow':
    case 'واااو':
    case 'Sad':
    case 'احزننى':
      className += 'text-yellow-400';
      break;

    case 'Angry':
    case 'اغضبنى':
      className += 'text-rose-500';
      break;

    default:
      className = '';
      break;
  }

  return setReactClass(className);
};

export default ReactionClassHandler;
