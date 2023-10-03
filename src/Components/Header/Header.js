import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <NavLink className="btn btn-success mx-3" to="/">
            Home
          </NavLink>
          <Nav className="me-auto">
            <NavLink className="btn btn-success" to="/tasks">
              create Task
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
