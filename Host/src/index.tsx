import React from "react";
import ReactDOM from 'react-dom/client'

const App = () => {
  return <div>App 36435</div>
}

const dom = document.getElementById('root')

if (dom) {
  ReactDOM.createRoot(dom).render(<App />)
}