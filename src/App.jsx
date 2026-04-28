import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Meetings from "./pages/Meetings";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Books from "./pages/Books";
import Articles from "./pages/Articles";
import Wellbriety from "./pages/Wellbriety";
import Pamphlets from "./pages/Pamphlets";
import Literature from "./pages/Literature";
import Professionals from "./pages/Professionals";
import Information from "./pages/Information";
import Helplines from "./pages/Helplines";
import Account from "./pages/Account";

function App() {
  return (
    <div className="app">
      <header className="banner">
        <Link to="/" className="banner-title-link">
          <h1 className="banner-title">Recovery Mosaic</h1>
        </Link>
        <nav className="nav">
          <Link to="/about" className="nav-button">
            About
          </Link>
          <Link to="/meetings" className="nav-button">
            Meetings
          </Link>
          <Link to="/events" className="nav-button">
            Events
          </Link>
          <Link to="/resources" className="nav-button">
            Resources
          </Link>
          <Link to="/account" className="nav-button">
            Account
          </Link>
        </nav>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/events" element={<Events />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/books" element={<Books />} />
          <Route path="/resources/articles" element={<Articles />} />
          <Route
            path="/resources/wellbriety-movement"
            element={<Wellbriety />}
          />
          <Route path="/resources/aa-pamphlets" element={<Pamphlets />} />
          <Route path="/resources/aa-literature" element={<Literature />} />
          <Route path="/resources/professionals" element={<Professionals />} />
          <Route path="/resources/information" element={<Information />} />
          <Route path="/resources/helplines" element={<Helplines />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
