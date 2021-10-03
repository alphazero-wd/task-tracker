const Alert = ({ alert }) => {
  return (
    <div role="alert" className={`alert alert-${alert.color} my-3`}>
      {alert.message}
    </div>
  );
};

export default Alert;
