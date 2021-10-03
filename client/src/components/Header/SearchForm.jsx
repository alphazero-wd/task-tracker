import { useState } from 'react';
import { useSelector } from 'react-redux';
const SearchForm = ({ onChange }) => {
  const [showSearchTasks, setShowSearchTasks] = useState(false);
  return (
    <form className="d-flex my-3 my-lg-0" onSubmit={(e) => e.preventDefault()}>
      <div className="input-group">
        {showSearchTasks && (
          <input
            type="text"
            name="searchValue"
            onChange={onChange}
            className="form-control w-50"
            placeholder="Search"
          />
        )}
        <button
          className="btn btn-success input-group-text"
          onClick={() => setShowSearchTasks(!showSearchTasks)}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
