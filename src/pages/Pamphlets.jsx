import { useNavigate } from "react-router-dom";
import "./Books.css";

const articlesList = [
  {
    id: 5,
    title: "Alcoholics Anonymous 2022 Membership Survey",
    url: "https://www.aa.org/alcoholics-anonymous-2022-membership-survey",
  },
  {
    id: 4,
    title: "Black in AA – Experience Strength and Hope",
    url: "https://www.aa.org/black-aa-experience-strength-and-hope",
  },
  {
    id: 1,
    title: "Indigenous People in A.A.",
    url: "https://www.aa.org/indigenous-people-aa",
  },
  {
    id: 2,
    title: "LGBTQ Alcoholics in A.A.",
    url: "https://www.aa.org/lgbtq-alcoholics-aa",
  },
  {
    id: 3,
    title: "Many Paths to Spirituality",
    url: "https://www.aa.org/many-paths-spirituality",
  },
];

function Pamphlets() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>Pamphlets</h1>
      <p className="subpage-note">
        The following pamphlets are recommended resources related to Alcoholics
        Anonymous.
      </p>

      <ul className="links-list">
        {articlesList.map((article) => (
          <li key={article.id}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pamphlets;
