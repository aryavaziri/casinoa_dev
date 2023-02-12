// import React, { useState, useEffect } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Modal } from 'react-bootstrap'
import { listTables } from '../actions/tableActions'
import Table from '../components/Table'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Test from '../components/Test'
import Card from '../components/Card'
import Buyin from '../components/Buyin'
import { useState } from 'react'

function HomeScreen() {
    // let url = `ws://${window.location.hostname}:8000/ws/socket-server/`
    // const pokerSocket = new WebSocket(url)
    // pokerSocket.onmessage = (e)=>{
    //     let data = JSON.parse(e.data)
    //     console.log("Data:", data)
    // }
    
    
    
    const dispatch = useDispatch()
    //selecting which reducer's state you want
    const tableList = useSelector(state => state.tableList)
    const { tables, loading, error } = tableList

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [selectedTable, setSelectedTable] = useState('');
    const modalHandler = (i) => {
        setShow(true)
        setSelectedTable(i)
    }
    useEffect(() => {
        dispatch(listTables())
    }, [dispatch])

    return (
        <Container>

            <Modal show={show} onHide={handleClose} className=''>
                {tables.length != 0 ? <Buyin table={selectedTable} /> : ''}
            </Modal>

            <div>
                <h1 className='my-3'>Available tables</h1>
                {/* <Test /> */}
                {/* <input type="text" onChange={(e) => setnumb(e.target.value)}/> */}
                {/* <Card num={numb} /> */}
                {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        :
                        <Row>
                            {tables.map(i => {
                                return (
                                    < Col onClick={() => modalHandler(i)} sm={12} md={6} lg={4} key={i._id} >
                                        <Table table={i} />
                                    </Col>
                                )
                            })}
                        </Row>
                }

            </div >


        </Container>

    )
}

export default HomeScreen