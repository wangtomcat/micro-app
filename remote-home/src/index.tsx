import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './router'

const dom = document.getElementById('root')

if (dom) {
  const root = ReactDOM.createRoot(dom)
  root.render(<Home />)
}

