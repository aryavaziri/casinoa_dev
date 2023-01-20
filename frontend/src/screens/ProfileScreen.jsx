import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProfileScreen() {
    const userRegister = useSelector(state => state.userLogin)
    const { userInfo, loading, error } = userRegister
    const [email, setEmail] = useState(`${userInfo.email}`)
    const [name, setName] = useState(`${userInfo.name}`)
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()

        if (password && (password != ConfirmPassword)) {
            setMessage('Passwords do not match')
        } else {
            console.log("updating")
        }

    }
    return (
        <>
            <Row className='container mx-auto'>
                <Col md={4}>
                    <FormContainer>
                        {error && <Message variant='danger'>{error}</Message>}
                        {message && <Message variant='danger'>{message}</Message>}
                        {loading && <Loader />}

                        <h1>Profile</h1>
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
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    autoComplete="new-password" 
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="ConfrimPassword">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password again"
                                    value={ConfirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                            </Form.Group>
                            <Button variant="outline-light" type="submit" className='w-100 py-2 rounded-3 h2 sign-in'>
                                Update
                            </Button>
                        </Form>
                    </FormContainer >
                </Col>
            </Row>
        </>
    )
}

export default ProfileScreen