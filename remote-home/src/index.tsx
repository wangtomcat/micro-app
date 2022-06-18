import React from 'react'
import ReactDOM from 'react-dom/client'

const App = () => {
  return <div>RemoteHome App</div>
}

const dom = document.getElementById('root')

if (dom) {
  const root = ReactDOM.createRoot(dom)
  root.render(<App />)
}

