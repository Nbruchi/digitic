import * as yup from "yup";
import { useFormik } from "formik";
import Meta from "../components/Meta";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { registerUser } from "../features/user/userSlice";
import { useEffect } from "react";

const signupSchema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().nullable().email("Email should be valied"),
  mobile: yup.string().required("Phone number is required"),
  password: yup.string().required("Password is required"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
      toast.success("User created successfully!");
    },
  });

  useEffect(() => {
    if (authState?.createdUser !== null && authState?.isError === false) {
      navigate("/login");
    }
  }, [navigate, authState]);

  return (
    <>
      <Meta title="Signup" />
      <Breadcrumb title="Signup" />
      <Container className="signup-wrapper">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Register Account</h3>
              <form
                className="d-flex flex-column gap-15"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <CustomInput
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={formik.values.firstname}
                    onBlur={formik.handleBlur("firstname")}
                    onChange={formik.handleChange("firstname")}
                  />
                  <div className="error">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>
                <div>
                  <CustomInput
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formik.values.lastname}
                    onBlur={formik.handleBlur("lastname")}
                    onChange={formik.handleChange("lastname")}
                  />
                  <div className="error">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>
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
                <div>
                  <CustomInput
                    type="tel"
                    name="mobile"
                    placeholder="Phone Number"
                    value={formik.values.mobile}
                    onBlur={formik.handleBlur("mobile")}
                    onChange={formik.handleChange("mobile")}
                  />
                  <div className="error">
                    {formik.touched.mobile && formik.errors.mobile}
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
                    {formik.touched.password && formik.errors.password}
                  </div>
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-around gap-10">
                    <button className="button" type="submit">
                      Signup
                    </button>
                    <Link className="button signup" to="/login">
                      Login
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

export default Signup;
