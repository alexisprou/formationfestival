import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../css/Menu.css';

const Menu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLinkClick = (path) => {
    setMenuVisible(false);
    navigate(path);
  };

  useEffect(() => {
    // Ajoute ou retire la classe 'menu-visible' du menu pour le body
    if (menuVisible) {
      document.body.classList.add('menu-visible');
    } else {
      document.body.classList.remove('menu-visible');
    }
  }, [menuVisible]);

  return (
    <div className={`menu-container ${menuVisible ? 'active' : ''}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <nav className={`menu ${menuVisible ? 'visible' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => handleLinkClick('/')}>
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/billeterie" onClick={() => handleLinkClick('/billeterie')}>
              Billeterie
            </Link>
          </li>
          <li>
            <Link to="/carte" onClick={() => handleLinkClick('/carte')}>
              Carte Interractive
            </Link>
          </li>
          <li>
            <Link to="/concerts" onClick={() => handleLinkClick('/concerts')}>
              Concerts
            </Link>
          </li>
          <li>
            <Link to="/faq" onClick={() => handleLinkClick('/faq')}>
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/partenaires" onClick={() => handleLinkClick('/partenaires')}>
              Partenaires
            </Link>
          </li>
          <li>
            <Link to="/programme" onClick={() => handleLinkClick('/programme')}>
              Programme
            </Link>
          </li>
          <li>
            <Link to="/reseaux" onClick={() => handleLinkClick('/reseaux')}>
              Reseaux
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Menu;
