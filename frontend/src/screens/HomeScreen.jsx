// import React, { useState, useEffect } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import { listTables } from '../actions/tableActions'
import Table from '../components/Table'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Test from '../components/Test'

function HomeScreen() {
    const dispatch = useDispatch()

    //selecting which reducer's state you want
    const tableList = useSelector(state => state.tableList)
    const { error, loading, tables } = tableList

    useEffect(() => {
        dispatch(listTables())
    }, [])
    return (
        <Container>


            <div>
                <h1>Available tables</h1>
                <Test />
                {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        :
                        <Row>
                            {tables.map(i => {
                                return (
                                    < Col sm={12} md={6} lg={4} key={i._id} >
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