/* eslint-disable react/prop-types */
import moment from "moment";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img
          src={blog?.images[0]?.url || "images/blog-1.jpg"}
          alt="blog"
          className="img-fluid object-fit-cover"
        />
      </div>
      <div className="blog-content">
        <p className="date">
          {moment(blog?.createdAt).format("MMMM Do YYYY, h:mm a")}
        </p>
        <h5 className="title">{`${blog?.title.substr(0, 30)}...`}</h5>
        <p
          className="desc"
          dangerouslySetInnerHTML={{
            __html: `${blog?.description.substr(0, 70)}...`,
          }}
        ></p>
        <Link to={`/blogs/${blog?._id}`} className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
