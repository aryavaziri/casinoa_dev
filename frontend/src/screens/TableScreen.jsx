import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listTableDetails } from '../actions/tableActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function TableScreen({ }) {
    let { id } = useParams();
    const dispatch = useDispatch()
    const tableDetails = useSelector(state => state.tableDetails)
    const { loading, error, table } = tableDetails


    useEffect(() => {
        dispatch(listTableDetails(id))
    }, [dispatch, id])

    return (
        <div>
            <Link to='/' className='btn btn-light my-4'>Go Back</Link>
            {
                loading ? <Loader />
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : (
                            <Row>
                                {table.name}
                            </Row>
                        )
            }
        </div>
    )
}

export default TableScreen