import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const KEYS = {
  meetings: "admin_meetings",
  hiddenMeetings: "admin_hidden_meetings",
  events: "admin_events",
  hiddenEvents: "admin_hidden_events",
  resources: "admin_resources",
  hiddenResources: "admin_hidden_resources",
};

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

const STATIC_EVENTS = [
  { id: "flyer4", label: "Black in A.A. Panel: The History of Black A.A. Groups Flyer", category: "upcoming" },
  { id: "flyer2", label: "Our Recovery in Color Podcast Flyer", category: "ongoing" },
  { id: "flyer3", label: "Our Recovery in Color New Book Release Flyer", category: "ongoing" },
];

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("meetings");

  const [staticMeetings, setStaticMeetings] = useState([]);
  const [adminMeetings, setAdminMeetings] = useState(() => load(KEYS.meetings, []));
  const [hiddenMeetings, setHiddenMeetings] = useState(() => load(KEYS.hiddenMeetings, []));
  const [newMeeting, setNewMeeting] = useState({ name: "", fellowship: "", day: "", time: "", location: "", zoomLink: "", notes: "" });
  const [meetingSearch, setMeetingSearch] = useState("");

  const [adminEvents, setAdminEvents] = useState(() => load(KEYS.events, []));
  const [hiddenEvents, setHiddenEvents] = useState(() => load(KEYS.hiddenEvents, []));
  const [newEvent, setNewEvent] = useState({ title: "", imageUrl: "", category: "upcoming" });

  const [adminResources, setAdminResources] = useState(() => load(KEYS.resources, []));
  const [hiddenResources, setHiddenResources] = useState(() => load(KEYS.hiddenResources, []));
  const [newResource, setNewResource] = useState({ label: "", url: "" });

  useEffect(() => {
    if (!sessionStorage.getItem("adminAuth")) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    fetch("/meetings.json")
      .then(r => r.json())
      .then(setStaticMeetings)
      .catch(() => {});
  }, []);

  useEffect(() => { localStorage.setItem(KEYS.meetings, JSON.stringify(adminMeetings)); }, [adminMeetings]);
  useEffect(() => { localStorage.setItem(KEYS.hiddenMeetings, JSON.stringify(hiddenMeetings)); }, [hiddenMeetings]);
  useEffect(() => { localStorage.setItem(KEYS.events, JSON.stringify(adminEvents)); }, [adminEvents]);
  useEffect(() => { localStorage.setItem(KEYS.hiddenEvents, JSON.stringify(hiddenEvents)); }, [hiddenEvents]);
  useEffect(() => { localStorage.setItem(KEYS.resources, JSON.stringify(adminResources)); }, [adminResources]);
  useEffect(() => { localStorage.setItem(KEYS.hiddenResources, JSON.stringify(hiddenResources)); }, [hiddenResources]);

  function logout() {
    sessionStorage.removeItem("adminAuth");
    navigate("/login");
  }

  function addMeeting(e) {
    e.preventDefault();
    setAdminMeetings(p => [...p, { ...newMeeting, id: `admin_${Date.now()}` }]);
    setNewMeeting({ name: "", fellowship: "", day: "", time: "", location: "", zoomLink: "", notes: "" });
  }

  function addEvent(e) {
    e.preventDefault();
    setAdminEvents(p => [...p, { ...newEvent, id: `admin_${Date.now()}` }]);
    setNewEvent({ title: "", imageUrl: "", category: "upcoming" });
  }

  function addResource(e) {
    e.preventDefault();
    setAdminResources(p => [...p, { ...newResource, id: `admin_${Date.now()}` }]);
    setNewResource({ label: "", url: "" });
  }

  const visibleStatic = staticMeetings.filter(m => !hiddenMeetings.includes(m.id));
  const hiddenStaticMeetings = staticMeetings.filter(m => hiddenMeetings.includes(m.id));

  const searchLower = meetingSearch.toLowerCase();
  const matchesMeetingSearch = m =>
    !searchLower ||
    m.name.toLowerCase().includes(searchLower) ||
    m.fellowship.toLowerCase().includes(searchLower) ||
    m.location.toLowerCase().includes(searchLower) ||
    m.day.toLowerCase().includes(searchLower);
  const filteredAdminMeetings = adminMeetings.filter(matchesMeetingSearch);
  const filteredStaticMeetings = visibleStatic.filter(matchesMeetingSearch);
  const visibleDefaultResources = DEFAULT_RESOURCES.filter(r => !hiddenResources.includes(r.id));
  const hiddenDefaultResources = DEFAULT_RESOURCES.filter(r => hiddenResources.includes(r.id));

  return (
    <div className="page admin-page">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="admin-logout-btn" onClick={logout}>Log Out</button>
      </div>

      <div className="admin-tabs">
        {["meetings", "events", "resources"].map(tab => (
          <button
            key={tab}
            className={`admin-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "meetings" && (
        <div className="admin-section">
          <h3>Add Meeting</h3>
          <form className="admin-form" onSubmit={addMeeting}>
            <div className="admin-form-grid">
              <input placeholder="Name *" value={newMeeting.name} onChange={e => setNewMeeting(p => ({ ...p, name: e.target.value }))} required />
              <input placeholder="Fellowship *" value={newMeeting.fellowship} onChange={e => setNewMeeting(p => ({ ...p, fellowship: e.target.value }))} required />
              <input placeholder="Day (e.g. Monday) *" value={newMeeting.day} onChange={e => setNewMeeting(p => ({ ...p, day: e.target.value }))} required />
              <input placeholder="Time (e.g. 7:00 PM) *" value={newMeeting.time} onChange={e => setNewMeeting(p => ({ ...p, time: e.target.value }))} required />
              <input placeholder="Location (or Virtual) *" value={newMeeting.location} onChange={e => setNewMeeting(p => ({ ...p, location: e.target.value }))} required />
              <input placeholder="Zoom Link (optional)" value={newMeeting.zoomLink} onChange={e => setNewMeeting(p => ({ ...p, zoomLink: e.target.value }))} />
              <input placeholder="Notes (optional)" className="admin-full" value={newMeeting.notes} onChange={e => setNewMeeting(p => ({ ...p, notes: e.target.value }))} />
            </div>
            <button className="admin-add-btn" type="submit">Add Meeting</button>
          </form>

          <h3>Current Meetings ({visibleStatic.length + adminMeetings.length})</h3>
          <input
            className="admin-search"
            type="text"
            placeholder="Search by name, fellowship, location, or day..."
            value={meetingSearch}
            onChange={e => setMeetingSearch(e.target.value)}
          />
          <div className="admin-list">
            {filteredAdminMeetings.map(m => (
              <div key={m.id} className="admin-item admin-item--custom">
                <div className="admin-item-info">
                  <strong>{m.name}</strong>
                  <span>{m.fellowship} — {m.day} {m.time} — {m.location}</span>
                </div>
                <button className="admin-remove-btn" onClick={() => setAdminMeetings(p => p.filter(x => x.id !== m.id))}>Remove</button>
              </div>
            ))}
            {filteredStaticMeetings.map(m => (
              <div key={m.id} className="admin-item">
                <div className="admin-item-info">
                  <strong>{m.name}</strong>
                  <span>{m.fellowship} — {m.day} {m.time} — {m.location}</span>
                </div>
                <button className="admin-remove-btn" onClick={() => setHiddenMeetings(p => [...p, m.id])}>Hide</button>
              </div>
            ))}
            {filteredAdminMeetings.length === 0 && filteredStaticMeetings.length === 0 && (
              <p className="admin-empty">No meetings match your search.</p>
            )}
          </div>

          <h3>Hidden Meetings ({hiddenStaticMeetings.length})</h3>
          <div className="admin-list">
            {hiddenStaticMeetings.length === 0 ? (
              <p className="admin-empty">No meetings are currently hidden.</p>
            ) : (
              hiddenStaticMeetings.map(m => (
                <div key={m.id} className="admin-item admin-item--hidden">
                  <div className="admin-item-info">
                    <strong>{m.name}</strong>
                    <span>{m.fellowship} — {m.day} {m.time} — {m.location}</span>
                  </div>
                  <button className="admin-restore-btn" onClick={() => setHiddenMeetings(p => p.filter(id => id !== m.id))}>Restore</button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === "events" && (
        <div className="admin-section">
          <h3>Add Event</h3>
          <form className="admin-form" onSubmit={addEvent}>
            <div className="admin-form-grid">
              <input placeholder="Event title *" value={newEvent.title} onChange={e => setNewEvent(p => ({ ...p, title: e.target.value }))} required />
              <input placeholder="Image URL *" value={newEvent.imageUrl} onChange={e => setNewEvent(p => ({ ...p, imageUrl: e.target.value }))} required />
              <select value={newEvent.category} onChange={e => setNewEvent(p => ({ ...p, category: e.target.value }))}>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
            <button className="admin-add-btn" type="submit">Add Event</button>
          </form>

          {["upcoming", "ongoing"].map(cat => {
            const staticInCat = STATIC_EVENTS.filter(ev => ev.category === cat && !hiddenEvents.includes(ev.id));
            const adminInCat = adminEvents.filter(ev => ev.category === cat);
            return (
              <div key={cat}>
                <h3>{cat.charAt(0).toUpperCase() + cat.slice(1)} Events</h3>
                <div className="admin-list">
                  {staticInCat.map(ev => (
                    <div key={ev.id} className="admin-item">
                      <div className="admin-item-info"><strong>{ev.label}</strong><span>Static flyer</span></div>
                      <button className="admin-remove-btn" onClick={() => setHiddenEvents(p => [...p, ev.id])}>Hide</button>
                    </div>
                  ))}
                  {adminInCat.map(ev => (
                    <div key={ev.id} className="admin-item admin-item--custom">
                      <div className="admin-item-info">
                        <strong>{ev.title}</strong>
                        <span className="admin-url">{ev.imageUrl}</span>
                      </div>
                      <button className="admin-remove-btn" onClick={() => setAdminEvents(p => p.filter(x => x.id !== ev.id))}>Remove</button>
                    </div>
                  ))}
                  {staticInCat.length === 0 && adminInCat.length === 0 && (
                    <p className="admin-empty">No {cat} events.</p>
                  )}
                </div>
              </div>
            );
          })}

          {hiddenEvents.length > 0 && (
            <>
              <h3>Hidden Events</h3>
              <div className="admin-list">
                {STATIC_EVENTS.filter(ev => hiddenEvents.includes(ev.id)).map(ev => (
                  <div key={ev.id} className="admin-item admin-item--hidden">
                    <div className="admin-item-info"><strong>{ev.label}</strong></div>
                    <button className="admin-restore-btn" onClick={() => setHiddenEvents(p => p.filter(id => id !== ev.id))}>Restore</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === "resources" && (
        <div className="admin-section">
          <h3>Add Resource</h3>
          <form className="admin-form" onSubmit={addResource}>
            <div className="admin-form-grid">
              <input placeholder="Label *" value={newResource.label} onChange={e => setNewResource(p => ({ ...p, label: e.target.value }))} required />
              <input placeholder="URL *" value={newResource.url} onChange={e => setNewResource(p => ({ ...p, url: e.target.value }))} required />
            </div>
            <button className="admin-add-btn" type="submit">Add Resource</button>
          </form>

          <h3>Current Resources</h3>
          <div className="admin-list">
            {adminResources.map(r => (
              <div key={r.id} className="admin-item admin-item--custom">
                <div className="admin-item-info">
                  <strong>{r.label}</strong>
                  <span className="admin-url">{r.url}</span>
                </div>
                <button className="admin-remove-btn" onClick={() => setAdminResources(p => p.filter(x => x.id !== r.id))}>Remove</button>
              </div>
            ))}
            {visibleDefaultResources.map(r => (
              <div key={r.id} className="admin-item">
                <div className="admin-item-info">
                  <strong>{r.label}</strong>
                  <span>{r.path || r.url}</span>
                </div>
                <button className="admin-remove-btn" onClick={() => setHiddenResources(p => [...p, r.id])}>Hide</button>
              </div>
            ))}
          </div>

          {hiddenDefaultResources.length > 0 && (
            <>
              <h3>Hidden Resources</h3>
              <div className="admin-list">
                {hiddenDefaultResources.map(r => (
                  <div key={r.id} className="admin-item admin-item--hidden">
                    <div className="admin-item-info"><strong>{r.label}</strong></div>
                    <button className="admin-restore-btn" onClick={() => setHiddenResources(p => p.filter(id => id !== r.id))}>Restore</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
