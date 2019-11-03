import React from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import AnalysisResults from './AnalysisResults'
import AnalysisSetup from './AnalysisSetup'

const Analysis = ({
  filePath,
  labels = [],
  loading = true,
  setAnalysisData,
  analysisData
}) => {
  //   labels = [{ label: 'param1', value: 1 }, { label: 'param2', value: 1 }]

  return (
    <>
      <hr className='my-5' />
      <Row>
        <Col xs={12} md={6} className='mb-3'>
          {filePath && (
            <img
              src={filePath}
              className='rounded shadow'
              style={{ maxHeight: '400px', width: '100%' }}
            />
          )}
        </Col>
        <Col xs={12} md={6} className='mb-3'>
          {!labels.length ? (
            <Spinner animation='grow' variant='info' />
          ) : (
            <AnalysisSetup labels={labels} setAnalysisData={setAnalysisData} />
          )}
        </Col>
      </Row>
      {analysisData && <AnalysisResults analysisData={analysisData} />}
    </>
  )
}

export default Analysis
