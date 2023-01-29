import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Ratio from 'react-bootstrap/Ratio';
import cardIMG from '../media/images/p.webp'
import Card2 from './Card2'
import './../player.css'
import './../poker-actions.css'
function Player({ options }) {
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
    }, [status])


    return (
        <>
            <div className={' p-0 m-2 poker-player ' + status } >
                <div className=' rounded-pill '>
                    {/* <img src={require("../media/images" + options.image)} /> */}
                    <img src={ window.location.protocol +
        "//" +
        window.location.hostname +
        `:8000/${options.image}`} />
                    <div>
                        <div></div>
                        <div>
                            <div><span><i className="fa-solid fa-coins"></i></span> <span>{options.balance}€</span></div>
                            <div>{options.id} - {options.name}</div>
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
            {!options.turn &&
                <section className='row poker-actions '>
                    <div className='col-7'> </div>
                    <div className={'col-3 d-flex flex-column justify-content-between p-1 action-btn' + ((options.turn) ? ' ' : ' ')}>
                        {/* <Button className={'my-1  fs-5 ' + ((options.turn) ? ' btn-success' : ' btn-disabled')}>Fold/Check</Button>
                        <Button className={'my-1  fs-5 ' + ((options.turn) ? ' btn-success' : ' btn-disabled')}>Call 100€</Button>
                        <Button className={'my-1  fs-5 ' + ((options.turn) ? ' btn-success' : ' btn-disabled')}>Call 100€</Button>
                        <Button onClick={() => raise ? setRaise(false) : setRaise(true)} className={'my-1  fs-5 ' + ((options.turn) ? ' btn-success' : ' btn-disabled')}>Raise</Button>
                        {raise && <div className='col'>
                            <Button>POT</Button>
                            <Button>X2</Button>
                            <Button>X4</Button>
                            <Button>ALLIN</Button>
                        </div>
                        } */}
                    </div>

                </section>
            }
        </>
    )
}

export default Player