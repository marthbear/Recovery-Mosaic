import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Resources.css";

const DEFAULT_RESOURCES = [
  { id: "books", label: "Books", path: "/resources/books" },
  { id: "articles", label: "Articles", path: "/resources/articles" },
  { id: "wellbriety", label: "Wellbriety Movement", path: "/resources/wellbriety-movement" },
  { id: "aa-pamphlets", label: "AA Pamphlets", path: "/resources/aa-pamphlets" },
  { id: "aa-literature", label: "AA Literature", path: "/resources/aa-literature" },
  { id: "al-anon", label: "Al-Anon Free Literature", url: "https://al-anon.org/for-members/members-resources/literature/downloadable-items/" },
  { id: "professionals", label: "Resources from Professionals", path: "/resources/professionals" },
  { id: "information", label: "Additional Information", path: "/resources/information" },
  { id: "helplines", label: "Helplines", path: "/resources/helplines" },
];

function Resources() {
  const navigate = useNavigate();

  const allResources = useMemo(() => {
    const hidden = JSON.parse(localStorage.getItem("admin_hidden_resources") || "[]");
    const adminAdded = JSON.parse(localStorage.getItem("admin_resources") || "[]");
    const visible = DEFAULT_RESOURCES.filter(r => !hidden.includes(r.id));
    return [...visible, ...adminAdded];
  }, []);

  function handleClick(resource) {
    if (resource.path) {
      navigate(resource.path);
    } else {
      window.open(resource.url, "_blank");
    }
  }

  return (
    <div className="page">
      <h1>Resources on BIPOC & Recovery</h1>

      <div className="resources-note">
        <p>
          <strong>Note:</strong> We currently need meeting{" "}
          <strong>scripts</strong> to share with BIPOC members who would like to
          start their own BIPOC Recovery group. Please contact the moderaters if
          you would like to share your group's meeting script.
        </p>
        <p>
          <strong>
            Please contact this email for resource list updates and/or People of
            Color (POC) meeting script samples:
          </strong>{" "}
          bipocmeetingmoderators@gmail.com
        </p>
      </div>

      <div className="resources-buttons">
        {allResources.map(r => (
          <button key={r.id} onClick={() => handleClick(r)}>{r.label}</button>
        ))}
      </div>
    </div>
  );
}

export default Resources;
