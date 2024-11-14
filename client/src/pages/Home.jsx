import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { getAllProducts } from "../features/products/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getAllProducts());
  }, [dispatch]);

  const blogState = useSelector((state) => state.blog.blogs);
  const productState = useSelector((state) => state.product.products);

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-6">
            <div className="main-banner p-3 position-relative">
              <img
                src="/images/main-banner-1.jpg"
                alt="banner-1"
                className="img-fluid rounded-3"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 pr $41.62/mo.</p>
                <Link className="button">BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-10">
              <div className="small-banner position-relative p-3">
                <img
                  src="/images/catbanner-01.jpg"
                  alt="banner-1"
                  className="img-fluid rounded-3"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Best sale.</h4>
                  <h5>Laptops Max</h5>
                  <p>From $19600.00 or$64.62/mo</p>
                </div>
              </div>
              <div className="small-banner position-relative p-3">
                <img
                  src="/images/catbanner-02.jpg"
                  alt="banner-2"
                  className="img-fluid rounded-3"
                />
                <div className="small-banner-content position-absolute">
                  <h4>15% Off.</h4>
                  <h5>Smartwatch 7</h5>
                  <p>
                    Shop the latest band <br /> styles and colors
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative p-3">
                <img
                  src="/images/catbanner-03.jpg"
                  alt="banner-3"
                  className="img-fluid rounded-3"
                />
                <div className="small-banner-content position-absolute">
                  <h4>New arrival.</h4>
                  <h5>Buy iPad Air</h5>
                  <p>From $599 or $49.91/mo.</p>
                </div>
              </div>
              <div className="small-banner position-relative p-3">
                <img
                  src="/images/catbanner-04.jpg"
                  alt="banner-4"
                  className="img-fluid rounded-3"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Free engraving.</h4>
                  <h5>AirPods Max</h5>
                  <p>
                    High fidelity, playback & <br />
                    ultra-low distortion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services.map((service) => (
                <div
                  className="d-flex align-items-center gap-15"
                  key={service.id}
                >
                  <img src={service.image} alt={service.title} />
                  <div>
                    <h6>{service.title}</h6>
                    <p className="mb-0">{service.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between align-items-center flex-wrap">
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Computers & Laptops</h6>
                  <p>8 Items</p>
                </div>
                <img src="images/laptop.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Cameras & Videos</h6>
                  <p>8 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Smart Television</h6>
                  <p>12 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/watch-1.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/gaming.jpg" alt="gaming" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Mobiles & Tablets</h6>
                  <p>5 Items</p>
                </div>
                <img src="images/phone.jpg" alt="phone" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Headphones</h6>
                  <p>6 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="headphone" />
              </div>
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Accessories</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/acc.jpg" alt="accessory" />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="featured-wrapper">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          {productState &&
            productState?.slice(0, 4).map((product) => {
              if (product?.tags == "featured") {
                return <ProductCard key={product?._id} product={product} />;
              }
            })}
        </div>
      </Container>
      <Container className="famous-wrapper">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/tab.jpg" alt="famous" className="img-fluid" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Big Screen</h5>
                <h6 className="text-dark">Smart Watch Series 7</h6>
                <p className="text-dark">From $399 or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/tab1.jpg" alt="famous" className="img-fluid" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Studio Display</h5>
                <h6 className="text-dark">600 nits of brightness</h6>
                <p className="text-dark">27-inch 5k Retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/tab2.jpg" alt="famous" className="img-fluid" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Smartphones</h5>
                <h6 className="text-dark">Smartphone 13 Pro.</h6>
                <p className="text-dark">
                  Now in Green.From $999.00 or $41.62/mo. for 24 mo. Footnote*
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/tab3.jpg" alt="famous" className="img-fluid" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Home Speakers</h5>
                <h6 className="text-dark">Room-filling sound</h6>
                <p className="text-dark">
                  From $699 or $116.58/mo. for 12 mo.*
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="special-wrapper">
        <div className="row">
          <div className="col-12">
            <h3 className="special-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.slice(0, 4).map((product) => {
              if (product?.tag == "Special") {
                return <SpecialProduct key={product?._id} product={product} />;
              }
            })}
        </div>
      </Container>
      <Container className="popular-wrapper">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.slice(1, 5).map((product) => {
              if (product?.tag == "Popular") {
                return <ProductCard key={product?._id} product={product} />;
              }
            })}
        </div>
      </Container>
      <Container className="marquee-wrapper">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container className="blog-wrapper">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          {blogState &&
            blogState.slice(0, 4).map((blog) => (
              <div className="col-3" key={blog?._id}>
                <BlogCard blog={blog} />
              </div>
            ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
