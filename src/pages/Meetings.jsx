import { useState, useEffect } from 'react'
import './Meetings.css'

function Meetings() {
  const [meetings, setMeetings] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDay, setSelectedDay] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/meetings.json')
      .then(res => res.json())
      .then(data => {
        setMeetings(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading meetings:', err)
        setLoading(false)
      })
  }, [])

  const days = ['All', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch =
      meeting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.fellowship.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDay = selectedDay === 'All' || meeting.day.includes(selectedDay)
    return matchesSearch && matchesDay
  })

  if (loading) {
    return (
      <div className="page">
        <h2>Meetings</h2>
        <p>Loading meetings...</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h2>Meetings</h2>
      <p className="meetings-count">{filteredMeetings.length} meetings found</p>

      <div className="filters-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, fellowship, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="day-filter">
          {days.map(day => (
            <button
              key={day}
              className={`day-btn ${selectedDay === day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="meetings-list">
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map(meeting => (
            <div key={meeting.id} className="meeting-card">
              <h3 className="meeting-name">{meeting.name}</h3>
              <p className="meeting-fellowship">{meeting.fellowship}</p>
              <div className="meeting-details">
                <p className="meeting-detail"><strong>Day:</strong> {meeting.day}</p>
                <p className="meeting-detail"><strong>Time:</strong> {meeting.time} (Pacific)</p>
                <p className="meeting-detail"><strong>Location:</strong> {meeting.location}</p>
              </div>
              {meeting.zoomLink && (
                <a
                  href={meeting.zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zoom-link"
                >
                  Join Zoom Meeting
                </a>
              )}
              {meeting.meetingId && (
                <p className="meeting-detail"><strong>Meeting ID:</strong> {meeting.meetingId}</p>
              )}
              {meeting.password && (
                <p className="meeting-detail"><strong>Password:</strong> {meeting.password}</p>
              )}
              {meeting.notes && (
                <p className="meeting-notes">{meeting.notes}</p>
              )}
            </div>
          ))
        ) : (
          <p className="no-results">No meetings found matching your criteria</p>
        )}
      </div>
    </div>
  )
}

export default Meetings
