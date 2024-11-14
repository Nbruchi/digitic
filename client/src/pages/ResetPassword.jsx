import * as yup from "yup";
import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import Meta from "../components/Meta";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { resetPassword } from "../features/user/userSlice";

const passwordSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = location.pathname.split("/")[2];

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(resetPassword({ token, password: values }));
    },
  });
  return (
    <>
      <Meta title="Reset Password" />
      <Breadcrumb title="Reset Password" />
      <Container className="reset-password-wrapper">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form
                className="d-flex flex-column gap-15"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur("password")}
                    onChange={formik.handleChange("password")}
                  />
                </div>

                <div>
                  <div className="mt-3 d-flex justify-content-around gap-10">
                    <button className="button" type="submit">
                      OK
                    </button>
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

export default ResetPassword;
