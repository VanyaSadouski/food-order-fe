import { Menu } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { adminRoutes, authRoutes, publicRoutes } from '../routes';
import { PERSONAL_INFO } from '../util/consts';

const menuStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
};

function getNavLink(path, title, userName = '') {
  if (path === PERSONAL_INFO) {
    return <NavLink to={path}> {userName} </NavLink>;
  }
  return <NavLink to={path}> {title} </NavLink>;
}

function getLinks(isAdmin = false, isAuth = false) {
  let links;
  if (isAuth) {
    if (isAdmin) {
      links = authRoutes.concat(adminRoutes);
    } else {
      links = authRoutes;
    }
  } else {
    links = publicRoutes;
  }
  return links;
}

function Navbar() {
  const isAdmin = useSelector((state) => state?.user?.isAdmin);
  const isAuthenticated = useSelector((state) => state?.user?.authenticated);
  const userName = useSelector((state) => state?.user?.firstName);

  const links = getLinks(isAdmin, isAuthenticated).map(({ path, name }) => (
    <Menu.Item key={path}>{getNavLink(path, name, userName)}</Menu.Item>
  ));
  return (
    <div>
      <Menu style={menuStyle} mode="horizontal">
        {links}
      </Menu>
    </div>
  );
}

export default Navbar;
