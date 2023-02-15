import { Link } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// import Sonnet from '../../components/Sonnet';
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
import { listTableDetails } from '../actions/tableActions'
import Image from 'react-bootstrap/Image'
import loginIMG from '../media/images/login.jpg'
import Logo from '../media/images/logo.png'
import Card2 from '../components/Card2'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';

// let url = `ws://${window.location.hostname}:8000/ws/poker/${id}/`
// let url = `ws://${window.location.hostname}:8000/ws/poker`
// const pokerSocket = new WebSocket(url)

const useSocket = (id, access_token) => {
    const [socket, setSocket] = useState()
    useEffect(() => {
        if (!id || !access_token) return
        // create socket
        try{
            
            setSocket(new WebSocket(`ws://${window.location.hostname}:8000/ws/poker/${id}/?token=${access_token}`))
        }
        catch {return} 
        
        
    }, [id])
    return socket
}
let count = 0

function PokerScreen() {

    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { id } = useParams();
    const [key, setKey] = useState('game');
    const [message, setMessage] = useState('')
    const [bet, setBet] = useState(0)
    const location = useLocation()
    const dispatch = useDispatch()
    const { table } = useSelector(state => state.tableDetails)
    const gameInfo = useSelector(state => state.gameDetails)
    const gameEnter = useSelector(state => state.gameEnter)
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin
    const socketHeader = userInfo?userInfo.access:""
    const socket = useSocket(id, socketHeader)
        
    const { info, infoLoading } = gameInfo
    const ground = []
    const orderL = []
    const orderR = []
    const orderT = []
    const order = []

    let temp

    useEffect(() => {
        console.log(socket==undefined)
        if(socketHeader==""){navigate ("/")}
        if (!socket) return
        socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            console.log("Data:", data)
            if (data.type == "dispatch") {
                dispatch(listTableDetails(id));
                dispatch(gameDetails(id))
            }
            if (data && (data.type == "chat")) { (document.querySelector('#chat-box').value += (data.time + " " + data.sender + "> " + data.message + "\n")); document.querySelector('#message-box').value = "" }
            if (data && (data.type == "chat") && document.getElementById("log")) { document.getElementById("log").innerHTML += '<br>Data: ' + data.message }
            if (data && data.type && ((data.type == "connected") || (data.type == "disconnected"))) { (document.querySelector('#chat-box').value += (data.time + " " + data.user + data.message + "\n")); document.querySelector('#message-box').value = "" }
            // if (data && data.type && ((data.type == "connected") )) { 
            //     gameInfo.info && info.player.map((value) => {
            //         if (value.user == userInfo.id) {
            //             document.querySelector('#me').innerHTML = <Player options={value} />
            //         }
            //     })
            //     }

        }
    }, [socket, userInfo, info, dispatch, infoLoading])
    // console.log(gameInfo.info)


    const sendMessage = () => {
        socket.send(JSON.stringify({
            'message': message,
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }
    const leave = () => {
        socket.close()
        dispatch(gameLeave(id))
        navigate("/")
    }
    const fold = () => { dispatch(gameAction(id, 0, "fold")) }
    const check = () => { dispatch(gameAction(id, 0, "check")) }
    const call = () => { dispatch(gameAction(id, 0, "call")) }
    const raise = () => { dispatch(gameAction(id, bet, "raise")) }
    const allin = () => { dispatch(gameAction(id, 0, "allin")) }
    if (gameInfo.info) {
        for (let i = 0; i < 5; i++) {
            ground[i] = info.JSON_ground.ground[i]
        }
    }
    if (gameInfo.info) {
        for (let i = 0; i < info.JSON_data.orders.length; i++) {
            order[i] = info.JSON_data.orders[i]
        }
        if (order.includes(userInfo.id)) {
            while (order[0] != userInfo.id) {
                temp = order.shift()
                order.push(temp)
            }
        }
    }
    if (order.length > 0) {

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
    }
    // console.log(orderT)

    return (
        <>

            <div className='fluid m-0 bg-success pt-4 position-relative ' style={{ height: "70vh" }}>
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
                                        if ((v.user == val) && (v.user != userInfo.id)) {
                                            return (
                                                <Player key={v.user} options={v} />
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
                                        if ((v.id == val) && (v.id != userInfo.id)) {
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
                                        if ((v.user == val) && (v.user != userInfo.id)) {
                                            return (
                                                <Player key={v.user} options={v} />
                                            )
                                        }
                                    })
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='bg-dark text-light' closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body className=" bg-info">

                    <div className='fluid p-2 m-0 bg-info position-relative' style={{}}>
                        <ul className='pt-3'>
                            {
                                table.JSON_table.online.length > 0 ? table.JSON_table.online.map((v, i) => {
                                    return (
                                        <li key={i}>
                                            <p>{v[0]} - {v[1]} </p>
                                        </li>)
                                }) : null
                            }
                        </ul>
                        <div id='log'>
                        </div>
                    </div>


                </Modal.Body>
            </Modal>





            <div className='row m-0 bg-dark p-0' style={{ height: "25vh" }}>
                <div className='col-5 d-flex justify-content-evenly py-0 flex-wrap'>
                    <Button variant='danger' className=' m-1 h-25 ' onClick={() => leave()}>Sit out</Button>
                    <Button className=' my-1 h-25 ' onClick={() => fold()}>Fold</Button>
                    <Button className=' my-1 h-25 ' onClick={() => check()}>Check</Button>
                    <Button className=' my-1 h-25 ' onClick={() => call()}>Call</Button>
                    <Button className=' my-1 h-25 ' onClick={() => raise()}>Raise</Button>
                    <Button className=' my-1 h-25 ' onClick={() => allin()}>All-in</Button>
                    <Button variant='warning' className=' m-1 h-25 ' onClick={handleShow}>LOG</Button>
                    {gameInfo.info && <span className='text-light'>POT:{gameInfo.info.pot}/ BET:{gameInfo.info.bet}/ STAGE:{gameInfo.info.stage}</span>}
                    <FloatingLabel controlId="bet" label="Bet" className="" >
                        <Form.Control
                            className='bg-light'
                            type="number"
                            value={bet}
                            onChange={(e) => setBet(e.target.value)}
                            autoFocus
                        />
                    </FloatingLabel>
                </div>
                <div id="me" className='col-4 d-flex justify-content-center h-100 py-0 own'>
                    {gameInfo.info && info.player.map((value) => {
                        if (value.user == userInfo.id) {
                            return (<Player key={value.user} options={value} />)
                        }
                    })}
                </div>
                <div className='col-3 row d-flex p-2 py-1 m-0 pb-3'>
                    <Form.Control readOnly className='h-75 my-1 text-light' style={{ fontSize: "12px" }} as="textarea" id='chat-box' />
                    <div className='row m-0 p-0 d-flex'>
                        <Form.Control
                            id='message-box'
                            className='bg-light w-75'
                            type="text"
                            autoFocus
                            // value={chat_text}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button className='px-2 w-25' onClick={() => sendMessage()}>Send</Button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PokerScreen