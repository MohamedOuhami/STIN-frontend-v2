import React, { useState } from 'react';
import { ListGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ChatList from './ChatList';

import { useAuth } from '../../../../contexts/authContext';

const NavRight = () => {
  const [listOpen, setListOpen] = useState(false);
  const { logout } = useAuth();

  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    localStorage.setItem('userId', user.id);
  }

  console.log('This is the user', user);

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align="start" className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                {user && (
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                )}
                <Link to="#" className="dud-logout" title="Logout">
                  <i className="feather icon-log-out" />
                </Link>
              </div>
              <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-user" /> Profile
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <button onClick={logout} className="dropdown-item">
                    <i className="feather icon-log-out" /> Logout
                  </button>
                </ListGroup.Item>
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
      <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
    </React.Fragment>
  );
};

export default NavRight;
