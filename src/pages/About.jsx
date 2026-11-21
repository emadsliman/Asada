import { Link } from "react-router-dom";
import { siteInfo } from "../utils/helpers";

export default function About() {
  return (
    <section className="hero text-center">
      <div className="container">
        <span className="pill-badge">من نحن</span>
        <h1 className="hero-title mt-4">
          قصة <span className="accent">{siteInfo.name}</span>
        </h1>
        <p className="hero-text mx-auto">{siteInfo.description}</p>
        <p className="hero-text mx-auto">
          هدفنا إن كل مصوّر، مبتدئ أو محترف، يلاقي هنا محتوى عملي يساعده يتطور ويبدع.
        </p>
        <Link to="/blog" className="btn btn-accent btn-lg mt-3">ابدأ القراءة</Link>
      </div>
    </section>
  );
}
