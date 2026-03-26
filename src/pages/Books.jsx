import { useNavigate } from 'react-router-dom'
//import './Books.css'

const booksList = [
  { id: 1, title: 'EXAMPLE', url: 'https://www.aa.org/the-big-book' },
]

function Books() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <h2>Books</h2>
      <p className="subpage-note">
        The following books are recommended readings related to BIPOC & Recovery.
      </p>

      <ul className="links-list">
        {booksList.map(book => (
          <li key={book.id}>
            <a href={book.url} target="_blank" rel="noopener noreferrer">
              {book.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Books