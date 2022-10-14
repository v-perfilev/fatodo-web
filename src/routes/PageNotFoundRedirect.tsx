import React, {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {RootRoutes} from './RootRouter';

const PageNotFoundRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(RootRoutes.PAGE_NOT_FOUND);
  });

  return <Outlet />;
};

export default PageNotFoundRedirect;
