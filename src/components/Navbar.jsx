import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { siteInfo } from "../utils/helpers";

const links = [
  { to: "/", label: "الرئيسية", end: true },
  { to: "/blog", label: "المدونة" },
  { to: "/about", label: "من نحن" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) => "nav-pill" + (isActive ? " active" : "");

  return (
    <header className="site-navbar">
      <nav className="navbar navbar-expand-lg container py-2">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-logo">
            <i className="bi bi-camera"></i>
          </span>
          <span>
            <strong className="d-block">{siteInfo.name}</strong>
            <small>{siteInfo.tagline}</small>
          </span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          aria-label="القائمة"
          onClick={() => setOpen(!open)}
        >
          <i className="bi bi-list fs-2"></i>
        </button>

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="nav-pills-wrap mx-auto my-3 my-lg-0">
            {links.map((link) => (
              <li key={link.to}>
                {/* end: عشان "/" ميفضلش active مع كل الصفحات */}
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link to="/blog" className="icon-btn" aria-label="بحث" onClick={() => setOpen(false)}>
              <i className="bi bi-search"></i>
            </Link>
            <Link to="/blog" className="btn btn-accent" onClick={() => setOpen(false)}>
              ابدأ القراءة
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
