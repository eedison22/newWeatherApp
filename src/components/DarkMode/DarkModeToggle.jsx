import { useState } from 'react';
import './DarkModeToggle.css'

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode'); 
  const backgroundDiv = document.querySelector('.background');
  backgroundDiv.classList.toggle('dark-mode-background');
  };

  return (
    <div className="dark-mode-toggle">
      <label htmlFor="dark-mode-checkbox">Dark Mode</label>
      <input
        type="checkbox"
        id="dark-mode-checkbox"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
    </div>
  );
}

export default DarkModeToggle;