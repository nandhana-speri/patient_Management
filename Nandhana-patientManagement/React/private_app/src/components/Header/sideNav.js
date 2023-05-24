import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Outlet, useNavigate } from 'react-router-dom';
import './index.css';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Footer from '../Footer/footer';
import { logout } from '../../action';
import { useDispatch } from 'react-redux';

const SideNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNav, setShowNav] = useState(true);
  const { role } = useSelector((state) => state.commonReducer);

  return (
    <div>
      <div className={`body-area${showNav ? ' body-pd' : ''}`}>
        <header className={`header${showNav ? ' body-pd' : ''}`}>
          <div className="header_toggle">
            <i
              className={`bi ${showNav ? 'bi-x' : 'bi-list'}`}
              onClick={() => setShowNav(!showNav)}
            />
            <Navbar.Brand className="logos" href="http://localhost:3000">
              MEDWIN CARE
            </Navbar.Brand>
          </div>
        </header>
        <div className={`l-navbar${showNav ? ' shows' : ''}`}>
          <nav className="nav" style={{ flex: '1 1 0%' }}>
            <div>
              <a
                onClick={() => navigate('/dashboard')}
                target="_blank"
                className="nav_logo"
                rel="noopener"
              >
                <i className="fa-solid fa-house-user"></i>
                <span className="nav_logo-name">Dashboard</span>
              </a>
              <div className="nav_list">
                <a
                  onClick={() => navigate('/consultation')}
                  target="_blank"
                  className="nav_link"
                  rel="noopener"
                >
                  <i className="fa-solid fa-photo-film"></i>
                  <span className="nav_name">Consultation</span>
                </a>

                <a
                  onClick={() => navigate('/vaccination')}
                  target="_blank"
                  className="nav_link"
                  rel="noopener"
                >
                  <i class="fa-solid fa-syringe"></i>
                  <span className="nav_name">Vaccination</span>
                </a>

                {role === 'patient' ? (
                  <a
                    onClick={() => navigate('/profile')}
                    target="_blank"
                    className="nav_link"
                    rel="noopener"
                  >
                    <i className="fa-solid fa-address-card"></i>
                    <span className="nav_name">Profile</span>
                  </a>
                ) : null}
                {role === 'admin' ? (
                  <a
                    onClick={() => navigate('/patient')}
                    target="_blank"
                    className="nav_link"
                    rel="noopener"
                  >
                    <i className="fa-solid fa-address-card"></i>
                    <span className="nav_name">Patient</span>
                  </a>
                ) : null}
                {role === 'admin' ? (
                  <a
                    onClick={() => navigate('/payment')}
                    target="_blank"
                    className="nav_link"
                    rel="noopener"
                  >
                    <i class="fa-solid fa-money-bill"></i>
                    <span className="nav_name">Payment</span>
                  </a>
                ) : null}

                <a
                  onClick={() => navigate('/certificateConsultation')}
                  target="_blank"
                  className="nav_link"
                  rel="noopener"
                >
                  <i class="fa-solid fa-money-bill"></i>
                  <span className="nav_name">Consultation Certificate</span>
                </a>

                <a
                  onClick={() => navigate('/certificateVaccination')}
                  target="_blank"
                  className="nav_link"
                  rel="noopener"
                >
                  <i class="fa-solid fa-money-bill"></i>
                  <span className="nav_name">Vaccination Certificate</span>
                </a>

                {role === 'admin' ? (
                  <a
                    onClick={() => navigate('/contact')}
                    target="_blank"
                    className="nav_link"
                    rel="noopener"
                  >
                    <i class="fa-solid fa-message"></i>
                    <span className="nav_name">Enquiry</span>
                  </a>
                ) : null}
                <a
                  onClick={() => navigate('/changePassword')}
                  target="_blank"
                  className="nav_link"
                  rel="noopener"
                >
                  <i className="fa-solid fa-key"></i>
                  <span className="nav_name">ChangePassword</span>
                </a>
                <a
                  onClick={() => dispatch(logout(navigate))}
                  target="_blank"
                  className="nav_link"
                  rel="noopener"
                >
                  <i className="bi bi-box-arrow-left nav_icon" />
                  <span className="nav_name">logout</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div style={{ flex: '1 4 0% !important', paddingBottom: '18%' }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SideNav;
