/* eslint-disable no-nested-ternary */
import { React } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { adminRoutes, authRoutes, publicRoutes } from '../routes';
import { KITCHEN } from '../util/consts';

function getRoute(path, Component) {
  return <Route key={path} path={path} element={<Component />} />;
}

function AppRouter() {
  const userInfo = useSelector((state) => state?.user?.userInfo);
  const isAdmin = userInfo?.isAdmin;
  const isAuthenticated = userInfo?.authenticated;

  const availableRoutes =
    isAdmin && isAuthenticated
      ? authRoutes.concat(adminRoutes).map(({ path, Component }) => getRoute(path, Component))
      : isAuthenticated
      ? authRoutes.map(({ path, Component }) => getRoute(path, Component))
      : publicRoutes.map(({ path, Component }) => getRoute(path, Component));

  return (
    <Routes>
      {availableRoutes}
      <Route path="/" element={<Navigate to={KITCHEN} />} />
      <Route path="*" element={<Navigate to={KITCHEN} />} />
    </Routes>
  );
}

export default AppRouter;
