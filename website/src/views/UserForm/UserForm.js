import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Analysis from '../Analysis/Analysis'
import NewFile from './NewFile'
import './userForm.css'

const Form = ({ onclick }) => {
  const [filePath, setFilePath] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <Container>
      <NewFile setFilePath={setFilePath} />
      {filePath && <Analysis filePath={filePath} />}
    </Container>
  )
}

export default Form
