import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/pages.css';

const GlobalHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/users/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error("Error during logout:", err);
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <header className="global-header">
      <div className="header-content">
        <div className="header-left">
          <img 
            src="https://imgs.search.brave.com/bgkyyiKg8U7hQzORqygYvLImsJ3AZ1hVtwRZg-nYjvY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvcGFjbWFuL3Nt/YWxsL3BhY21hbl9Q/Tkc5OC5wbmc" 
            alt="Pacman Logo" 
            className="header-logo"
          />
          <h1 className="header-title">Pacman Game</h1>
        </div>
        <div className="header-right">
          <button className="header-button" onClick={() => navigate('/profile')}>
            Profile
          </button>
          <button className="header-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader; 