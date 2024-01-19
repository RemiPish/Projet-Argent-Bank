import React from 'react';
import './Header.scss';
import logo from '../../assets/img/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser} from '../../redux/authSlice';
import { selectUser } from '../../redux/userSlice';

export default function Header() {
  const authUser = useSelector(selectAuthUser);
  const user = useSelector(selectUser);
  const firstName = user ? user.firstName : null;

  // changement d'affichage quand on est connecté ou non
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
      </Link>
      {!authUser && (
        <div>
          <Link className="main-nav-item" to="/signin">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      )}
      {authUser && firstName && (
        <div>
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            {firstName}
          </Link>
          <Link className="main-nav-item" to="/signout">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      )}
    </nav>
  );
}
