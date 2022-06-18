import React from "react";
import ReactDOM from 'react-dom/client'
import App from './app'

const dom = document.getElementById('root')

if (dom) {
  ReactDOM.createRoot(dom).render(<App />)
}