import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './lib/base.css'
import './lib/motion.css'
import './lib/motion-extra.css'
import './styles/app.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
