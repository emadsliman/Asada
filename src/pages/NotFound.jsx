import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="container text-center not-found">
      <div className="code-404">404</div>
      <h1 className="h2 fw-bold">الصفحة دي مش موجودة</h1>
      <p className="text-muted-2 mb-4">
        يبدو إن الرابط غلط أو إن الصفحة اتنقلت. تقدر ترجع للرئيسية أو تتصفح المدونة.
      </p>
      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <Link to="/" className="btn btn-accent">الصفحة الرئيسية</Link>
        <Link to="/blog" className="btn btn-outline-light">المدونة</Link>
        <button className="btn btn-outline-light" onClick={() => navigate(-1)}>رجوع</button>
      </div>
    </section>
  );
}
