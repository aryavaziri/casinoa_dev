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
import { logout } from '../actions/userActions';







function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const location = useLocation()
  const dispatch = useDispatch()
  const logoutHandler = () => { dispatch(logout()) }

  return (
    < header >
      <Navbar className={((location.pathname == "/login")||(location.pathname == "/poker")) ? "d-none" : "d-block"} bg="dark" variant="dark">
        {/* <Navbar bg="dark" variant="dark"> */}
        <Container>
          <LinkContainer to="/" className=''>
            <Navbar.Brand className=''>POKER - ONLINE</Navbar.Brand>
          </LinkContainer>

          <Nav className="basic-navbar-nav ms-auto" bg="dark" variant="dark">
            {userInfo ? (
              <>
                  <Nav.Link>
                <LinkContainer to='/profile'>
                  <i className="fas fa-user"></i>
                </LinkContainer>
                  </Nav.Link>
                <Nav.Link onClick={logoutHandler}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </Nav.Link>

                <NavDropdown className='' align="end" title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      <i className='fas fa-user px-2'></i>
                       Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fa-solid fa-arrow-right-from-bracket px-2"></i>
                     Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) :
              <Nav.Link href="/login">Login <i className="fa-solid fa-right-to-bracket"></i></Nav.Link>
            }
          </Nav>
        </Container>
      </Navbar>


    </header >

  );
}

export default Header;