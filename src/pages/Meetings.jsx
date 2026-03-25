import { useState } from 'react'
import './Meetings.css'

// Placeholder data - replace with actual Excel data later
const meetingsData = [
  { id: 1, name: 'AA Meeting - Downtown', day: 'Monday', time: '7:00 PM', location: '123 Main St' },
  { id: 2, name: 'NA Meeting - Westside', day: 'Tuesday', time: '6:30 PM', location: '456 Oak Ave' },
  { id: 3, name: 'AA Meeting - Sunrise Group', day: 'Wednesday', time: '8:00 AM', location: '789 Elm St' },
  { id: 4, name: 'Recovery Support Group', day: 'Thursday', time: '5:00 PM', location: '321 Pine Rd' },
  { id: 5, name: 'NA Meeting - Evening Serenity', day: 'Friday', time: '7:30 PM', location: '654 Maple Dr' },
]

function Meetings() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMeetings = meetingsData.filter(meeting =>
    meeting.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="page">
      <h2>Meetings</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search meetings by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="meetings-list">
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map(meeting => (
            <div key={meeting.id} className="meeting-card">
              <h3 className="meeting-name">{meeting.name}</h3>
              <p className="meeting-detail"><strong>Day:</strong> {meeting.day}</p>
              <p className="meeting-detail"><strong>Time:</strong> {meeting.time}</p>
              <p className="meeting-detail"><strong>Location:</strong> {meeting.location}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No meetings found matching "{searchTerm}"</p>
        )}
      </div>
    </div>
  )
}

export default Meetings
