import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom'

declare global {
  interface Window { portfolio: any; }
}

window.portfolio = {
  github: "https://github.com/joaovictorbarrera",
  linkedin: "https://www.linkedin.com/in/joao-barrera-373547145/"
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
