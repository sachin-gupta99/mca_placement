import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { BiStats } from 'react-icons/bi';
import { RiTeamFill } from 'react-icons/ri';
import { FaSignInAlt } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { GoOrganization } from 'react-icons/go';
import { PiSignOutBold } from 'react-icons/pi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
  const [navItems, setNavItems] = useState([]);
  const token = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get('http://localhost:5000/profile', { headers })
      .then(response => {
        console.log(response);
        setIsAuthenticated(true);
      })
      .catch(error => {
        console.error(error);
        setIsAuthenticated(false);
      });
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      setNavItems([
        {
          to: '/',
          label: 'Home',
          icon: <FaHome />,
        },
        {
          to: 'stats',
          label: 'Stats',
          icon: <BiStats />,
        },
        {
          to: 'teams',
          label: 'Teams',
          icon: <RiTeamFill />,
        },
        {
          to: 'users',
          label: 'Users',
          icon: <FaUsers />,
        },
        {
          to: 'companies',
          label: 'Companies',
          icon: <GoOrganization />,
        },
      ]);
    } else {
      setNavItems([
        {
          to: '/',
          label: 'Home',
          icon: <FaHome />,
        },
        {
          to: 'stats',
          label: 'Stats',
          icon: <BiStats />,
        },
        {
          to: 'teams',
          label: 'Teams',
          icon: <RiTeamFill />,
        },
        {
          to: 'auth/signin',
          label: 'Auth',
          icon: <FaSignInAlt />,
          children: [
            {
              to: '/signin',
            },
            {
              to: '/signup',
            },
          ],
        },
      ]);
    }
  }, [isAuthenticated]);

  const onSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <nav className="nav">
        <NavLink to="/" aria-label="Home" className="nav__logo">
          <span>MCA</span>
        </NavLink>
        <div className="nav__list">
          {navItems.map(item => (
            <NavLink to={item.to} aria-label={item.label} key={item.content}>
              {item.icon}
            </NavLink>
          ))}
          {token && (
            <div className="nav__signout" aria-label="Sign Out" onClick={onSignOut}>
              <PiSignOutBold />
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
