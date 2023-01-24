import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Player from '../components/Player'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import Image from 'react-bootstrap/Image'
import loginIMG from '../media/images/login.jpg'
import Logo from '../media/images/logo.png'
import Card2 from '../components/Card2'

function PokerScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin


    const gameInfo = useSelector(state => state.poker)
    const { info } = gameInfo

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    const player1 = {
        status: "raise",
        card: [2, 14],
        bet: 50,
        balance: 350,
        name: "Soheil",
        blind_b:true,
    }
    const player2 = {
        dealer:true,
        balance: 240,
        status: "fold",
        card: [24, 10],
        bet: 24,
        name: "Arya"
    }
    const player3 = {
        balance: 200,
        turn: true,
        status: "check",
        card: [40, 42],
        bet: 50,
        name: "Lilibi"
    }
    const player4 = {
        blind: true,
        balance: 120,
        status: "check",
        card: [30, 33],
        bet: 50,
        name: "Nina"
    }


    return (
        <>
            <div className='fluid  m-0 bg-success pt-4 position-relative ' style={{ height: "75vh" }}>
                <div className='position-absolute w-100 ground row'>
                    <div className='row mx-auto'>
                        <div className='col m-0 p-1'><Card2 num={20}/></div>
                        <div className='col m-0 p-1'><Card2 num={30}/></div>
                        <div className='col m-0 p-1'><Card2 num={39}/></div>
                        <div className='col m-0 p-1'><Card2 num={0}/></div>
                        <div className='col m-0 p-1'><Card2 num={0}/></div>
                    </div>
                </div>
                <div className='row m-1 justify-content-center align-content-center h-25'>
                    <div className='h-100 col-3 mx-3 t'><Player options={player1}></Player></div>
                    <div className='h-100 col-3 mx-3 t'><Player options={player1}></Player></div>
                </div>
                <div className='row m-1 justify-content-between align-content-center h-25'>
                    <div className='h-100 col-3 ms-3 l'><Player options={player4}></Player></div>
                    <div className='h-100 col-3 me-3 r'><Player options={player1}></Player></div>
                </div>
                <div className='row m-1 justify-content-between align-content-center h-25'>
                    <div className='h-100 col-3 ms-0 l'><Player options={player1}></Player></div>
                    <div className='h-100 col-3 me-0 r'><Player options={player3}></Player></div>
                </div>
                <div className='row m-1 justify-content-between align-content-center h-25'>
                    <div className='h-100 col-3 ms-3 l'><Player options={player1}></Player></div>
                    <div className='h-100 col-3 me-3 r'><Player options={player1}></Player></div>
                </div>
            </div>
            <div className='row m-0 bg-dark justify-content-center align-content-center' style={{ height: "25vh" }}>
                <div className='col-5 offset-3 d-flex justify-content-center h-100 py-0 own'><Player options={player2}></Player></div>
                <div className='col-4 ms-auto d-flex flex-column justify-content-between py-1 px-5'>
                    <Button className='my-1 p-2 fs-5'>Fold/Check</Button>
                    <Button className='my-1 p-2 fs-5'>Call</Button>
                    <Button className='my-1 p-2 fs-5'>Raise</Button>
                </div>
            </div>
        </>
    )
}

export default PokerScreen