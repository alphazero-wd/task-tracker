const DateTime = () => {
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div>
      <h4>My Day</h4>
      <small className="mt-1">
        {`${weekdays[new Date().getDay()]}, ${
          months[new Date().getMonth()]
        } ${new Date().getDate()}`}
      </small>
    </div>
  );
};

export default DateTime;
