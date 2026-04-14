import "./Books.css";

const profList = [
  {
    id: 1,
    title: "BIPOC Eating Disorder Providers",
    url: "https://docs.google.com/spreadsheets/d/1oo4zMUkDlaZM63nSYqZVlFglj0XC9izfl30ybPtxJsQ/edit#gid=0",
  },
];

function Professionals() {
  return (
    <div className="page">
      <h1>Resources From Professionals</h1>
      <p className="subpage-note">More resources coming in the future.</p>

      <ul className="links-list">
        {profList.map((prof) => (
          <li key={prof.id}>
            <a href={prof.url} target="_blank" rel="noopener noreferrer">
              {prof.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Professionals;
