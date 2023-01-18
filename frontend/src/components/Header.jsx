import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { NavDropdown } from 'react-bootstrap';
import { logout  } from '../actions/userActions'







function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()
  const logoutHandler = ()=>{dispatch(logout())}


  return (
    < header >
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>POKER - ONLINE</Navbar.Brand>
          </LinkContainer>

          <Nav className="justify-content-end basic-navbar-nav" bg="dark" variant="dark">
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Log Out
                  </NavDropdown.Item>
              </NavDropdown>
            ) :
              <Nav.Link href="/login"><i className='fas fa-user'></i>Login</Nav.Link>
            }
          </Nav>
        </Container>
      </Navbar>


    </header >

  );
}

export default Header;