import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Ratio from 'react-bootstrap/Ratio';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
// import { payOrder } from '../actions/orderActions'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Test2 from './Test2';

function Buyin({ table }) {
    
    const [deposite, setDeposite] = useState(0);
    
    const submitHandler = (e) => {
        console.log(table._id)
        e.preventDefault()
    }
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
            <Card.Body className='row w-75 pt-3'>
                <Card.Text className='text-start col-12 my-0 p-2'><strong>Type: </strong>{table.type}</Card.Text>
                <Card.Text className='text-start col-12 my-0 p-2'><strong>S/B blinds: </strong>{table.small}/{table.big} €</Card.Text>
                <Card.Text className='text-start col-12 my-0 p-2'><strong>Online: </strong>{table.online}</Card.Text>
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
                <Button type='submit' form='deposite' disabled={deposite > 0 ? false : true} className='col-3 ' variant="dark" onClick={() => submitHandler}>
                    Join table
                </Button>
                {/* <Test2></Test2> */}

            </Modal.Footer>
        </Card >
    )
}

export default Buyin