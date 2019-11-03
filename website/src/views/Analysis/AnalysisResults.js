import React from 'react'
import { Col, Row } from 'react-bootstrap'

const AnalysisResults = ({ analysisData }) => {
  return (
    <Row>
      <Col>
        <p>Cooking time: {analysisData.time_h}</p>
        <p>Energy to cook: {analysisData.energy_kJ} KJ</p>
      </Col>
    </Row>
  )
}

export default AnalysisResults
