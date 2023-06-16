import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BookContainer from './components/BookContainer/BookContainer'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<BookContainer />} />
    </Routes>
  )
}

export default App
