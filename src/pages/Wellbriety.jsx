import "./Books.css";

const wellbrietyList = [
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
  return (
    <div className="page">
      <h1>Wellbriety</h1>
      <p className="subpage-note">
        The following are reccomended resources on the Wellbriety Movement.
      </p>

      <ul className="links-list">
        {wellbrietyList.map((well) => (
          <li key={well.id}>
            <a href={well.url} target="_blank" rel="noopener noreferrer">
              {well.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wellbriety;
