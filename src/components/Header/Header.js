import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { ReactComponent as DisplayIcon } from '../../assets/icons_FEtask/Display.svg';
import { ReactComponent as DropdownIcon } from '../../assets/icons_FEtask/Dropdown.svg';

const Header = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleGroupingChange = (option) => {
    setGroupBy(option);
    setIsDropdownOpen(false);
  };

  const handleSortingChange = (option) => {
    setSortBy(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="header">
      <div className="display-button-container" ref={dropdownRef}>
        <button
          className="display-button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          <DisplayIcon className="display-icon" />
          <span className="display-text">Display</span>
          <DropdownIcon className="dropdown-icon" />
        </button>
        {isDropdownOpen && (
          <div className="dropdown">
            <div className="dropdown-section">
              <span className="dropdown-section-title">Grouping</span>
              <button
                className={`dropdown-button ${
                  groupBy === 'status' ? 'active' : ''
                }`}
                onClick={() => handleGroupingChange('status')}
              >
                By Status
              </button>
              <button
                className={`dropdown-button ${
                  groupBy === 'user' ? 'active' : ''
                }`}
                onClick={() => handleGroupingChange('user')}
              >
                By User
              </button>
              <button
                className={`dropdown-button ${
                  groupBy === 'priority' ? 'active' : ''
                }`}
                onClick={() => handleGroupingChange('priority')}
              >
                By Priority
              </button>
            </div>
            <div className="dropdown-section">
              <span className="dropdown-section-title">Ordering</span>
              <button
                className={`dropdown-button ${
                  sortBy === 'priority' ? 'active' : ''
                }`}
                onClick={() => handleSortingChange('priority')}
              >
                By Priority
              </button>
              <button
                className={`dropdown-button ${
                  sortBy === 'title' ? 'active' : ''
                }`}
                onClick={() => handleSortingChange('title')}
              >
                By Title
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
