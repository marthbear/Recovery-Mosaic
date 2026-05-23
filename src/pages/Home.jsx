import { Link } from "react-router-dom";
import "./Home.css";

const LEFT_TILES = [
  "#efcf6c", "#B35521", "#FCE5CD", "#d0b376", "#2C160B",
  "#FCE5CD", "#5a3820", "#efcf6c", "#B35521", "#d0b376",
  "#d0b376", "#2C160B", "#B35521", "#FCE5CD", "#5a3820",
  "#B35521", "#efcf6c", "#5a3820", "#2C160B", "#efcf6c",
  "#5a3820", "#FCE5CD", "#d0b376", "#B35521", "#FCE5CD",
  "#2C160B", "#efcf6c", "#5a3820", "#d0b376", "#B35521",
];

const RIGHT_TILES = [
  "#2C160B", "#d0b376", "#B35521", "#efcf6c", "#FCE5CD",
  "#B35521", "#FCE5CD", "#5a3820", "#2C160B", "#efcf6c",
  "#efcf6c", "#B35521", "#2C160B", "#d0b376", "#B35521",
  "#FCE5CD", "#5a3820", "#efcf6c", "#B35521", "#5a3820",
  "#d0b376", "#2C160B", "#FCE5CD", "#efcf6c", "#2C160B",
  "#B35521", "#d0b376", "#FCE5CD", "#5a3820", "#efcf6c",
];

function MosaicGrid({ tiles }) {
  return (
    <div className="mosaic-grid" aria-hidden="true">
      {tiles.map((color, i) => (
        <div key={i} className="mosaic-tile" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <MosaicGrid tiles={LEFT_TILES} />
        <div className="hero-content">
          <p className="hero-eyebrow">Recovery Mosaic</p>
          <h1 className="hero-headline">
            A protected directory for BIPOC recovery meetings.
          </h1>
          <p className="hero-description">
            Recovery Mosaic is a community-centered digital platform dedicated to
            providing safe and secure access to recovery. Created out of firsthand
            experience with long-term recovery and years of professional work in
            behavioral health, technical assistance, and community building, Recovery
            Mosaic bridges the gap between traditional recovery services and the nuanced
            needs of communities of color.
          </p>
        </div>
        <MosaicGrid tiles={RIGHT_TILES} />
      </section>

      

      <section className="features">
        <div className="features-inner">
          <Link to="/meetings" className="feature-card">
            <div className="feature-icon">&#9672;</div>
            <h2>Access to recovery meetings</h2>
            <p>
              Virtual and in-person meetings designed for, and led by, people of color.
            </p>
          </Link>
          <Link to="/events" className="feature-card">
            <div className="feature-icon">&#9672;</div>
            <h2>Community events and gatherings</h2>
            <p>
              Foster connection, celebration, and belonging — from sober social events
              to marathon meetings.
            </p>
          </Link>
          <Link to="/resources" className="feature-card">
            <div className="feature-icon">&#9672;</div>
            <h2>Publication database</h2>
            <p>
              Recovery stories and literature by people of color.
            </p>
          </Link>
        </div>
      </section>

      <section className="mission">
        <div className="mission-inner">
          <p>
            Recovery Mosaic is built on the belief that{" "}
            <strong>representation is healing.</strong> We aim to reduce isolation,
            strengthen connection, and offer culturally anchored recovery pathways that
            honor identity, heritage, and lived experience.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
