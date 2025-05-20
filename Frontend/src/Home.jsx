import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Code Reviewer</h1>
      <p>
        Write, review, and improve your code with our AI-powered code review tool. Paste your code, get instant feedback, and enhance your programming skills.
      </p>
      <Link to="/review">

        <button className="start-button">
          Start Reviewing Code
        </button>
      </Link>
    </div>
  );
}

export default Home;