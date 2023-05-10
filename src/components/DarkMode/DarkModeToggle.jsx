import { useState } from 'react';
import './DarkModeToggle.css'

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode'); // Añade o quita una clase en el body para aplicar estilos CSS
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