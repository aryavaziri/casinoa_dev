import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen() {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile


    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, dispatch, user, navigate, success])

    setTimeout(() => {
        console.log("SALAM")
    }, 3000);

    const submitHandler = (e) => {
        e.preventDefault()

        if (password && (password != confirmPassword)) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ 'id': user._id, 'name': name, 'email': email, 'password': password }))
        }

    }
    return (
        <>
            <Row className='container mx-auto'>
                <Col md={4}>
                    <FormContainer>
                        <h1>Profile</h1>
                        {error && <Message variant='danger'>{error}</Message>}
                        {message && <Message variant='danger'>{message}</Message>}
                        {success && <Message variant='success'>Your profile has been updated successfully.</Message>}
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
                                    value={confirmPassword}
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