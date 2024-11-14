import * as yup from "yup";
import { useFormik } from "formik";
import Meta from "../components/Meta";
import { useDispatch } from "react-redux";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import CustomInput from "../components/CustomInput";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { createEnquiry } from "../features/enquiries/enquirySlice";

const contactSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .nullable()
    .email("Email must be valid")
    .required("Email is required"),
  mobile: yup.string().required("Mobile is required"),
  comment: yup.string().nullable().required("Comment is required"),
});

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createEnquiry(values));
      formik.resetForm();
    },
  });

  return (
    <>
      <Meta title="Contact" />
      <Breadcrumb title="Contact" />
      <Container className="contact-wrapper">
        <div className="row">
          <div className="col-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m!18!1m12!1m3!1d6986.771103663534!2d76.99275607711007!3d28.886888929272477!2m3!1f0!2f0!3f0!3m2!1i24!"
              width="600"
              height="450"
              className="border-0 w-100 rounded-3"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between">
              <div>
                <h3 className="contact-title mb-4">Contact</h3>
                <form
                  className="d-flex flex-column gap-10"
                  onSubmit={formik.handleSubmit}
                >
                  <div>
                    <CustomInput
                      name="name"
                      type="text"
                      placeholder="Name"
                      value={formik.values.name}
                      onBlur={formik.handleBlur("name")}
                      onChange={formik.handleChange("name")}
                    />
                    <div className="error">
                      {formik.touched.name && formik.errors.name}
                    </div>
                  </div>
                  <div>
                    <CustomInput
                      name="email"
                      type="email"
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
                      placeholder="Mobile Number"
                      value={formik.values.mobile}
                      onBlur={formik.handleBlur("mobile")}
                      onChange={formik.handleChange("mobile")}
                    />
                    <div className="error">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>
                  <div>
                    <textarea
                      rows="4"
                      cols="30"
                      placeholder="Enter your comments"
                      value={formik.values.comment}
                      className="w-100 form-control"
                      onBlur={formik.handleBlur("comment")}
                      onChange={formik.handleChange("comment")}
                    ></textarea>
                    <div className="error">
                      {formik.touched.comment && formik.errors.comment}
                    </div>
                  </div>
                  <div>
                    <button className="button" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4">Get in touch with us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineHome className="fs-5" />
                      <address className="mb-0">
                        Hno:277, near villate Chopal,Mandaura,Sonipat,Haryana
                      </address>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiPhoneCall className="fs-5" />
                      <a href="tel:+91 8264954234">+91 8264954234</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineMail className="fs-5" />
                      <a href="mailto:navdeepdahiya277@gmail.com">
                        navdeepdahiya277.gmail.com
                      </a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiInfoCircle className="fs-5" />
                      <p className="mb-0">Monday - Friday | 10AM - 8PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
