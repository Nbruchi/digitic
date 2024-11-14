import Meta from "../components/Meta";
import Breadcrumb from "../components/Breadcrumb";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "../features/blogs/blogSlice";
import { useEffect } from "react";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const blogId = location.pathname.split("/")[2];
  const getSingleBlog = () => dispatch(getBlog(blogId));

  useEffect(() => {
    getSingleBlog();
  }, []);

  const blogState = useSelector((state) => state.blog.singleBlog);
  return (
    <div>
      <Meta title={blogState?.title} />
      <Breadcrumb title={blogState?.title} />
      <Container className="single-blog-wrapper">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop by Categories</h3>
              <div>
                <ul className="ps-0">
                  <li>Watch</li>
                  <li>TV</li>
                  <li>Camera</li>
                  <li>Laptop</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="single-blog-card">
              <h3 className="title">{blogState?.title}</h3>
              <img
                src={blogState?.images[0]?.url || "/images/blog-1.jpg"}
                alt="blog-1"
                className="img-fluid my-3 w-100 rounded-4"
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: blogState?.description,
                }}
              />
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" />
                <span>Back to Blogs</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleBlog;
