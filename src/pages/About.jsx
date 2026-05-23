import "./About.css";

const LEFT_TILES = [
  "#2C160B", "#efcf6c", "#B35521", "#d0b376", "#FCE5CD",
  "#B35521", "#FCE5CD", "#2C160B", "#efcf6c", "#5a3820",
  "#efcf6c", "#5a3820", "#FCE5CD", "#B35521", "#2C160B",
  "#FCE5CD", "#B35521", "#efcf6c", "#5a3820", "#d0b376",
  "#d0b376", "#2C160B", "#B35521", "#efcf6c", "#FCE5CD",
  "#5a3820", "#efcf6c", "#d0b376", "#2C160B", "#B35521",
];

const RIGHT_TILES = [
  "#FCE5CD", "#B35521", "#efcf6c", "#2C160B", "#d0b376",
  "#efcf6c", "#d0b376", "#5a3820", "#B35521", "#FCE5CD",
  "#5a3820", "#FCE5CD", "#2C160B", "#efcf6c", "#B35521",
  "#B35521", "#efcf6c", "#FCE5CD", "#d0b376", "#5a3820",
  "#2C160B", "#B35521", "#d0b376", "#FCE5CD", "#efcf6c",
  "#efcf6c", "#5a3820", "#B35521", "#d0b376", "#2C160B",
];

function MosaicGrid({ tiles }) {
  return (
    <div className="about-mosaic-grid" aria-hidden="true">
      {tiles.map((color, i) => (
        <div key={i} className="about-mosaic-tile" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <MosaicGrid tiles={LEFT_TILES} />
        <div className="about-hero-content">
          <h1 className="about-title">About Us</h1>
          <p className="about-lead">
            Recovery Mosaic is a community-centered digital platform dedicated to
            providing safe and secure access to recovery meetings, resources, and
            culturally relevant healing spaces for BIPOC communities.
          </p>
        </div>
        <MosaicGrid tiles={RIGHT_TILES} />
      </section>

      <section className="about-body">
        <div className="about-body-inner">
          <p className="about-paragraph">
            Rooted in the truth of lived experience, we connect people to support
            meetings, culturally relevant resources and community events. Through
            storytelling, shared resources, and collective resilience, we work to ensure
            that every person — especially those historically marginalized in
            behavioral-health systems — has a place where they feel seen, supported, and
            empowered to live authentically. Our mission is to make recovery visible,
            attainable, and celebrated, honoring every person's return to their truest
            self.
          </p>
        </div>
      </section>

      <section className="about-closing">
        <div className="about-closing-inner">
          <p>
            We believe that recovery is not a single path but a{" "}
            <strong>mosaic of identities, traditions, and strengths.</strong> By
            uplifting voices often overlooked in mainstream recovery spaces, we aim to
            build a landscape where every person feels seen, affirmed, and supported.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
