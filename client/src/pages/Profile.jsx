import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useFormik } from "formik";
import { updateUser } from "../features/user/userSlice";
import Meta from "../components/Meta";
import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/Container";
import { FiEdit } from "react-icons/fi";
import CustomInput from "../components/CustomInput";

const profileSchema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().nullable().email("Email should be valied"),
  mobile: yup.string().required("Phone number is required"),
});

const Profile = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const userState = useSelector((state) => state.user.user);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateUser(values));
      setEdit(false);
    },
  });

  return (
    <>
      <Meta title="My Profile" />
      <Breadcrumb title="My Profile" />
      <Container className="profile-wrapper">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="my-3">{edit ? "Update" : "My"} Profile</h3>
              <FiEdit
                className="fs-3 cursor-pointer"
                onClick={() => setEdit(true)}
              />
            </div>
          </div>
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex flex-column gap-10">
                <label htmlFor="firstname">Firstname</label>
                <CustomInput
                  name="firstname"
                  value={formik.values.firstname}
                  onBlur={formik.handleBlur("firstname")}
                  onChange={formik.handleChange("firstname")}
                  disabled={!edit}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
              </div>
              <div className="d-flex flex-column gap-10">
                <label htmlFor="lastname">Lastname</label>
                <CustomInput
                  name="lastname"
                  value={formik.values.lastname}
                  onBlur={formik.handleBlur("lastname")}
                  onChange={formik.handleChange("lastname")}
                  disabled={!edit}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
              </div>
              <div className="d-flex flex-column gap-10">
                <label htmlFor="email">Email Address</label>
                <CustomInput
                  name="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur("email")}
                  onChange={formik.handleChange("email")}
                  disabled={!edit}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className="d-flex flex-column gap-10">
                <label htmlFor="mobile">Phone number</label>
                <CustomInput
                  name="mobile"
                  value={formik.values.mobile}
                  onBlur={formik.handleBlur("mobile")}
                  onChange={formik.handleChange("mobile")}
                  disabled={!edit}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
              </div>
              {edit && (
                <button className="button my-2" type="submit">
                  Update Profile
                </button>
              )}
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
