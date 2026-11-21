import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import { posts, categories } from "../utils/helpers";

const POSTS_PER_PAGE = 6;

export default function Blog() {

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  const view = searchParams.get("view") === "list" ? "list" : "grid";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const [searchText, setSearchText] = useState(search);

  const updateParams = (changes, replace = false) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      const isDefault =
        !value ||
        value === "all" ||
        (key === "view" && value === "grid") ||
        (key === "page" && value === 1);
      if (isDefault) next.delete(key);
      else next.set(key, value);
    });
    setSearchParams(next, { replace });
  };

  const filteredPosts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchCategory = category === "all" || post.category === category;
      const matchSearch =
        !term ||
        [post.title, post.excerpt, ...post.tags].some((text) =>
          text.toLowerCase().includes(term)
        );
      return matchCategory && matchSearch;
    });
  }, [search, category]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages); 
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    updateParams({ q: e.target.value, page: 1 }, true); 
  };

  const handleCategory = (name) => updateParams({ category: name, page: 1 });

  const handlePage = (newPage) => {
    updateParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchText("");
    setSearchParams({}, { replace: true }); 
  };

  return (
    <>
      <section className="hero text-center hero-sm">
        <div className="container">
          <span className="pill-badge"><i className="bi bi-journal-text"></i> مدونتنا</span>
          <h1 className="hero-title mt-4">استكشف <span className="accent">مقالاتنا</span></h1>
          <p className="hero-text mx-auto">اكتشف الدروس والرؤى وأفضل الممارسات للتطور الحديث</p>
        </div>
      </section>

      <section className="container pb-5">
        {/* البحث + التصنيفات */}
        <div className="filters-bar">
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input
              type="search"
              value={searchText}
              onChange={handleSearch}
              placeholder="ابحث في المقالات..."
            />
          </div>

          <div className="d-flex flex-wrap gap-2">
            <button
              className={`chip ${category === "all" ? "active" : ""}`}
              onClick={() => handleCategory("all")}
            >
              جميع المقالات
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`chip ${category === cat.name ? "active" : ""}`}
                onClick={() => handleCategory(cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>


        <div className="d-flex justify-content-between align-items-center my-4">
          <div className="view-toggle">
            <button
              className={view === "list" ? "active" : ""}
              onClick={() => updateParams({ view: "list" })}
              aria-label="عرض قائمة"
            >
              <i className="bi bi-list-ul"></i>
            </button>
            <button
              className={view === "grid" ? "active" : ""}
              onClick={() => updateParams({ view: "grid" })}
              aria-label="عرض شبكي"
            >
              <i className="bi bi-grid"></i>
            </button>
          </div>
          <span className="text-muted-2">
            عرض <strong className="text-white">{filteredPosts.length}</strong> مقالات
          </span>
        </div>


        {visiblePosts.length > 0 ? (
          <div className="row g-4">
            {visiblePosts.map((post) => (
              <div
                key={post.id}
                className={view === "grid" ? "col-12 col-md-6 col-lg-4" : "col-12"}
              >
                <PostCard post={post} view={view} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state text-center">
            <i className="bi bi-search"></i>
            <h4 className="mt-3">مفيش نتائج مطابقة</h4>
            <p className="text-muted-2">جرّب كلمة بحث تانية أو غيّر التصنيف.</p>
            <button className="btn btn-accent" onClick={clearFilters}>مسح الفلاتر</button>
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePage}
        />
      </section>
    </>
  );
}
