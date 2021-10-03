import tasksImage from '../../images/tasks.svg';
const Empty = () => {
  return (
    <div className="text-center container my-5">
      <img
        src={tasksImage}
        alt="Tasks Illustration"
        className="img-fluid illustration-image"
      />
      <h3 className="text-secondary my-5 fw-normal">No Tasks Found!</h3>
    </div>
  );
};

export default Empty;
