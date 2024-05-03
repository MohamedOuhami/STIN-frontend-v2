import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import navigation from '../../../menu-items';
import navigationProfesseur from '../../../menu-items-professeurs'; // Correct import path
import navigationEtudiant from '../../../menu-items-etudiant';
import { BASE_TITLE } from '../../../config/constant';
import { useAuth } from '../../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../../contexts/userDataContext';

const Breadcrumb = () => {
  const location = useLocation();

  const [main, setMain] = useState([]);
  const [item, setItem] = useState([]);
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { updateUserData } = useUserData();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const authToken = `Bearer ${token}`;
      try {
        if (token) {
          const response = await fetch(`http://localhost:8080/api/v1/auth/userinfo`, {
            headers: {
              Authorization: authToken
            }
          });
          if (response.ok) {
            const userData = await response.json();
            updateUserData(userData);
            localStorage.setItem('user', JSON.stringify(userData));

            let sidebarNavigation = navigationProfesseur; // Default navigation

            if (userData.roles.some(role => role.name === 'ROLE_ADMIN')) {
              sidebarNavigation = navigation;
            } else if (userData.roles.some(role => role.name === 'ROLE_PROFESSOR')) {
              sidebarNavigation = navigationProfesseur; // Set professor navigation
            } else if (userData.roles.some(role => role.name === 'ROLE_ETUDIANT')) {
              sidebarNavigation = navigationEtudiant;
            }

            sidebar(sidebarNavigation); // Call sidebar with the appropriate navigation
          } else {
            throw new Error('Error retrieving user data');
          }
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
        logout();
        navigate('/login');
      }
    };
    fetchUserData();
  }, [updateUserData]); // Include updateUserData as a dependency

  if (!isLoggedIn) {
    navigate('/login');
  }

  const sidebar = navigationBar => {
    navigationBar.items.forEach(item => {
      if (item.type && item.type === 'group') {
        getCollapse(item);
      }
    });
  };

  const getCollapse = item => {
    if (item.children) {
      item.children.forEach(collapse => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === 'item') {
          if (location.pathname === collapse.url) {
            setMain(item);
            setItem(collapse);
          }
        }
      });
    }
  };

  let mainContent, itemContent;
  let breadcrumbContent = '';
  let title = '';

  if (main && main.type === 'collapse') {
    mainContent = (
      <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
        <Link to="#">{main.title}</Link>
      </ListGroup.Item>
    );
  }

  if (item && item.type === 'item') {
    title = item.title;
    itemContent = (
      <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
        <Link to="#">{title}</Link>
      </ListGroup.Item>
    );

    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <div className="page-header">
          <div className="page-block">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="page-header-title">
                  <h5 className="m-b-10">{title}</h5>
                </div>
                <ListGroup as="ul" bsPrefix=" " className="breadcrumb">
                  <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
                    <Link to="/">
                      <i className="feather icon-home" />
                    </Link>
                  </ListGroup.Item>
                  {mainContent}
                  {itemContent}
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
      );
    }

    document.title = title + BASE_TITLE;
  }

  return <React.Fragment>{breadcrumbContent}</React.Fragment>;
};

export default Breadcrumb;
