import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Analysis from '../Analysis/Analysis'
import NewFile from './NewFile'
import './userForm.css'

const Form = ({ onclick }) => {
  const [filePath, setFilePath] = useState(null)
  const [loading, setLoading] = useState(false)
  const [analysisData, setAnalysisData] = useState(null)
  const [labels, setLabels] = useState([])

  return (
    <Container>
      <NewFile
        setFilePath={setFilePath}
        setLabels={setLabels}
        setLoading={setLoading}
      />
      {filePath && (
        <Analysis
          filePath={filePath}
          loading={loading}
          labels={labels}
          setAnalysisData={setAnalysisData}
          analysisData={analysisData}
        />
      )}
    </Container>
  )
}

export default Form
