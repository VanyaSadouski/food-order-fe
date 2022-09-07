import { Badge, Menu } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { adminRoutes, authRoutes, publicRoutes } from '../routes';
import { removeUserInfo } from '../store/user';
import { CART, KITCHEN } from '../util/consts';

const menuStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
};

const MenuWrapper = styled.div`
  .ant-badge {
    display: block;
    width: 90%;
  }
`;

function getNavLink(path, title) {
  return <NavLink to={path}> {title} </NavLink>;
}

function getPublicLinks() {
  return publicRoutes;
}

function getAuthLinks(isAuth, isAdmin) {
  let links;
  if (isAuth) {
    links = authRoutes;
    if (isAdmin) {
      links = adminRoutes.concat(authRoutes);
    }
  }
  return links;
}

function Navbar() {
  const location = useLocation();
  const userInfo = useSelector((state) => state?.user?.userInfo);
  const orderInfo = useSelector((state) => state?.order?.orderInfo);
  const isAdmin = userInfo?.isAdmin;
  const isAuthenticated = userInfo?.authenticated;
  const userName = userInfo?.firstName;
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(removeUserInfo());
  };

  const publicLinks = getPublicLinks()?.map(({ path, name }) => (
    <Menu.Item key={path}>{getNavLink(path, name)}</Menu.Item>
  ));

  const settingLinks = getAuthLinks(isAuthenticated, isAdmin)
    ?.filter(({ path }) => path !== KITCHEN)
    .map(({ path, name }) => {
      if (path === CART && orderInfo) {
        return (
          <Menu.Item key={path}>
            {' '}
            <Badge style={{ left: '25px' }} size="small" count={orderInfo.length}>
              {getNavLink(path, name)}
            </Badge>
          </Menu.Item>
        );
      }
      return <Menu.Item key={path}>{getNavLink(path, name)}</Menu.Item>;
    });

  const authLinks = (
    <>
      <Menu.Item key={KITCHEN}>{getNavLink(KITCHEN, 'Food')}</Menu.Item>
      <Menu.SubMenu key="SubMenu" title={userName}>
        {settingLinks}
        <Menu.Item onClick={handleLogout} key="logout">
          Log out
        </Menu.Item>
      </Menu.SubMenu>
    </>
  );

  return (
    <MenuWrapper>
      <Menu selectedKeys={location.pathname} style={menuStyle} mode="horizontal">
        {isAuthenticated ? authLinks : publicLinks}
      </Menu>
    </MenuWrapper>
  );
}

export default Navbar;
