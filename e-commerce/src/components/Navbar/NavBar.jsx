import React from "react";
import { Link, NavLink } from "react-router-dom";
import auth from "../../firebase.config";
import { useAuthState } from 'react-firebase-hooks/auth'
import './Navbar.css'
import {signOut} from 'firebase/auth'
import Loading from "../Shared/Loading";
function NavBar() {
  const [user,loading] = useAuthState(auth);
  const handleSignOut = () => {
    signOut(auth);
  }
  return (
    <>
        {
            loading && <Loading/>
        }
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            E-Commerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link"  to="products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="order-list">
                  Order list
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/upload-product">
                  Upload Product
                </NavLink>
              </li>
            </ul>
            <div>
              <span className="navbar-text">{user && user?.displayName}</span>
              {
                  user ? <button  onClick={handleSignOut} className="btn btn-info" style={{ marginLeft: "15px" }}>
                  Log Out
                </button> : <Link to='/login' className="btn btn-danger" style={{ marginLeft: "15px" }}>
                 Login
              </Link>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
