import React, { useState } from 'react';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Nav = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar is-dark">
      <div className="navbar-brand">
        <a className="navbar-item is-size-5">
          scrytable
        </a>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          onClick={() => setShowMenu(!showMenu)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={showMenu ? "navbar-menu is-active" : "navbar-menu"}>
        <div className="navbar-start">

        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <button className="button is-small is-rounded is-primary is-light">
              <span className="icon">
                <FontAwesomeIcon icon={faSignInAlt} />
              </span>
              <span>Join a game</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav;