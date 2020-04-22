import * as React from 'react';
import './header.scss';
import { Logo } from './logo';
import Menu from './menu';

const Header = () => {
  return (
    <div className="header">
      <Logo/>
      <Menu/>
    </div>
  );
}

export default Header;
