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
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function ProfileScreen() {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [flag, setFlag] = useState(false)

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
        if (success) { setFlag(true) }
    }, [userInfo, dispatch, user, navigate, success])
    useEffect(() => {
        if (!success) {
            setTimeout(() => {
                setFlag(false)
            }, 3000);
        }
    }, [success])

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
                <Col md={"auto"}>
                    <FormContainer>
                        <h1 className='my-3' >Profile</h1>
                        {error && <Message variant='danger'>{error}</Message>}
                        {message && <Message variant='danger'>{message}</Message>}
                        {flag && <Message variant='success'>Your profile has been updated successfully.</Message>}
                        {loading && <Loader />}

                        <Form onSubmit={submitHandler}>
                            <FloatingLabel controlId="email" label="Email" className="mb-3" >
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus
                                />
                            </FloatingLabel>


                            <FloatingLabel controlId="name" label="Name" className="mb-3" >
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                            </FloatingLabel>


                            <FloatingLabel controlId="password" label="Password" className="mb-3" >
                                <Form.Control
                                    className=''
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                            </FloatingLabel>


                            <FloatingLabel controlId="confirmPassword" label="Confirm Password" className="mb-3" >
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password again"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />

                            </FloatingLabel>
                            <Button variant="outline-light" type="submit" className='w-100 py-3 rounded-3 my-1 h2 sign-in'>
                                Update
                            </Button>
                        </Form>
                    </FormContainer >
                </Col>

                <Col md={4} className='my-3 ms-auto border p-3'>
                    <h1>Account</h1>
                    <div className='row'>
                        <div className='col'>Balance</div>
                        <div className='col'>€ {user.credit}</div>
                        <FloatingLabel controlId="name" label="Amount" className="mb-3" >
                            <Form.Control
                                type="number"
                                placeholder="Amount"
                                value={name}
                            />
                        </FloatingLabel>

                    </div>

                </Col>
            </Row>
        </>
    )
}

export default ProfileScreen