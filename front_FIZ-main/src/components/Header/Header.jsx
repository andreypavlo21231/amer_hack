import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Header.css';
import logoTeam from '../../img/logo/logo-team.svg';
import logoCompany from '../../img/logo/logo-company.svg';
import profileIcon from '../../img/icons/header-default-user-icon.png';

function Header() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 1400px)").matches);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    const role = localStorage.getItem('userRole');
    if (id) {
      setUserId(id);
    }
    if (role) {
      setUserRole(role);
    }
  }, []);

  const hiddenImagePaths = [
    '/',
    '/reset-password',
    '/register-employee',
    '/register-worker',
    '/auth-worker',
    '/auth-employee',
  ];

  const showImage = !hiddenImagePaths.includes(location.pathname);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 1400px)").matches);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const workerNavItems = [
    { path: `/choice-company/${userId}`, label: 'Choosing employers' },
  ];

  const employerNavItems = [
    { path: `/choice-worker/${userId}`, label: 'Employee selection' },
  ];

  const navItems = userRole === 'Worker' ? workerNavItems : employerNavItems;
  const profilePath = userRole === 'Employer' ? `/company-profile/${userId}` : `/profile/${userId}`;

  return (
    <div className="header__content">
      {showImage && (
        <>
          <div className="header__logo">
            <img className="header__logo-image" src={logoCompany} alt="Company logo"/>
            <img className="header__logo-image" src={logoTeam} alt="The team's logo" style={{width: '11.5rem'}} />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {navItems.map((item) => (
                <li key={item.path} className={`header__nav-item ${location.pathname === item.path ? 'active' : ''}`}>
                  <Link to={item.path} className="header__nav-link" onClick={item.onClick}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="header__nav-item">
                <button className="header__nav-button" onClick={() => window.location.href = profilePath}>
                  <img src={profileIcon} alt="Profile" className="header__nav-button-icon" />
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default Header;
