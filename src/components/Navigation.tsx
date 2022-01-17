import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

interface NavigationProps {
  title: string,
  logo: string
}

export default class Navigation extends React.Component<NavigationProps> {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand as={Link} to={"/"} className="d-flex align-items-center">
            <img
              alt="logo"
              src={this.props.logo}
              width="50"
              height="50"
              className="d-inline-block align-top me-2"
            />
            <strong>{this.props.title}</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink role="button" className="nav-link rounded-3 p-2" to={"/games/pc"}>PC</NavLink>
              <NavLink role="button" className="nav-link rounded-3 p-2" to={"/games/playstation"} >PlayStation</NavLink>
              <NavLink role="button" className="nav-link rounded-3 p-2" to={"/games/xbox"} >Xbox</NavLink>
              <NavLink role="button" className="nav-link rounded-3 p-2" to={"/games/nintendo"} >Nintendo</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}