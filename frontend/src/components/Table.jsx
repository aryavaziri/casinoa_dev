import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Ratio from 'react-bootstrap/Ratio';

function Table({ table }) {

    return (

        // Use this link to redirect to the tables page, otherwise use div for modal use in homescreen
        // <Link to={`/table/${table._id}`} className="text-decoration-none text-reset">
        <div className="text-decoration-none text-reset">
            <Card className='shadow my-3 p-0 rounded overflow-hidden'>
                <img className='' style={{ height: "220px", objectFit: "cover" }} src={require("../media/images" + table.img)} alt={table.img} />
                <Card.Body className='row pt-3'>
                    <Card.Text className='text-end col-6 my-0 p-1'><strong>Type: </strong></Card.Text><Card.Text className='my-0 p-1 col-6'> <span>{table.type}</span></Card.Text>
                    <Card.Text className='text-end col-6 my-0 p-1'><strong>S/B blinds: </strong></Card.Text><Card.Text className='my-0 p-1 col-6'> <span>{table.small}/{table.small*2} €</span></Card.Text>
                    <Card.Text className='text-end col-6 my-0 p-1'><strong>Online: </strong></Card.Text><Card.Text className='my-0 p-1 col-6'> <span>{table.online}</span></Card.Text>
                    <Button variant="dark" className='my-2 col-auto mx-auto p-4 py-1 shadow fw-bold fs-4 rounded-pill'>Join</Button>
                </Card.Body>
            </Card >
        </div >






    )
}

export default Table