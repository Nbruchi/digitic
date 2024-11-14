import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsInstagram, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="/images/newsletter.png" alt="newsletter" />
                <h2 className="mb-0 text-white">Signup for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Addres"
                  aria-describedby="basic-addon"
                />
                <span className="input-group-text p-3" id="basic-addon">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  Hno: 277 Near Vill Chopal, <br /> Sonipat,Haryana, <br />
                  PinCode:131103
                </address>
                <a
                  href="tel:+918264954232"
                  className="mt-4 d-block mb-2 text-white"
                >
                  +91 8264954232
                </a>
                <a
                  href="mailto:navdeepdahiya277@gmail.com"
                  className="mt-4 d-block mb-2 text-white"
                >
                  navdeepdahiya277.gmail.com
                </a>
                <div className="social-icons d-flex gap-10 align-items-center mt-4">
                  <a href="#" className="text-white">
                    <BsFacebook />
                  </a>
                  <a href="#" className="text-white">
                    <BsInstagram />
                  </a>
                  <a href="#" className="text-white">
                    <BsGithub />
                  </a>
                  <a href="#" className="text-white">
                    <BsYoutube />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/privacy-policy" className="text-white py-2 mb-1">
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1">
                  Refund Policy
                </Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1">
                  Shipping Policy
                </Link>
                <Link to="/terms-conditions" className="text-white py-2 mb-1">
                  Terms of Service
                </Link>
                <Link to="/blogs" className="text-white py-2 mb-1">
                  Blogs
                </Link>
              </div>
              <div></div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="#" className="text-white py-2 mb-1">
                  Search
                </Link>
                <Link to="/about" className="text-white py-2 mb-1">
                  About Us
                </Link>
                <Link to="#" className="text-white py-2 mb-1">
                  FAQ
                </Link>
                <Link to="/contact" className="text-white py-2 mb-1">
                  Contact
                </Link>
                <Link to="#" className="text-white py-2 mb-1">
                  Size chart
                </Link>
              </div>
              <div></div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="#" className="text-white py-2 mb-1">
                  Laptops
                </Link>
                <Link to="#" className="text-white py-2 mb-1">
                  Headphones
                </Link>
                <Link to="#" className="text-white py-2 mb-1">
                  Tablets
                </Link>
                <Link to="#" className="text-white py-2 mb-1">
                  Accessories
                </Link>
                <Link to="#" className="text-white py-2 mb-1">
                  Watches
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Powered by Developer&apos;s
                Corner
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
