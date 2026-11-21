import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import NotFound from "./NotFound";
import { posts, formatDate, parseContent } from "../utils/helpers";

export default function BlogDetails() {

  const { slug } = useParams();
  const [copied, setCopied] = useState(false);

  const post = posts.find((p) => p.slug === slug);

  if (!post) return <NotFound />;

  const blocks = parseContent(post.content);
  const headings = blocks.filter((b) => b.type === "heading");


  const others = posts.filter((p) => p.id !== post.id);
  const related = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, 3);

  const pageUrl = window.location.href;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {

    }
  };

  return (
    <>
      {/* غلاف المقال */}
      <section
        className="article-hero"
        style={{ backgroundImage: `url(${post.image})` }}
      >
        <div className="article-hero-overlay">
          <div className="container">
            <nav className="breadcrumb-pill" aria-label="breadcrumb">
              <Link to="/" aria-label="الرئيسية"><i className="bi bi-house-fill"></i></Link>
              <i className="bi bi-chevron-left sep"></i>
              <Link to="/blog">المدونة</Link>
              <i className="bi bi-chevron-left sep"></i>
              <Link to={`/blog?category=${encodeURIComponent(post.category)}`} className="accent">
                {post.category}
              </Link>
            </nav>

            <div className="d-flex flex-wrap align-items-center gap-3 text-muted-2 small mb-3">
              <span className="badge-cat static">{post.category}</span>
              <span><i className="bi bi-calendar3"></i> {formatDate(post.date)}</span>
              <span><i className="bi bi-clock"></i> {post.readTime}</span>
            </div>

            <h1 className="article-title">{post.title}</h1>

            <div className="author-chip">
              <img src={post.author.avatar} alt={post.author.name} className="avatar avatar-lg" />
              <div className="lh-sm">
                <div className="fw-bold">{post.author.name}</div>
                <div className="text-muted-2 small">{post.author.role}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          {/* المقال (أول عمود = اليمين في الـ RTL) */}
          <article className="col-lg-8">
            <blockquote className="excerpt-box">"{post.excerpt}"</blockquote>

            <div className="article-content">
              {blocks.map((block, index) =>
                block.type === "heading" ? (
                  <h2 key={index} id={block.id}>
                    <span className="h-icon"><i className="bi bi-camera-fill"></i></span>
                    {block.text}
                  </h2>
                ) : (
                  <p key={index}>{block.text}</p>
                )
              )}
            </div>

            <div className="side-card mt-4">
              <h6 className="side-title"><i className="bi bi-tags"></i> الوسوم</h6>
              <div className="d-flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} to={`/blog?q=${encodeURIComponent(tag)}`} className="tag">
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            <div className="side-card mt-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
              <h6 className="side-title mb-0"><i className="bi bi-share"></i> شارك المقال</h6>
              <div className="d-flex gap-2">
                <button className="icon-btn" onClick={copyLink} aria-label="نسخ الرابط" title={copied ? "تم النسخ ✓" : "نسخ الرابط"}>
                  <i className={`bi ${copied ? "bi-check2" : "bi-link-45deg"}`}></i>
                </button>
                <a className="icon-btn" target="_blank" rel="noreferrer" aria-label="واتساب"
                   href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + pageUrl)}`}>
                  <i className="bi bi-whatsapp"></i>
                </a>
                <a className="icon-btn" target="_blank" rel="noreferrer" aria-label="لينكدإن"
                   href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}>
                  <i className="bi bi-linkedin"></i>
                </a>
                <a className="icon-btn" target="_blank" rel="noreferrer" aria-label="إكس"
                   href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(pageUrl)}`}>
                  <i className="bi bi-twitter-x"></i>
                </a>
              </div>
            </div>

            <div className="side-card mt-3 d-flex gap-3 align-items-center">
              <img src={post.author.avatar} alt={post.author.name} className="avatar avatar-xl" />
              <div>
                <div className="accent tiny">كاتب المقال</div>
                <h5 className="mb-0">{post.author.name}</h5>
                <div className="text-muted-2 small mb-1">{post.author.role}</div>
                <p className="text-muted-2 small mb-0">
                  {post.author.role} شغوف بمشاركة المعرفة والخبرات في عالم التصوير الفوتوغرافي.
                </p>
              </div>
            </div>
          </article>

          {/* السايد بار */}
          <aside className="col-lg-4">
            <div className="sticky-side">
              <div className="side-card">
                <h6 className="side-title"><i className="bi bi-list-ul"></i> محتويات المقال</h6>
                <ol className="toc list-unstyled mb-0">
                  {headings.map((h, i) => (
                    <li key={h.id}>
                      {/* رابط عادي بـ # عشان يسكرول للعنوان جوا نفس الصفحة */}
                      <a href={`#${h.id}`}>
                        <span className="toc-num">{i + 1}</span> {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="side-card mt-3 d-flex text-center">
                <div className="flex-fill">
                  <i className="bi bi-clock accent"></i>
                  <div className="fw-bold small mt-1">{post.readTime}</div>
                </div>
                <div className="flex-fill">
                  <i className="bi bi-calendar3 accent"></i>
                  <div className="fw-bold small mt-1">{formatDate(post.date)}</div>
                </div>
              </div>

              <div className="side-card mt-3 text-center cta-card">
                <i className="bi bi-envelope-heart fs-2 accent"></i>
                <h6 className="mt-2">لا تفوّت جديدنا</h6>
                <p className="text-muted-2 small">اشترك للحصول على أحدث المقالات</p>
                <Link to="/blog" className="btn btn-accent w-100">تصفح المزيد</Link>
              </div>
            </div>
          </aside>
        </div>

        {/* مقالات ذات صلة */}
        <section className="mt-5 pt-4">
          <h2 className="section-title mb-4">مقالات <span className="accent">ذات صلة</span></h2>
          <div className="row g-4">
            {related.map((p) => (
              <div key={p.id} className="col-12 col-md-6 col-lg-4">
                <PostCard post={p} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
