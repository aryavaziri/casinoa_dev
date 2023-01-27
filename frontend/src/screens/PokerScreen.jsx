import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Player from '../components/Player'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import { gameDetails } from '../actions/pokerActions'
import Image from 'react-bootstrap/Image'
import loginIMG from '../media/images/login.jpg'
import Logo from '../media/images/logo.png'
import Card2 from '../components/Card2'

function PokerScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const [raise, setRaise] = useState(false)
    let { id } = useParams();

    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const gameInfo = useSelector(state => state.gameDetails)
    const { info } = gameInfo

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
    }, [navigate, userInfo])
    useEffect(() => {
        dispatch(gameDetails(id))
    }, [id])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    // const player2 = {
    //     dealer: true,
    //     turn: true,
    //     balance: 240,
    //     status: "",
    //     card1: 24,
    //     card2: 25,
    //     bet: 0,
    //     name: "Arya",
    //     img: playerIMG1,
    // }
    // const player3 = {
    //     balance: 200,
    //     status: "call",
    //     card: [40, 42],
    //     bet: 50,
    //     name: "Lilibi",
    //     blind: true,
    //     img: playerIMG3,
    // }
    // const player4 = {
    //     balance: 120,
    //     status: "",
    //     card1: 33,
    //     card2: 30,
    //     bet: 50,
    //     name: "Nina",
    //     img: playerIMG4,
    // }
    // const player5 = {
    //     balance: 0,
    //     status: "check",
    //     card: [34, 3],
    //     bet: 250,
    //     name: "Sara",
    //     img: playerIMG1,
    // }


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
                <div className='row m-1 justify-content-center align-content-start h-25'>
                    {gameInfo.info && info.player.map(i => {
                        return (
                            <Player key={i.id} options={i}></Player>
                        )
                        // console.log(i)
                    })}
                    {/* {gameInfo && <Player options={player1}></Player>}
                {gameInfo && <Player options={player1}></Player>}
                {gameInfo && <Player options={player1}></Player>}
                {gameInfo && <Player options={player1}></Player>}
                {gameInfo && <Player options={player1}></Player>}
                {gameInfo && <Player options={player1}></Player>}
                {gameInfo && <Player options={player1}></Player>} */}

                </div>
                {/* <div className='row m-1 justify-content-center align-content-center h-25'>
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
                </div> */}
            </div>
            <div className='row m-0 bg-dark ' style={{ height: "25vh" }}>

                <div className='col-6 d-flex justify-content-evenly h-25 py-0'>
                    <Button>Leave</Button>
                    <Button>Fold</Button>
                    <Button>Check</Button>
                    <Button>Call</Button>
                    <Button>Raise</Button>
                    <Button>All-in</Button>

                </div>
                <div className='col-4 d-flex justify-content-center h-100 py-0 own'>
                    {gameInfo.info && info.player.map((value,index) => {
                        if (value.user.email == userInfo.email) {
                            return (<Player key={value.id} options={value}></Player>)
                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default PokerScreen