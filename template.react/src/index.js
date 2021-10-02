import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

ReactDom.render(
  <HelmetProvider>
    <Router>
      <App />
    </Router>
  </HelmetProvider>,
    document.querySelector('#root')
)
