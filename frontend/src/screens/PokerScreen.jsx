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
import { gameDetails, gameEnter, gameLeave } from '../actions/pokerActions'
import Image from 'react-bootstrap/Image'
import loginIMG from '../media/images/login.jpg'
import Logo from '../media/images/logo.png'
import Card2 from '../components/Card2'

function PokerScreen() {
    let { id } = useParams();

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
    }, [id])

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
    const ground = []
    if (gameInfo.info) {
        for (let i = 0; i < 5; i++) {
            ground[i] = info.JSON_data.ground[i]
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

    return (
        <>
            <div className='fluid  m-0 bg-success pt-4 position-relative ' style={{ height: "75vh" }}>
                <div className='position-absolute w-100 ground row'>
                    {gameInfo.info &&
                        <div className='row mx-auto'>
                            <div className='col m-0'><Card2 num={ground[0]} /></div>
                            <div className='col m-0'><Card2 num={ground[1]} /></div>
                            <div className='col m-0'><Card2 num={ground[2]} /></div>
                            <div className='col m-0'><Card2 num={ground[3]} /></div>
                            <div className='col m-0'><Card2 num={ground[4]} /></div>
                        </div>
                    }
                </div>
                <div className='row m-1 justify-content-center align-content-start h-25'>
                    {gameInfo.info && order.map((val) => {
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
                    <Button onClick={() => leave()}>Home</Button>
                    <Button>Fold</Button>
                    <Button>Check</Button>
                    <Button>Call</Button>
                    <Button>Raise</Button>
                    <Button>All-in</Button>

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