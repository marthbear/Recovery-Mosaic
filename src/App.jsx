import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Meetings from './pages/Meetings'
import Events from './pages/Events'
import Resources from './pages/Resources'
import Books from './pages/Books'

function App() {
  return (
    <div className="app">
      <header className="banner">
        <Link to="/" className="banner-title-link">
          <h1 className="banner-title">Recovery Mosaic</h1>
        </Link>
        <nav className="nav">
          <Link to="/about" className="nav-button">About</Link>
          <Link to="/meetings" className="nav-button">Meetings</Link>
          <Link to="/events" className="nav-button">Events</Link>
          <Link to="/resources" className="nav-button">Resources</Link>
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
        </Routes>
      </main>
    </div>
  )
}

export default App
