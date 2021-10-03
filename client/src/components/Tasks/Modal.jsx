import { useDispatch } from 'react-redux';
import { deleteTask } from '../../reducers/tasks';

const Modal = ({ id, setAlert }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex="-1"
      aria-labelledby="deleteModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModal">
              Delete Confirmation
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete the task?
          </div>
          <div className="modal-footer d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() => {
                dispatch(deleteTask(id));
                setAlert({
                  message: 'Task Removed!',
                  color: 'danger',
                  isShown: true,
                });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
