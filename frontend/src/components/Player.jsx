import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Ratio from 'react-bootstrap/Ratio';
import playerIMG1 from './../media/images/icon/avatar3.webp'
import cardIMG from '../media/images/p.webp'
import Card2 from './Card2'
import './../player.css'
function Player({options}) {
    console.log(options.card[0])

    return (
        <div className={' poker-player ' + (options.status)} >
            <div className=' rounded-pill'>
                <img src={playerIMG1} />
                <div>
                    <div></div>
                    <div>
                        <div><span><i className="fa-solid fa-coins"></i></span> <span>120$</span></div>
                        <div>{options.name}</div>
                        <div>{options.status}</div>
                    </div>
                </div>
            </div>
            <div className={ ((options.bet > 0) ? ' bet' : ' d-none')} >
                <span>
                    {options.bet}€
                </span>
            </div>
            <div className="game-card" >
                <span>
                    <span><Card2 num={options.card[0]}/></span>
                    <span><Card2 num={options.card[1]}/></span>
                </span>
            </div>
        </div>

    )
}

export default Player