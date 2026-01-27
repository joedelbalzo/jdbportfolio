import { Link } from "react-router-dom";
import { blogPosts } from "./data/blogData";
import "./BlogStyles.css";

function BlogHome() {
  return (
    <div>
      <div style={{ width: "80%", margin: "0 auto", textAlign: "left", fontSize: "1rem", color: "#f5f5f5" }}>
        <h1>Joe Del Balzo's Engineering Blog.</h1>
        <p>I'm hoping this teaches me just as much as it might teach you. Enjoy. </p>
      </div>
      <div className="blog-container">
        {blogPosts.map((post) => (
          <div key={post.slug} className="blog-card">
            <Link to={`/blog/${post.slug}`}>
              <div className="blog-image-overlay">
                <img src={post.image} alt={post.title} className="blog-image" />
              </div>
              <div className="blog-card-text">
                <p id="blog-card-tag">{post.tag}</p>
                <h2>{post.title}</h2>
                <p id="blog-card-date">{post.date}</p>
                <p id="blog-card-sub">{post.sub}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogHome;
