import { Link, useNavigate } from 'react-router-dom';
import LogoDark from '../../images/mainlogo.png';
import Logo from '../../images/mainlogo.png';
import { FaEnvelope, FaKey } from 'react-icons/fa6';
import { useState } from 'react';
import * as yup from 'yup';
import { AdminLogin } from '../../API/AdminApi';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import FormLoader from '../../common/Loader/FormLoader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const validationSchema = yup.object().shape({
  Email: yup.string().required('Email is required'),
  Password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const [loginbutton, setloginbutton] = useState(false);
  const navigate = useNavigate();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      Email: '',
      Password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setloginbutton(true);
      setIsFormLoading(true);
      try {
        await AdminLogin(values);
        const sessiondata = sessionStorage.getItem('logindata');
        const parsedSessionData = sessiondata ? JSON.parse(sessiondata) : null;
        const token = parsedSessionData?.token;

        if (token) {
          navigate('/dashboard');
          window.location.reload();
        } else {
          throw new Error('Invalid email or password');
        }
      } catch (error) {
        setloginbutton(false);
      } finally {
        setIsFormLoading(false); // Set loading state to false when submission ends
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {isFormLoading && <FormLoader loading={isFormLoading} />}
      <div className="rounded-sm border my-[9%] border-stroke container mx-auto bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 text-center">
              <Link className="mb-5.5 inline-block" to="/dashboard">
                <img
                  className="hidden dark:block w-[50%] mx-auto"
                  src={Logo}
                  alt="Logo"
                />
                <img
                  className="dark:hidden w-[50%] mx-auto"
                  src={LogoDark}
                  alt="Logo"
                />
              </Link>
              <p className="2xl:px-20 py-10 text-5xl">Love My Show</p>
            </div>
          </div>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white text-center sm:text-title-xl2">
                Sign In
              </h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="Email"
                      onChange={formik.handleChange}
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <span className="absolute right-4 top-4 fill-current">
                      <FaEnvelope />
                    </span>
                    {formik.touched.Email && formik.errors.Email && (
                      <small className="text-red-500">
                        {formik.errors.Email}
                      </small>
                    )}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="Password"
                      onChange={formik.handleChange}
                      placeholder="Enter Password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <span
                      className="absolute right-4 top-4"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>

                    {formik.touched.Password && formik.errors.Password && (
                      <small className="text-red-500">
                        {formik.errors.Password}
                      </small>
                    )}
                  </div>
                </div>
                <div className="mb-5">
                  <input
                    type="submit"
                    value={loginbutton ? 'Loading...' : 'Sign In'}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
