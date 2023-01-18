import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { register  } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function RegisterScreen() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const location = useLocation()
    const navigate = useNavigate()
    const redir = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userLogin)
    const {userInfo, loading, error} = userRegister
    useEffect(()=> {
        if(userInfo){
            navigate(redir)
        }
    },[navigate, redir, userInfo])
    // console.log(redirect)
    
    const submitHandler = (e) => {
        e.preventDefault()

        if(password != ConfirmPassword){
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
        
    }
    return (
        <FormContainer>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader />}

            <h1>Register</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ConfrimPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Enter your password again"
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoFocus
                    />
                </Form.Group>
                <Form.Check type="checkbox" label="Remember me" />
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
                <br />
            <Row>
                <Col>
                    Have an account?
                    <Link to={redir ? `/register?redirect=${redir}` : '/login'}>
                            Login
                    </Link>
                </Col>
            </Row>

        </FormContainer >


    )
}

export default RegisterScreen