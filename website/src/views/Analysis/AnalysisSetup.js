import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import 'react-input-range/lib/css/index.css'

/*
thickness from 0.02 0.1
*/

const AnalysisSetup = ({ labels, setAnalysisData }) => {
  const [thickness, setThickness] = useState(0.05)

  function handleSubmit () {
    const form = document.getElementById('newFile')
    const data = new FormData(form)
    const labelInput = document.getElementById('label')
    data.append('label', labelInput.value)
    data.append('thickness', thickness)

    return fetch(`/api/analize`, {
      method: 'post',
      body: data
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setAnalysisData(res)
      })
  }

  return (
    <>
      <div className='d-flex align-items-center justify-content-center mb-3'>
        <span className='mr-3'>This is</span>
        <select className='form-control w-auto' id='label' name='label'>
          {labels.map((label, i) => {
            return (
              <option key={`label${i}`} value={label.label}>
                {label.label}
              </option>
            )
          })}
        </select>
      </div>
      <Button onClick={handleSubmit} className='w-100 bg-success btn-lg'>
        Cook{' '}
        <span role='img' aria-label='fire'>
          🔥
        </span>
      </Button>
    </>
  )
}

export default AnalysisSetup
