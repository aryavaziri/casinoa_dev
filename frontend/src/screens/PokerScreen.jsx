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
import playerIMG1 from './../media/images/icon/avatar1.webp'
import playerIMG2 from './../media/images/icon/avatar2.webp'
import playerIMG3 from './../media/images/icon/avatar3.webp'
import playerIMG4 from './../media/images/icon/avatar4.webp'

function PokerScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const [raise, setRaise] = useState(false)

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
        bet: 0,
        balance: 350,
        name: "Soheil",
        blind_b: true,
        img: playerIMG2,
    }
    const player2 = {
        dealer: true,
        turn: true,
        balance: 240,
        status: "",
        card: [24, 10],
        bet: 0,
        name: "Arya",
        img: playerIMG1,
    }
    const player3 = {
        balance: 200,
        status: "call",
        card: [40, 42],
        bet: 50,
        name: "Lilibi",
        blind: true,
        img: playerIMG3,
    }
    const player4 = {
        balance: 120,
        status: "",
        card: [30, 33],
        bet: 50,
        name: "Nina",
        img: playerIMG4,
    }
    const player5 = {
        balance: 0,
        status: "check",
        card: [34, 3],
        bet: 250,
        name: "Sara",
        img: playerIMG1,
    }


    return (
        <>
            <div className='fluid  m-0 bg-success pt-4 position-relative ' style={{ height: "75vh" }}>
                <div className='position-absolute w-100 ground row'>
                    <div className='row mx-auto'>
                        <div className='col m-0'><Card2 num={20} /></div>
                        <div className='col m-0'><Card2 num={30} /></div>
                        <div className='col m-0'><Card2 num={39} /></div>
                        <div className='col m-0'><Card2 num={0} /></div>
                        <div className='col m-0'><Card2 num={0} /></div>
                    </div>
                </div>
                <div className='row m-1 justify-content-center align-content-center h-25'>
                    <div className='h-100 d-flex justify-content-center col-3 mx-3 t'><Player options={player1}></Player></div>
                    <div className='h-100 d-flex justify-content-center col-3 mx-3 t'><Player options={player1}></Player></div>
                </div>
                <div className='row m-1 justify-content-between align-content-center h-25'>
                    <div className='h-100 col-3 ms-3 l'><Player options={player4}></Player></div>
                    <div className='h-100 d-flex justify-content-end col-3 me-3 r'><Player options={player1}></Player></div>
                </div>
                <div className='row m-1 justify-content-between align-content-center h-25'>
                    <div className='h-100 col-3 ms-0 l'><Player options={player1}></Player></div>
                    <div className='h-100 d-flex justify-content-end col-3 me-0 r'><Player options={player3}></Player></div>
                </div>
                <div className='row m-1 justify-content-between align-content-center h-25'>
                    <div className='h-100 col-3 ms-3 l'><Player options={player2}></Player></div>
                    <div className='h-100 d-flex justify-content-center col-3 me-3 r'><Player options={player5}></Player></div>
                </div>
            </div>
            <div className='row m-0 bg-dark justify-content-center align-content-center' style={{ height: "25vh" }}>
                <div className='col-4 d-flex justify-content-center h-100 py-0 own'><Player options={player2}></Player></div>
            </div>
        </>
    )
}

export default PokerScreen