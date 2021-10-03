import { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { clearError, loginUser, signin, signup } from '../../reducers/user';
import Alert from '../../components/Main/Alert';
const Auth = ({ alert, setAlert }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { error } = useSelector((state) => state.user);
  const location = useLocation();
  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();
  const onSuccess = async (res) => {
    try {
      const { profileObj: profile, tokenId: token } = res;
      dispatch(loginUser({ profile, token }));
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) =>
    setFormValue({ ...formValue, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      if (isSignUp) {
        dispatch(signup(formValue));
      } else {
        dispatch(signin(formValue));
      }
    }
  };

  useEffect(() => {
    if (error) {
      setAlert({
        message: error,
        color: 'danger',
        isShown: true,
      });
      setFormValue({ ...formValue, password: '', confirmPassword: '' });
    }
    return () => dispatch(clearError());
  }, [error]);

  // prevent alert bugs
  useEffect(
    () =>
      setAlert({
        message: '',
        isShown: false,
        color: '',
      }),
    [location]
  );

  const onFailure = () => console.log('Google Sign In Failed. Try Again!');

  return (
    <div
      className="container rounded shadow my-5 p-3"
      style={{ maxWidth: '500px' }}
    >
      <h4 className=" text-center my-3">
        {isSignUp ? 'Sign Up Today' : 'Sign In Your Account'}
      </h4>
      <form className="my-4" onSubmit={onSubmit}>
        {alert.isShown && <Alert alert={alert} setAlert={setAlert} />}
        {isSignUp && (
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control my-3 my-md-0"
                name="firstName"
                placeholder="First Name"
                value={formValue.firstName}
                onChange={onChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Last Name"
                value={formValue.lastName}
                onChange={onChange}
                required
              />
            </div>
          </div>
        )}
        <input
          type="email"
          name="email"
          className="form-control my-3"
          placeholder="Email"
          value={formValue.email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          className="form-control my-3"
          placeholder="Password"
          value={formValue.password}
          onChange={onChange}
          required
        />
        {isSignUp && (
          <input
            type="password"
            name="confirmPassword"
            className="form-control my-3"
            placeholder="Confirm Password"
            value={formValue.confirmPassword}
            onChange={onChange}
            required
          />
        )}
        <button type="submit" className="btn btn-outline-primary w-100 my-3">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <GoogleLogin
          clientId="945529982323-8nf3p4rfkuhnej1pnmsnmlf59nr5nh32.apps.googleusercontent.com"
          onSuccess={onSuccess}
          onFailure={onFailure}
          render={(renderProps) => (
            <button
              className="btn btn-outline-danger w-100"
              onClick={renderProps.onClick}
            >
              <i className="bi bi-google me-3"></i>
              Sign In With Google
            </button>
          )}
        />
        <div className="text-center my-3">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Link
            to="/auth"
            className="text-primary text-decoration-none"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Auth;
