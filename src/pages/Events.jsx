import { useState, useMemo } from "react";
import "./Events.css";

import flyer4 from "../assets/flyer4.png";
import flyer2 from "../assets/flyer2.png";
import flyer3 from "../assets/flyer3.png";

const STATIC_FLYERS = {
  flyer4: { id: "flyer4", src: flyer4, alt: "Black in A.A. Panel: The History of Black A.A. Groups Flyer", category: "upcoming" },
  flyer2: { id: "flyer2", src: flyer2, alt: "Our Recovery in Color Podcast Flyer", category: "ongoing" },
  flyer3: { id: "flyer3", src: flyer3, alt: "Our Recovery in Color New Book Release Flyer", category: "ongoing" },
};

function Events() {
  const [selectedFlyer, setSelectedFlyer] = useState(null);

  const { upcomingFlyers, ongoingFlyers } = useMemo(() => {
    const hidden = JSON.parse(localStorage.getItem("admin_hidden_events") || "[]");
    const adminEvents = JSON.parse(localStorage.getItem("admin_events") || "[]");

    const visible = Object.values(STATIC_FLYERS).filter(f => !hidden.includes(f.id));
    const adminMapped = adminEvents.map(ev => ({ id: ev.id, src: ev.imageUrl, alt: ev.title, category: ev.category }));
    const all = [...visible, ...adminMapped];

    return {
      upcomingFlyers: all.filter(f => f.category === "upcoming"),
      ongoingFlyers: all.filter(f => f.category === "ongoing"),
    };
  }, []);

  return (
    <div className="page">
      <h2>Events & Announcements</h2>

      <h3>Upcoming Events</h3>
      <div className="flyers-grid">
        {upcomingFlyers.length > 0 ? (
          upcomingFlyers.map((flyer) => (
            <img
              key={flyer.id}
              src={flyer.src}
              alt={flyer.alt}
              className="flyer-thumbnail"
              onClick={() => setSelectedFlyer(flyer)}
            />
          ))
        ) : (
          <p className="no-results">No upcoming events at this time. Check back soon!</p>
        )}
      </div>

      <h3>Ongoing Events</h3>
      <div className="flyers-grid">
        {ongoingFlyers.length > 0 ? (
          ongoingFlyers.map((flyer) => (
            <img
              key={flyer.id}
              src={flyer.src}
              alt={flyer.alt}
              className="flyer-thumbnail"
              onClick={() => setSelectedFlyer(flyer)}
            />
          ))
        ) : (
          <p className="no-results">No ongoing events at this time.</p>
        )}
      </div>

      {selectedFlyer && (
        <div className="flyer-overlay" onClick={() => setSelectedFlyer(null)}>
          <button className="flyer-close">✕</button>
          <img
            src={selectedFlyer.src}
            alt={selectedFlyer.alt}
            className="flyer-fullscreen"
          />
        </div>
      )}
    </div>
  );
}

export default Events;
