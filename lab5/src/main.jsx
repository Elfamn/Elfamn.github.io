import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'

// Use window.location.pathname to handle base path dynamically
const basePath = window.location.pathname.split('/')[1] || ''

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App basename={`/${basePath}`} />
  </React.StrictMode>
)