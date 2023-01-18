import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';






function Header() {


  return (
    < header >
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>POKER - ONLINE</Navbar.Brand>
          </LinkContainer>

          <Nav className="justify-content-end basic-navbar-nav" bg="dark" variant="dark">
            
            <Nav.Link href="/login"><i className='fas fa-user'></i>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


    </header >

  );
}

export default Header;