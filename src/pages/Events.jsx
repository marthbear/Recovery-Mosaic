import { useState } from "react";
import "./Events.css";

// Upcoming Events
import flyer1 from "../assets/flyer1.png";

// Ongoing Events
import flyer2 from "../assets/flyer2.png";
import flyer3 from "../assets/flyer3.png";

const upcomingFlyers = [];

const ongoingFlyers = [
  { id: 2, src: flyer2, alt: "Ongoing Event Flyer 1" },
  { id: 3, src: flyer3, alt: "Ongoing Event Flyer 2" },
];

function Events() {
  const [selectedFlyer, setSelectedFlyer] = useState(null);

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
          <p className="no-results">
            No upcoming events at this time. Check back soon!
          </p>
        )}
      </div>

      <h3>Ongoing Events</h3>
      <div className="flyers-grid">
        {ongoingFlyers.map((flyer) => (
          <img
            key={flyer.id}
            src={flyer.src}
            alt={flyer.alt}
            className="flyer-thumbnail"
            onClick={() => setSelectedFlyer(flyer)}
          />
        ))}
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
