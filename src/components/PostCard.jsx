import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";


export default function PostCard({ post, view = "grid" }) {
  return (
   
    <Link
      to={`/blog/${post.slug}`}
      className={`post-card ${view === "list" ? "is-list" : ""}`}
    >
      <div className="post-card-img">
        <img src={post.image} alt={post.title} loading="lazy" />
        <span className="badge-cat">{post.category}</span>
        {post.featured && (
          <span className="badge-featured">
            <i className="bi bi-star-fill"></i> مميز
          </span>
        )}
      </div>

      <div className="post-card-body">
        <div className="post-meta">
          <span><i className="bi bi-calendar3"></i> {formatDate(post.date)}</span>
          <span><i className="bi bi-clock"></i> {post.readTime}</span>
        </div>

        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>

        <div className="post-card-footer">
          <div className="d-flex align-items-center gap-2">
            <img src={post.author.avatar} alt={post.author.name} className="avatar" />
            <div className="lh-sm">
              <div className="fw-semibold small">{post.author.name}</div>
              <div className="text-muted-2 tiny">{post.author.role}</div>
            </div>
          </div>
          <span className="read-more">
            اقرأ المقال <i className="bi bi-arrow-left"></i>
          </span>
        </div>
      </div>
    </Link>
  );
}
