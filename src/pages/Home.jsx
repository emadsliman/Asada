import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { posts, categories } from "../utils/helpers";

const stats = [
  { icon: "bi-people", value: "+2مليون", label: "قارئ شهرياً" },
  { icon: "bi-journal-text", value: "500+", label: "مقالة منشورة" },
  { icon: "bi-pen", value: "50+", label: "كاتب خبير" },
  { icon: "bi-collection", value: "15+", label: "تصنيف" },
];

export default function Home() {
  
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero text-center">
        <div className="container">
          <span className="pill-badge">من نحن</span>
          <h1 className="hero-title mt-4">
            مهمتنا هي <span className="accent">الإعلام</span> والإلهام
          </h1>
          <p className="hero-text mx-auto">
            مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معكم أسرار المحترفين ونصائح عملية
            لتطوير مهاراتكم. نحن شغوفون بمشاركة المعرفة ومساعدة المصورين على تنمية مهاراتهم
            من خلال محتوى عالي الجودة.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
            <Link to="/blog" className="btn btn-accent btn-lg">تصفح المقالات</Link>
            <Link to="/about" className="btn btn-outline-light btn-lg">تعرف علينا</Link>
          </div>

          <div className="row g-3 justify-content-center mt-5">
            {stats.map((stat) => (
              <div key={stat.label} className="col-6 col-md-3">
                <div className="stat-card">
                  <i className={`bi ${stat.icon}`}></i>
                  <div className="stat-value">{stat.value}</div>
                  <div className="text-muted-2 small">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* المقالات المميزة */}
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className="section-title">أحدث المقالات <span className="accent">المميزة</span></h2>
            <p className="text-muted-2 mb-0">اختيارات فريق التحرير لهذا الأسبوع</p>
          </div>
          <Link to="/blog" className="read-more">عرض الكل <i className="bi bi-arrow-left"></i></Link>
        </div>

        <div className="d-flex flex-column gap-4">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} view="list" />
          ))}
        </div>
      </section>

      {/* التصنيفات - كل واحد بيودّيك للمدونة وفيها الفلتر متطبّق من الـ URL */}
      <section className="container pb-5">
        <h2 className="section-title mb-4">تصفح حسب <span className="accent">التصنيف</span></h2>
        <div className="d-flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/blog?category=${encodeURIComponent(cat.name)}`}
              className="chip"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
