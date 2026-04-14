import "./Books.css";

const literatureList = [
  {
    id: 1,
    title: "SMF-92 A.A. Preamble",
    url: "https://www.aa.org/assets/en_US/smf-92_en.pdf",
  },
  {
    id: 6,
    title: "Daily Reflection",
    url: "https://www.aa.org/pages/en_US/daily-reflection",
  },
  {
    id: 9,
    title: "Living Sober",
    url: "http://saphonemeeting.org/images/Living_Sober.pdf",
  },
  {
    id: 3,
    title: "12 Traditions (SHORT FORM)",
    url: "https://aadavis.org/wp-content/uploads/2020/03/12_Traditions.pdf",
  },
  {
    id: 8,
    title: "12 Steps & 12 Traditions ",
    url: "https://www.aa.org/pages/en_US/twelve-steps-and-twelve-traditions",
  },
];

const bbList = [
  {
    id: 7,
    title: "Big Book of Alcoholics Anonymous ",
    url: "https://www.aa.org/pages/en_US/alcoholics-anonymous",
  },
  {
    id: 2,
    title: "P-10 How It Works",
    url: "https://www.aa.org/assets/en_us/p-10_howitworks.pdf",
  },
  {
    id: 5,
    title: '"9th Step Promises" pg. 83 & 84',
    url: "https://www.hvai.org/readings/9th-Step-Promises.pdf",
  },
  {
    id: 4,
    title: '"A Vision for You" pg. 164',
    url: "https://aadavis.org/wp-content/uploads/2020/03/AVisionForYou.pdf",
  },
];

function Literature() {
  return (
    <div className="page">
      <h1>AA Literature</h1>
      <p className="subpage-note">
        The following resources are recommended literature related to Alcoholics
        Anonymous.
      </p>

      <ul className="links-list">
        {literatureList.map((lit) => (
          <li key={lit.id}>
            <a href={lit.url} target="_blank" rel="noopener noreferrer">
              {lit.title}
            </a>
          </li>
        ))}
      </ul>
      <h2>The Big Book</h2>
      <ul className="links-list">
        {bbList.map((bb) => (
          <li key={bb.id}>
            <a href={bb.url} target="_blank" rel="noopener noreferrer">
              {bb.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Literature;
