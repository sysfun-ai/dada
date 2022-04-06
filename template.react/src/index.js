import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)
root.render(
    <StrictMode>
        <HelmetProvider>
            <Router>
                <App />
            </Router>
        </HelmetProvider>
    </StrictMode>
)
