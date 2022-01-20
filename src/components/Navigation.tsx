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
          <Navbar.Brand as={Link} to={"/"} className="d-flex align-items-center" onClick={this.removeSavedState}>
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
              <NavLink role="button" className="nav-link rounded-3 p-2" to={"/games/pc"} onClick={this.removeSavedState}>PC</NavLink>
              <NavLink role="button" className="nav-link rounded-3 p-2" to={"/games/playstation"} onClick={this.removeSavedState}>PlayStation</NavLink>
              <NavLink role="button" className="nav-link rounded-3 p-2" to={"/games/xbox"} onClick={this.removeSavedState}>Xbox</NavLink>
              <NavLink role="button" className="nav-link rounded-3 p-2" to={"/games/nintendo"} onClick={this.removeSavedState}>Nintendo</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  removeSavedState() {
    //If exists "state" item in localStorage, remove it.
    localStorage.removeItem("state");
  }
}