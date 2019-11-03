import React from 'react'
import { Container } from 'react-bootstrap'
import NewFile from './NewFile'
import './userForm.css'

const Form = ({ onclick }) => {
  //   function chooseFile () {}

  return (
    <Container>
      <NewFile />
    </Container>
  )
}

export default Form
