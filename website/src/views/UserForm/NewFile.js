import React, { useState } from 'react'
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import './newFile.css'

const NewFile = ({ updateList }) => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  //   const { append } = useContext(FilesContext)

  function handleSubmit (e) {
    e.preventDefault()
    console.log(e)
    setUploading(true)
    // const data = new FormData(e.target)
    // return fetch(`${URL_API}/file`, {
    //   method: 'post',
    //   headers: {
    //     Authorization: `Bearer ${UserControl.getToken()}`
    //   },
    //   body: data
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     append(res)
    //     setFile(null)
    //     setUploading(false)
    //     document.getElementById('file').value = ''
    //   })
    //   .catch(handleSubmitError)
  }

  //   function handleSubmitError (err) {
  //     console.log(err)

  //     setFile(null)
  //     setUploading(false)
  //     document.getElementById('file').value = ''
  //     alert('Unexpected error. Please try another file.')
  //   }

  function handleChange (e) {
    const form = document.getElementById('newFile')
    const data = new FormData(form)
    data.append('test', 'Hello')
    setFile(data.get('file').name)

    return fetch(`/api/analize`, {
      method: 'post',
      body: data
    })
      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(res => console.log(res))
    //   .then(res => {
    //     // append(res)
    //     // setFile(null)
    //     // setUploading(false)
    //     // document.getElementById('file').value = ''
    //   })
    //   .catch(handleSubmitError)
  }

  let fileInput

  return (
    <>
      <Row className='mt-4'>
        <Col>
          <h1 className='font-weight-light mb-4'>New file</h1>
          <Form id='newFile' onSubmit={handleSubmit}>
            <Card
              className={`new-file bg-transparent text-white ${
                uploading ? 'blocked' : ''
              }`}
              onClick={() => (!uploading ? fileInput.click() : null)}
            >
              <Card.Body className='d-flex justify-content-center align-items-center'>
                {file ? (
                  <>
                    {file}
                    {/* <Icon
                      path={mdiCheck}
                      size={1}
                      color='green'
                      className='ml-2'
                    /> */}
                  </>
                ) : (
                  'Click here to upload a new file'
                )}
              </Card.Body>
              <Form.Group controlId='file' className='upload-form d-none'>
                <Form.Control
                  type='file'
                  name='file'
                  ref={ref => (fileInput = ref)}
                  onChange={handleChange}
                />
              </Form.Group>
            </Card>
            <Button
              variant='success'
              className='mt-3 float-right'
              type='submit'
              disabled={uploading || !file}
              style={{ width: '100px' }}
            >
              {uploading ? (
                <Spinner animation='border' size='sm' as='span' />
              ) : (
                'Upload'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default NewFile
