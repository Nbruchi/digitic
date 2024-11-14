import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paginate, setPaginate] = useState(false);
  const authState = useSelector((state) => state.user);
  const [totalAmount, setTotalAmount] = useState(null);
  const [productOption, setProductOption] = useState([]);
  const cartState = useSelector((state) => state.user.cartProducts);
  const productState = useSelector((state) => state.product.products);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index]?.quantity) * cartState[index]?.price;
    }
    setTotalAmount(sum);
  }, [cartState]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, product: element?._id, name: element?.title });
    }
    setProductOption(data);
  }, [productState]);

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:{" "}
                <a href="tel:+91 8264954234" className="text-white">
                  +91 8264954234
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl align-items-center">
          <div className="row">
            <div className="col-2">
              <h1>
                <Link to="/" className="text-white">
                  Digitic
                </Link>
              </h1>
            </div>
            <div className="col-6">
              <div className="input-group mb-3">
                <Typeahead
                  paginate={paginate}
                  labelKey="name"
                  options={productOption}
                  id="pagination-example"
                  placeholder="Search for products here"
                  onPaginate={() => setPaginate((prev) => !prev)}
                  onChange={(selected) =>
                    navigate(`/products/${selected[0]?.product}`)
                  }
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-4">
              <div className="header-upper-links d-flex align-item-center gap-3">
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/wishlist.svg" alt="wishlist" />
                    <p className="mb-0">
                      Favorite <br />
                      Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user !== null ? "/profile" : "/login"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/user.svg" alt="user" />
                    {authState?.user !== null ? (
                      <p className="mb-0">
                        Welcome, <br /> {authState?.user?.firstname}
                      </p>
                    ) : (
                      <p className="mb-0">
                        Login <br />
                        My account
                      </p>
                    )}
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/cart.svg" alt="cart" />
                    <div className="d-flex flex-column">
                      <span className="badge bg-white text-dark">
                        {cartState?.length}
                      </span>
                      <p className="mb-0">$ {totalAmount}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-15 align-items-center"
                      type="button"
                      id="dropDownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="/images/menu.svg" alt="menu" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropDownMenuButton"
                    >
                      <li>
                        <Link to="#" className="dropdown-item text-white">
                          Laptops
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item text-white">
                          Watches
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item text-white">
                          Phones
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item text-white">
                          Books
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item text-white">
                          Dresses
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/store">Our store</NavLink>
                    <NavLink to="/orders">My Orders</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="border border-0 bg-transparent text-white text-uppercase"
                    >
                      logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
