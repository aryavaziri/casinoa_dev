import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Ratio from 'react-bootstrap/Ratio';
import Card2 from './Card2'
import './../media/css/player.css'
import './../media/css/poker-actions.css'
import { gameDetails } from '../actions/pokerActions';
import { MyContext } from "../App.js"
import { hostname } from "../constants/userConstants";

function Player({ options }) {
    // const {hostname} =useContext(MyContext)
    const myDomain = hostname

    // console.log(document.getElementsByClassName(".width"))
    // useEffect(() => {
    //     console.log(document.querySelectorAll(".width")[0].clientWidth)

    // },[])
    // console.log(options.card[0])
    // const [raise, setRaise] = useState(false)
    // const [width, setWidth] = useState((options.turn)?(document.querySelectorAll(".width")[0].clientWidth):"100px")
    const [status, setStatus] = useState('')
    useEffect(() => {
        // console.log(options.image)
        switch (options.status) {
            case 1:
                setStatus('fold');
                break
            case 2:
                setStatus('check');
                break
            case 3:
                setStatus('call');
                break
            case 4:
                setStatus('raise');
                break
            case 5:
                setStatus('allin');
                break
            default:
                setStatus('nothing');
                break
        }
    }, [status, gameDetails, options.status])


    return (
        <>
            <div className={' p-0 m-2 poker-player ' + status} >
                <div className=' rounded-pill '>
                    {/* <img src={require("../media/images" + options.image)} /> */}
                    <img src={window.location.protocol +
                        "//" +
                        myDomain+
                        `${options.image}`} />
                    <div>
                        <div></div>
                        <div>
                            <div><span><i className="fa-solid fa-coins"></i></span> <span>{options.balance}€</span></div>
                            <div>{options.user} - {options.nick_name}</div>
                            <div>
                                {(options.turn) ? "" : status}
                                {/* <div className={((options.turn) ? ' turn' : ' d-none')} >
                                    <div></div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={((options.bet > 0) ? ' bet' : ' d-none')} >
                    <span>
                        {options.bet}€
                    </span>
                </div>
                <div className="game-card" >
                    <span>
                        <span><Card2 num={options.card1} /></span>
                        <span><Card2 num={options.card2} /></span>
                    </span>
                </div>
                <div className={((options.turn) ? ' turn' : ' d-none')} >
                    <div></div>
                </div>
                <div className={((options.dealer) ? ' dealer' : ' d-none')} ><span>D</span></div>
                <div className={((options.small) ? ' blind' : ' d-none')} ><span>S</span></div>
                <div className={((options.big) ? ' blind' : ' d-none')} ><span>B</span></div>
            </div>
            {/* {!options.turn &&
                <section className='row poker-actions '>
                    <div className='col-7'> </div>
                    <div className={'col-3 d-flex flex-column justify-content-between p-1 action-btn' + ((options.turn) ? ' ' : ' ')}>
                    </div>
                </section>} */}


        </>
    )
}

export default Player