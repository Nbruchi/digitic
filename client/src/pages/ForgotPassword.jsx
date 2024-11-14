import * as yup from "yup";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { forgotPasswordToken } from "../features/user/userSlice";

const emailSchema = yup.object().shape({
  email: yup.string().nullable().email("Email should be valied"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(forgotPasswordToken(values));
    },
  });

  return (
    <>
      <Meta title="Forgot Password" />
      <Breadcrumb title="Forgot Password" />
      <Container className="forgot-password-wrapper">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <p className="text-center my-2">
                We will send you an email to reset your password
              </p>
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
                  <div className="error text-center">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>

                <div>
                  <div className="mt-3 d-flex flex-column justify-content-center align-items-center gap-10">
                    <button className="button" type="submit">
                      Submit
                    </button>
                    <Link to="/login">Cancel</Link>
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

export default ForgotPassword;
