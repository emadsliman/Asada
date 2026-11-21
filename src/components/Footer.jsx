import { Link } from "react-router-dom";
import { siteInfo } from "../utils/helpers";

const socialIcons = {
  twitter: "bi-twitter-x",
  github: "bi-github",
  linkedin: "bi-linkedin",
  youtube: "bi-youtube",
};

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-5">
            <h5 className="fw-bold mb-3">{siteInfo.name}</h5>
            <p className="text-muted-2 mb-0">{siteInfo.description}</p>
          </div>

          <div className="col-6 col-lg-3">
            <h6 className="fw-bold mb-3">روابط سريعة</h6>
            <ul className="list-unstyled footer-links mb-0">
              <li><Link to="/">الرئيسية</Link></li>
              <li><Link to="/blog">المدونة</Link></li>
              <li><Link to="/about">من نحن</Link></li>
            </ul>
          </div>

          <div className="col-6 col-lg-4">
            <h6 className="fw-bold mb-3">تابعنا</h6>
            <div className="d-flex gap-2 mb-3">
              {Object.entries(siteInfo.social).map(([name, url]) => (
                <a key={name} href={url} className="icon-btn" target="_blank" rel="noreferrer" aria-label={name}>
                  <i className={`bi ${socialIcons[name]}`}></i>
                </a>
              ))}
            </div>
            <a href={`mailto:${siteInfo.email}`} className="text-muted-2">{siteInfo.email}</a>
          </div>
        </div>

        <hr className="my-4" />
        <p className="text-center text-muted-2 small mb-0">
          © {new Date().getFullYear()} {siteInfo.name}. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
