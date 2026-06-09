import { useState, useEffect } from 'react'
import './Meetings.css'

const PAGE_SIZE = 15

const FELLOWSHIP_FILTERS = [
  { label: 'All',                                   test: () => true },
  { label: 'Alcoholics Anonymous (AA)',              test: f => /\bAA\b/i.test(f) || /alcoholics anonymous/i.test(f) },
  { label: 'Adult Children of Alcoholics (ACA)',     test: f => /\bACA\b/i.test(f) || /adult children/i.test(f) },
  { label: 'Al-Anon Family Groups (AFG)',            test: f => /al-anon/i.test(f) || /\bAFG\b/i.test(f) },
  { label: 'All Recovery',                           test: f => /all recovery/i.test(f) },
  { label: 'Crystal Meth Anonymous (CMA)',           test: f => /^CMA\b/i.test(f) || /crystal meth anonymous/i.test(f) },
  { label: 'Codependents Anonymous (CODA)',          test: f => /\bCODA\b/i.test(f) || /\bCoDA\b/i.test(f) || /codependents anonymous/i.test(f) },
  { label: 'Debtors Anonymous',                      test: f => /debtors anonymous/i.test(f) },
  { label: 'Clutterers Anonymous (CLA)',             test: f => /clutterers anonymous/i.test(f) || /\bCLA\b/i.test(f) },
  { label: 'Eating Disorders Anonymous',             test: f => /eating disorders anonymous/i.test(f) },
  { label: 'Emotions Anonymous',                     test: f => /emotions anonymous/i.test(f) },
  { label: 'Marijuana Anonymous (MA)',               test: f => /marijuana anonymous/i.test(f) },
  { label: 'Mindfulness Meditation Recovery',        test: f => /mindfulness meditation recovery/i.test(f) },
  { label: 'Narcotics Anonymous (NA)',               test: f => /narcotics anonymous/i.test(f) },
  { label: 'Overeaters Anonymous (OA)',              test: f => /overeaters anonymous/i.test(f) || /^OA\b/i.test(f) },
  { label: 'Recovery Dharma',                        test: f => /recovery dharma/i.test(f) },
  { label: 'Sex and Love Addicts Anonymous (SLAA)',  test: f => /\bSLAA\b/i.test(f) || /sex and love addicts/i.test(f) },
  { label: 'SMART Recovery',                         test: f => /smart recovery/i.test(f) },
  { label: 'Sexual Compulsive Anonymous (SCA)',      test: f => /sexual compulsive anonymous/i.test(f) },
  { label: 'Survivors of Incest Anonymous (SIA)',    test: f => /survivors? of incest anonymous/i.test(f) },
  { label: 'Underearners Anonymous (UA)',            test: f => /underearners anonymous/i.test(f) },
  { label: 'Wellbriety',                             test: f => /wellbriety/i.test(f) },
  { label: 'Sex and Porn Addicts Anonymous (SPAA)',  test: f => /SPAA/i.test(f) || /sex and porn addicts/i.test(f) },
  { label: 'Sober Black Girls Club',                 test: f => /sober black girls club/i.test(f) },
]

function Meetings() {
  const [meetings, setMeetings] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDay, setSelectedDay] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedTime, setSelectedTime] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch('/meetings.json')
      .then(res => res.json())
      .then(data => {
        const hidden = JSON.parse(localStorage.getItem('admin_hidden_meetings') || '[]')
        const adminAdded = JSON.parse(localStorage.getItem('admin_meetings') || '[]')
        const visible = data.filter(m => !hidden.includes(m.id))
        setMeetings([...visible, ...adminAdded])
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
    const activeFilter = FELLOWSHIP_FILTERS.find(f => f.label === selectedType) ?? FELLOWSHIP_FILTERS[0]
    const matchesType = activeFilter.test(meeting.fellowship)
    return matchesSearch && matchesDay && matchesLocation && matchesTime && matchesType
  })

  const totalPages = Math.max(1, Math.ceil(filteredMeetings.length / PAGE_SIZE))
  const paginatedMeetings = filteredMeetings.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedDay, selectedLocation, selectedTime, selectedType])

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
              {FELLOWSHIP_FILTERS.map(({ label }) => (
                <option key={label} value={label}>{label}</option>
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
        {paginatedMeetings.length > 0 ? (
          paginatedMeetings.map(meeting => (
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

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setCurrentPage(p => p - 1)}
            disabled={currentPage === 1}
          >
            &#8592; Previous
          </button>
          <span className="page-counter">{currentPage} of {totalPages}</span>
          <button
            className="page-btn"
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage === totalPages}
          >
            Next &#8594;
          </button>
        </div>
      )}
    </div>
  )
}

export default Meetings
