import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { logoutUser } from '../../reducers/user';
import SearchForm from './SearchForm';
const Navbar = ({ onChange }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    localStorage.setItem('user', JSON.stringify(user));
  }, [location, user]);

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid px-3 px-lg-5">
        <div className="d-flex justify-content-center align-items-center">
          <Link to="/" className="navbar-brand">
            To Do
          </Link>
          {user && <SearchForm onChange={onChange} />}
        </div>
        {user ? (
          <>
            <div className="d-flex justify-content-center align-items-center ">
              <div class="btn-group">
                {user?.profile?.imageUrl ? (
                  <img
                    src={user?.profile?.imageUrl}
                    className="cursor-pointer profile-img"
                    data-bs-toggle="dropdown"
                    alt={user?.profile?.name}
                  />
                ) : (
                  <button
                    type="button"
                    className="btn btn-white profile-img border rounded-circle border-white d-flex justify-content-center align-items-center text-white fs-5"
                    data-bs-toggle="dropdown"
                  >
                    {user?.profile?.name[0]}
                  </button>
                )}
                <div className="dropdown-menu dropdown-menu-end mx-3">
                  <div className="dropdown-item fs-6">
                    {user?.profile?.name}
                  </div>
                  <div className="text-secondary dropdown-item">
                    {user?.profile?.email}
                  </div>
                  <hr className="mx-3" />
                  <button className="btn dropdown-item" onClick={logout}>
                    <i className="bi bi-box-arrow-left me-2"></i> Logout
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Link className="btn btn-success" to="/auth">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
