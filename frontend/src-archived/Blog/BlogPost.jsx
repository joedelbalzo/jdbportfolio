import { useParams } from "react-router-dom";
import { blogPosts } from "./data/blogData";
import "./BlogStyles.css";

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div>Post not found.</div>;
  }

  const PostComponent = post.component;

  return (
    <div className="blogposts-container">
      <div>
        <div id="blog-post-tag">{post.tag}</div>
      </div>
      {PostComponent ? <PostComponent /> : <div>This post is under construction. Check back soon!</div>}
    </div>
  );
}

export default BlogPost;
