import React, { useContext } from 'react';

import { ConfigContext } from '../../../contexts/ConfigContext';
import useWindowSize from '../../../hooks/useWindowSize';

import NavLogo from './NavLogo';
import NavContent from './NavContent';
import navigation from '../../../menu-items';
import navigationProfesseur from '../../../menu-items-professeurs'; // Correct import path
import navigationEtudiant from '../../../menu-items-etudiant';

const Navigation = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const configContext = useContext(ConfigContext);
  const { layoutType, collapseMenu } = configContext.state;
  const windowSize = useWindowSize();

  let navClass = ['pcoded-navbar'];
  navClass = [...navClass, layoutType];

  if (windowSize.width < 992 && collapseMenu) {
    navClass = [...navClass, 'mob-open'];
  } else if (collapseMenu) {
    navClass = [...navClass, 'navbar-collapsed'];
  }

  let navBarClass = ['navbar-wrapper'];
  let sidebarNavigation = navigation; // Default navigation

  if (user) {
    if (user.roles.some(role => role.name === 'ROLE_ADMIN')) {
      sidebarNavigation = navigation;
    } else if (user.roles.some(role => role.name === 'ROLE_PROFESSOR')) {
      sidebarNavigation = navigationProfesseur; // Set professor navigation
    } else if (user.roles.some(role => role.name === 'ROLE_ETUDIANT')) {
      sidebarNavigation = navigationEtudiant;
    }
  } else {
    throw new Error('Error retrieving user data');
  }

  let navContent = (
    <div className={navBarClass.join(' ')}>
      <NavLogo />
      <NavContent navigation={sidebarNavigation.items} /> {/* Pass the appropriate navigation items */}
    </div>
  );

  if (windowSize.width < 992) {
    navContent = (
      <div className="navbar-wrapper">
        <NavLogo />
        <NavContent navigation={sidebarNavigation.items} /> {/* Pass the appropriate navigation items */}
      </div>
    );
  }

  return (
    <React.Fragment>
      <nav className={navClass.join(' ')}>{navContent}</nav>
    </React.Fragment>
  );
};

export default Navigation;
