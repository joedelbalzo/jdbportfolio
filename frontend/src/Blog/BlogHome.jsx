import { Link } from "react-router-dom";
import { blogPosts } from "./data/blogData";
import "./BlogStyles.css";

function BlogHome() {
  return (
    <div>
      <h1>Welcome to the newest addition of my website: an engineering blog.</h1>
      <p style={{ width: "80%", margin: "0 auto", textAlign: "left", fontSize: "1rem", color: "#f5f5f5" }}>
        It's a little light right now, but I'm excited to get into how I develop an application. Honestly, I'm hoping this teaches me just
        as much as it might teach you. Enjoy.{" "}
      </p>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div key={post.slug} className="blog-card">
            <Link to={`/blog/${post.slug}`}>
              <img src={post.image} alt={post.title} className="blog-image" />
              <h2>{post.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogHome;
