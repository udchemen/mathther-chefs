import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Analysis = ({ filePath }) => {
  return (
    <>
      <hr className='my-5' />
      <Row>
        <Col>
          {filePath && <img src={filePath} style={{ maxHeight: '400px' }} />}
          <p>Hello</p>
        </Col>
      </Row>
    </>
  )
}

export default Analysis
