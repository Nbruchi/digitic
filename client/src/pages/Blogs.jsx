import BlogCard from "../components/BlogCard";
import Breadcrumb from "../components/Breadcrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { useEffect } from "react";

const Blogs = () => {
  const dispatch = useDispatch();
  const getBlogs = () => dispatch(getAllBlogs());

  useEffect(() => {
    getBlogs();
  }, []);

  const blogState = useSelector((state) => state.blog.blogs);

  return (
    <>
      <Meta title="Blogs" />
      <Breadcrumb title="Blogs" />
      <Container className="blog-wrapper">
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
            <div className="row">
              {blogState ? (
                <>
                  {blogState.map((blog) => (
                    <div className="col-6" key={blog?._id}>
                      <BlogCard blog={blog} />
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-center fs-3">No blogs</p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blogs;
