import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Outlet, useNavigate } from 'react-router-dom';
import './index.css';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import Contact from '../contactUs/contact';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = document.getElementById('section1');
  return (
    <div>
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand
              className="logos"
              onClick={() => {
                navigate('/');
              }}
            >
              <a
                onClick={() => {
                  navigate('/');
                }}
              >
                MEDWIN CARES
              </a>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav>
                  <Nav>
                    <Nav>
                      <Nav.Link className="header_text" href="#section1">
                        Home
                      </Nav.Link>
                    </Nav>

                    <Nav>
                      <Nav.Link className="header_text" href="#section2">
                        AboutUs
                      </Nav.Link>
                    </Nav>
                    <Nav>
                      <Nav.Link className="header_text" href="#section3">
                        service
                      </Nav.Link>
                    </Nav>
                    <Nav>
                      <Nav.Link
                        className="header_text"
                        href="#section8"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        Vaccine Certification
                      </Nav.Link>
                    </Nav>
                    <Nav>
                      <Nav.Link
                        className="header_text"
                        href="#section9"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        consultation Certification
                      </Nav.Link>
                    </Nav>
                    <Nav>
                      <Nav.Link className="header_text" href="#section4">
                        Testimonials
                      </Nav.Link>
                    </Nav>
                    <Nav>
                      <Nav.Link className="header_text" href="#section5">
                        ContactUs
                      </Nav.Link>
                    </Nav>
                  </Nav>
                  <Nav>
                    <Nav.Link
                      className="header_text"
                      href="http://localhost:3001"
                    >
                      login
                    </Nav.Link>
                  </Nav>
                </Nav>
                <Nav>
                  <Nav.Link
                    className="header_text"
                    href="http://localhost:3001/registration"
                  >
                    Register
                  </Nav.Link>
                </Nav>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
