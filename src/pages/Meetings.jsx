import { useState, useEffect, useMemo } from 'react'
import './Meetings.css'

function Meetings() {
  const [meetings, setMeetings] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDay, setSelectedDay] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedTime, setSelectedTime] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
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
  const locations = ['All', 'Virtual', 'In-Person']
  const timePeriods = ['All', 'Early Morning (12-6 AM)', 'Morning (6-12 PM)', 'Afternoon (12-5 PM)', 'Evening (5-9 PM)', 'Night (9 PM-12 AM)']

  const getTimePeriod = (timeStr) => {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
    if (!match) return 'All'
    let hour = parseInt(match[1])
    const period = match[3].toUpperCase()
    if (period === 'PM' && hour !== 12) hour += 12
    if (period === 'AM' && hour === 12) hour = 0
    if (hour >= 0 && hour < 6) return 'Early Morning (12-6 AM)'
    if (hour >= 6 && hour < 12) return 'Morning (6-12 PM)'
    if (hour >= 12 && hour < 17) return 'Afternoon (12-5 PM)'
    if (hour >= 17 && hour < 21) return 'Evening (5-9 PM)'
    return 'Night (9 PM-12 AM)'
  }

  const fellowshipTypes = useMemo(() => {
    const types = new Set()
    meetings.forEach(m => {
      const type = m.fellowship.split(' - ')[0].split(' — ')[0].trim()
      types.add(type)
    })
    return ['All', ...Array.from(types).sort()]
  }, [meetings])

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch =
      meeting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.fellowship.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDay = selectedDay === 'All' || meeting.day.includes(selectedDay)
    const matchesLocation = selectedLocation === 'All' ||
      (selectedLocation === 'Virtual' && meeting.location.toLowerCase() === 'virtual') ||
      (selectedLocation === 'In-Person' && meeting.location.toLowerCase() !== 'virtual')
    const matchesTime = selectedTime === 'All' || getTimePeriod(meeting.time) === selectedTime
    const matchesType = selectedType === 'All' || meeting.fellowship.startsWith(selectedType)
    return matchesSearch && matchesDay && matchesLocation && matchesTime && matchesType
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

        <div className="dropdown-filters">
          <div className="filter-group">
            <label className="filter-label">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="filter-select"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Time</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="filter-select"
            >
              {timePeriods.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              {fellowshipTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
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
