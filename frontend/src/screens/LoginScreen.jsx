import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { listTables } from '../actions/tableActions'
import Table from '../components/Table'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import store from '../store'
import { login  } from '../actions/userActions'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const navigate = useNavigate()
    const redir = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin
    useEffect(()=> {
        if(userInfo){
            navigate(redir)
        }
    },[redir, userInfo])
    // console.log(redirect)
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>Sign in</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                    />
                </Form.Group>
                <Form.Check type="checkbox" label="Remember me" />
                <br />
                <Button variant="primary" type="submit">
                    Sign in
                </Button>
            </Form>
            <Row>
                <Col>
                    NewCustomer?
                    <Link to={redir ? `/register?redirect=${redir}` : '/register'}>
                        <Button variant="danger">
                            Register
                        </Button>
                    </Link>
                </Col>
            </Row>

        </FormContainer >


    )
}

export default LoginScreen