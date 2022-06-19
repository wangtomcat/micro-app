import React from "react";
import ReactDOM from 'react-dom/client'
// import App from './app'
import Layout from './router'

import './global.scss'

const dom = document.getElementById('root')

if (dom) {
  ReactDOM.createRoot(dom).render(<Layout />)
}