import { useNavigate } from "react-router-dom";
import "./Books.css";

const articlesList = [
  {
    id: 4,
    title: "Al-Anon Speaker Tapes",
    url: "https://wellbriety.com/al-anon-speaker-tapes/",
  },
  {
    id: 2,
    title: "Elders Daily Meditation",
    url: "https://wellbriety.com/meditations/",
  },
  {
    id: 1,
    title: "Land Acknowledgement (Native Land Digital)",
    url: "https://native-land.ca/",
  },
  {
    id: 5,
    title: "Wellbriety Meetings",
    url: "https://whitebison.org/wellbriety-meeting-flyers/",
  },
  {
    id: 3,
    title: "Wellbriety Teachings (VIDEOS)",
    url: "https://wellbriety.com/wellbriety/wellbriety-teachings/",
  },
];

function Wellbriety() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>Wellbriety</h1>
      <p className="subpage-note">
        The following are reccomended resources on the Wellbriety Movement.
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

export default Wellbriety;
