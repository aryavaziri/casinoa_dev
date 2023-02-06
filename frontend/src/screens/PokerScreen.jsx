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
import { getUserDetails } from '../actions/userActions'
import { gameDetails, gameEnter, gameLeave, gameAction } from '../actions/pokerActions'
import Image from 'react-bootstrap/Image'
import loginIMG from '../media/images/login.jpg'
import Logo from '../media/images/logo.png'
import Card2 from '../components/Card2'
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function PokerScreen() {

    let url = window.location.protocol + "//" + window.location.hostname + `:8000/ws/socket-server/`
    const pokerSocket = new WebSocket(url)



    let { id } = useParams();

    const [bet, setBet] = useState(0)
    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const gameInfo = useSelector(state => state.gameDetails)
    const { info } = gameInfo

    const gameEnter = useSelector(state => state.gameEnter)

    useEffect(() => {
        dispatch(gameDetails(id))
    }, [id, gameDetails])


    useEffect(() => {
        let count = 0
        if (gameInfo.info && !(gameEnter.loading)) {
            info.player.map(i => {
                if (i.id == userInfo._id) { count++ }
            })
            if (!count) { navigate("/") }
        }
    }, [userInfo, info, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
    }
    const leave = () => {
        dispatch(gameLeave(id))
    }
    const fold = () => {
        dispatch(gameAction(id, bet, "fold"))
    }
    const check = () => {
        dispatch(gameAction(id, bet, "check"))
    }
    const call = () => {
        dispatch(gameAction(id, bet, "call"))
    }
    const raise = () => {
        dispatch(gameAction(id, bet, "raise"))
    }
    const allin = () => {
        dispatch(gameAction(id, bet, "allin"))
    }
    const ground = []
    if (gameInfo.info) {
        for (let i = 0; i < 5; i++) {
            ground[i] = info.JSON_ground.ground[i]
        }
    }
    const order = []
    let temp
    if (gameInfo.info) {
        for (let i = 0; i < info.JSON_data.orders.length; i++) {
            order[i] = info.JSON_data.orders[i]
        }
        if (order.includes(userInfo._id)) {
            while (order[0] != userInfo._id) {
                temp = order.shift()
                order.push(temp)
            }
        }
    }

    const orderL = []
    const orderR = []
    const orderT = []

    if (order.length == 2) {
        orderL.push(order[1]);
    } else {
        if ((order.length % 2) != 0) { orderT.push(order[((order.length) - 1) / 2]); orderT.push(order[((order.length) + 1) / 2]) }
        else { orderT.push(order[((order.length)) / 2]) }
        orderL.push(order[1]);
        orderR.push(order[order.length - 1]);
        if (order.length > 5) {
            orderL.push(order[2]);
            orderR.push(order[order.length - 2]);
        }
        if (order.length > 7) {
            orderL.push(order[3]);
            orderR.push(order[order.length - 3]);
        }
    }


    return (
        <>
            <div className='fluid  m-0 bg-success pt-4 position-relative ' style={{ height: "75vh" }}>
                <div className='position-absolute w-100 ground row'>
                    {gameInfo.info &&
                        <div className='row mx-auto'>
                            <div className='col m-0 p-1'><Card2 num={ground[0]} /></div>
                            <div className='col m-0 p-1'><Card2 num={ground[1]} /></div>
                            <div className='col m-0 p-1'><Card2 num={ground[2]} /></div>
                            <div className='col m-0 p-1'><Card2 num={ground[3]} /></div>
                            <div className='col m-0 p-1'><Card2 num={ground[4]} /></div>
                        </div>
                    }
                </div>
                <div className='p-0 m-0 arrange d-flex'>
                    <div className='l d-flex align-items-center flex-column-reverse justify-content-around'>
                        {gameInfo.info &&
                            orderL.map((val) => {
                                return (
                                    info.player.map(v => {
                                        if ((v.id == val) && (v.id != userInfo._id)) {
                                            return (
                                                <Player key={v.id} options={v} />
                                            )
                                        }
                                    })
                                )
                            })
                        }
                    </div>
                    <div className='t d-flex justify-content-around'>
                        {gameInfo.info &&

                            orderT.map((val) => {
                                return (
                                    info.player.map(v => {
                                        if ((v.id == val) && (v.id != userInfo._id)) {
                                            return (
                                                <Player key={v.id} options={v} />
                                            )
                                        }
                                    })
                                )
                            })
                        }

                    </div>
                    <div className='r d-flex align-items-center flex-column-reverse justify-content-around'>
                        {gameInfo.info &&

                            orderR.map((val) => {
                                return (
                                    info.player.map(v => {
                                        if ((v.id == val) && (v.id != userInfo._id)) {
                                            return (
                                                <Player key={v.id} options={v} />
                                            )
                                        }
                                    })
                                )
                            })
                        }


                    </div>
                </div>
            </div>
            <div className='row m-0 bg-dark ' style={{ height: "25vh" }}>

                <div className='col-5 d-flex justify-content-evenly h-25 py-0 flex-wrap'>
                    <Button className='mx-2 mt-2' onClick={() => leave()}>Home</Button>
                    <Button className='mx-2 mt-2' onClick={() => fold()}>Fold</Button>
                    <Button className='mx-2 mt-2' onClick={() => check()}>Check</Button>
                    <Button className='mx-2 mt-2' onClick={() => call()}>Call</Button>
                    <Button className='mx-2 mt-2' onClick={() => raise()}>Raise</Button>
                    <Button className='mx-2 mt-2' onClick={() => allin()}>All-in</Button>
                    {gameInfo.info && <span className='text-light'>POT:{gameInfo.info.pot}/ BET:{gameInfo.info.bet}/ STAGE:{gameInfo.info.stage}</span>}
                    <FloatingLabel controlId="bet" label="Bet" className="m-3" >
                        <Form.Control
                            className='bg-light'
                            type="number"
                            placeholder="Enter your Email"
                            value={bet}
                            onChange={(e) => setBet(e.target.value)}
                            autoFocus
                        />
                    </FloatingLabel>
                </div>
                <div className='col-4 d-flex justify-content-center h-100 py-0 own'>
                    {gameInfo.info && info.player.map((value, index) => {
                        if (value.id == userInfo._id) {
                            return (<Player key={value.id} options={value}></Player>)
                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default PokerScreen