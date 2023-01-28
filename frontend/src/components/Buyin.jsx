import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Ratio from 'react-bootstrap/Ratio';
import Modal from 'react-bootstrap/Modal';
import { gameDetails } from '../actions/pokerActions'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../actions/userActions'
// import { payOrder } from '../actions/orderActions'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Test2 from './Test2';

function Buyin({ table }) {

    const navigate = useNavigate()

    const gameInfo = useSelector(state => state.gameDetails)
    const { info } = gameInfo

    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [deposite, setDeposite] = useState(0);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(gameDetails(table._id))
        dispatch(gameDetails(table._id))
    }, [])

    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        } else {
            if (!user || !user.name ) {
                dispatch(getUserDetails('profile'))
            }
        }
    }, [userInfo, dispatch, user, navigate])





    const submitHandler = (e) => {
        console.log(table._id)
        e.preventDefault()
        navigate(`/poker/${table._id}`)

    }

    const types = [
        'Holdem-Texas',
        'Omaha',
    ]
    const maxs = [
        (0, 3),
        (1, 6),
        (2, 9),
    ]


    // const orderPay = useSelector(state => state.orderPay)
    // const { loading: loadingPay, success: successPay } = orderPay

    // const [isPaid, setIsPaid] = useState(false)

    // useEffect(() => {
    //     if (successPay || !isPaid) {
    //         if (!window.paypal) {
    //             addPaypallScript()
    //         }
    //         else {
    //             setSdkReady(true)
    //         }
    //     }
    // }, [successPay, isPaid,])

    // const [sdkReady, setSdkReady] = useState(false)
    // const addPaypallScript = () => {
    //     const script = document.createElement('script')
    //     script.type = 'text/javascript'
    //     script.src = "https://www.paypal.com/sdk/js?client-id=AeaTWLwqoRcM4oRbFgbHvshCwI_OFIntUgwCr2J7UWMGaf2C79w9Tmja1McyZStZFCXtXMvbbE3CKNCT"
    //     // MY_PAYPAL_CLIENT_ID = "AeaTWLwqoRcM4oRbFgbHvshCwI_OFIntUgwCr2J7UWMGaf2C79w9Tmja1McyZStZFCXtXMvbbE3CKNCT"
    //     script.async = true;
    //     script.onload = () => {
    //         setSdkReady(true)
    //     }
    //     document.body.appendChild(script)
    // }

    // const successPaymentHandler = (paymentResult) => {
    //     dispatch(payOrder(orderID, paymentResult))
    // }





    return (
        <Card className='shadow m-0 p-0 rounded overflow-hidden border-none'>
            <img className='' style={{ height: "260px", objectFit: "cover" }} src={require("../media/images" + table.img)} alt={table.img} />
            <Card.Body className='row pt-3'>
                <div className='col-6 d-flex flex-column'>
                    <Card.Text className='text-start col-12 my-0 p-2'><strong>Type: </strong>{types[table.type]}</Card.Text>
                    <Card.Text className='text-start col-12 my-0 p-2'><strong>S/B blinds: </strong>{table.small}/{table.small * 2} €</Card.Text>
                    <Card.Text className='text-start col-12 my-0 p-2'><strong>Minimum Buy-in: </strong>{table.min}</Card.Text>
                    <Card.Text className='text-start col-12 mt-auto p-2'><strong>Your balance: </strong> €{user.credit}</Card.Text>
                </div>
                <div className='col-6'> 
                    <Card.Subtitle className='text-start col-12 my-0 p-2 d-flex flex-column justify-content-center'>
                        <strong className='w-100 text-center'>Players <span className='text-muted fw-light'>({table.online}/{maxs[table.max]})</span> </strong>
                        <ul className='list-group px-4 list-group-flush'>
                            {gameInfo.info && info.player.map(i => {
                                return (
                                    <li className='list-group-item d-flex justify-content-between' key={i.id}>
                                        <span>{i.name}</span>
                                        <span>€{i.balance}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </Card.Subtitle>
                </div>
            </Card.Body>
            <Modal.Footer className='row'>
                {/* <Form.Label className='col-3'>Deposit:</Form.Label> */}
                <span className='col-auto pr-0 mr-0'>Deposite:</span>
                <Form id='deposite' className='col' onSubmit={submitHandler}>
                    <Form.Group className="" controlId="email">
                        <Form.Control
                            className=''
                            autoComplete='off'
                            type="num"
                            placeholder="Amount"
                            onChange={(e) => (e.target.value == '') ? setDeposite(0) : setDeposite(parseInt(e.target.value))}
                            autoFocus
                        // size="lg"
                        />
                    </Form.Group>
                </Form>
                <Button type='submit' form='deposite' disabled={((deposite >= table.min)&&(deposite <= user.credit) && (table.isAvailable)) ? false : true} className='col-3 ' variant="dark" onClick={() => submitHandler}>
                    Join table
                </Button>
                {/* <Test2></Test2> */}

            </Modal.Footer>
        </Card >
    )
}

export default Buyin