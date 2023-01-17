import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';






function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    < header >
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>POKER - ONLINE</Navbar.Brand>
          </LinkContainer>

          <Nav className="justify-content-end basic-navbar-nav" bg="dark" variant="dark">
            <Nav.Link href="/table" className='mr-auto'><i className='justify-content-end fas fa-dice-five'></i> Tables</Nav.Link>
            <Nav.Link onClick={handleShow}><i className='fas fa-user'></i>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Modal className='mt-5 mx-auto' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Your password" />
            </Form.Group>
            <Form.Check type="checkbox" label="Remember me" />
            <br />
            <Button variant="primary" type="submit" onClick={handleClose} className="">
              Sign in
            </Button>
            <Button variant="danger" type="submit" onClick={handleClose} className="mx-2">
              Don't have an account?
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </header >

  );
}

export default Header;