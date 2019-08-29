import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import icon from '@/assets/images/bg.jpg'

const App = () => {
  return (
    <Router>
      <div>
        <img src={icon} alt="logo" /> {/* 这样可以 */}
      </div>
    </Router>
  )
}

export default App
