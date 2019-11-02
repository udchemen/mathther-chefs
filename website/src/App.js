import React, { useState } from 'react'
import './App.css'
import logo from './logo.svg'

function App () {
  const [grettings, setGrettings] = useState(null)
  console.log(window)
  const name = 'lucas'
  fetch(`/api/hello?firstname=${name}`)
    .then(res => res.json())
    .then(res => {
      setGrettings(res.data)
    })

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h3>{grettings || 'Hello!!'}</h3>
      </header>
    </div>
  )
}

export default App
