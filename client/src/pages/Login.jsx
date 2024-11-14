import * as yup from "yup";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { loginUser } from "../features/user/userSlice";
import { useEffect } from "react";

const loginSchema = yup.object().shape({
  email: yup.string().nullable().email("Email should be valied"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const authState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (authState?.user !== null && authState?.isError === false) {
      navigate("/");
    }
  }, [navigate, authState]);

  return (
    <>
      <Meta title="Login" />
      <Breadcrumb title="Login" />
      <Container className="login-wrapper">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form
                className="d-flex flex-column gap-15"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <CustomInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur("email")}
                    onChange={formik.handleChange("email")}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div className="mt-1">
                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur("password")}
                    onChange={formik.handleChange("password")}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div>
                  <Link to="/forgot-password">Forgot password?</Link>
                  <div className="mt-3 d-flex justify-content-around gap-10">
                    <button className="button" type="submit">
                      Login
                    </button>
                    <Link className="button signup" to="/signup">
                      Signup
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
