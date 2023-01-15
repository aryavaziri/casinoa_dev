import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Ratio from 'react-bootstrap/Ratio';

function Table({ table }) {
    let full = 0
    // table.online.map((i) => {
    //     if (i == "") { full++ }
    // })
    return (
        <Link to={`/table/${table._id}`} className="text-decoration-none text-reset">
            <Card className='shadow my-3 p-5 rounded'>
                <Ratio aspectRatio="1x1" className='parent my-3 bg-success rounded-circle shadow'>
                    <div className="parent">
                        <div className="h-100 d-flex align-items-center text-light justify-content-center">
                            <div className='border rounded p-1 px-3'>
                                <h4>{table.name}</h4>
                                <p>{table.total} €</p>
                                <Button variant='outline-light' className="rounded-pill" disabled={!full}>Join table now</Button>
                            </div>
                        </div>
                        {/* {table.online.map((i, n) => {
                            let j = 0
                            if (i != "") {
                                return (
                                    <div className="item d-flex align-items-center text-light justify-content-center" style={{ transform: `rotateZ(${(360 / table.max) * n}deg)` }}>
                                        <div className='rounded-pill bg-dark shadow p-2' style={{ transform: `rotateZ(${(-360 / table.max) * n}deg)` }}>{i}</div>
                                    </div>
                                )
                            } else
                                if (j == 0) {
                                    j++;
                                    return (
                                        <div className="item d-flex align-items-center justify-content-center" style={{ transform: `rotateZ(${(360 / table.max) * n}deg)` }}>
                                            <Button className="rounded-pill p-2 btn btn-warning" style={{ transform: `rotateZ(${(-360 / table.max) * n}deg)` }}>Empty</Button>
                                        </div>
                                    )
                                }
                        })} */}
                    </div>
                </Ratio >

                <Card.Body className='pb-0'>
                    <Card.Text className='my-0'><strong>Blinds: </strong> €{table.small} / €{table.big}</Card.Text>
                    <Card.Text className='my-0'><strong>Type: </strong> {table.type}</Card.Text>
                    <Button variant="primary" className='mt-3 shadow'>Join table</Button>
                </Card.Body>
            </Card >
        </Link >






    )
}

export default Table