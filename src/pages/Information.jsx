import "./Books.css";

const infoList = [
  {
    id: 1,
    title:
      "Native American Indian General Service Office of Alcoholics Anonymous (NAIGSO-AA)",
    url: "https://www.naigso-aa.org/",
  },
  {
    id: 2,
    title:
      "Online Museum of African American Addictions, Treatment & Recovery ",
    url: "http://www.museumofafricanamericanaddictionsrecovery.org/",
  },
  {
    id: 4,
    title: "Recovery Guide: African American Alcoholics (NO LINK)",
  },
  {
    id: 3,
    title: "Serenity Club: EARLY BLACK AA",
    url: "http://www.serenityclub.info/history/Early%20Black%20AA.pdf",
  },
];

function Information() {
  return (
    <div className="page">
      <h1>Information on BIPOC & Recovery</h1>
      <p className="subpage-note">Additional resources:</p>

      <ul className="links-list">
        {infoList.map((info) => (
          <li key={info.id}>
            <a href={info.url} target="_blank" rel="noopener noreferrer">
              {info.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Information;
