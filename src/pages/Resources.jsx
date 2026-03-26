import { useNavigate } from 'react-router-dom'
import './Resources.css'

function Resources() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <h1>Resources on BIPOC & Recovery</h1>

      <div className="resources-note">
        <p>
          <strong>Note:</strong> We currently need meeting <strong>scripts</strong> to share with BIPOC members who would like to start their own BIPOC Recovery group. Please contact the moderaters if you would like to share your group's meeting script.
        </p>
        <p>
          <strong>Please contact this email for resource list updates and/or People of Color (POC) meeting script samples:</strong> bipocmeetingmoderators@gmail.com
        </p>
      </div>

      <div className="resources-buttons">
        <button onClick={() => navigate('/resources/books')}>Books</button>
        <button onClick={() => navigate('/resources/articles')}>Articles</button>
        <button onClick={() => navigate('/resources/wellbriety-movement')}>Wellbriety Movement</button>
        <button onClick={() => navigate('/resources/pamphlets')}>AA Pamphlets</button>
        <button onClick={() => navigate('/resources/aa-literature')}>AA Literature</button>
        <button onClick={() => navigate('/resources/al-anon')}>Al-Anon Free Literature</button>
        <button onClick={() => navigate('/resources/professionals')}>Resources from Professionals</button>
        <button onClick={() => navigate('/resources/information')}>Additional Information</button>
      </div>
    </div>
  )
}

export default Resources