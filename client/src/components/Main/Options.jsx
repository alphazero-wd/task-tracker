const Options = ({ onChange }) => {
  return (
    <form className="d-sm-flex my-3 my-lg-0 justify-content-lg-center align-items-center">
      <div className="d-flex justify-content-center align-items-center me-3">
        <label htmlFor="filterValue" className="me-2">
          Filter:{' '}
        </label>
        <select
          name="filterValue"
          onChange={onChange}
          className="form-select my-3 my-sm-0"
        >
          <option value="1">All Tasks</option>
          <option value="2">Important Tasks</option>
          <option value="3">Completed Tasks</option>
          <option value="4">Incompleted Tasks</option>
        </select>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <label htmlFor="sortValue" className="me-2">
          Sort:{' '}
        </label>
        <select name="sortValue" onChange={onChange} className="form-select">
          <option value="1">Alphabet (A - Z)</option>
          <option value="2">Alphabet (Z - A)</option>
          <option value="3">Creation Date</option>
        </select>
      </div>
    </form>
  );
};

export default Options;
