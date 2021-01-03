import React from 'react'
import ReactDOM from 'react-dom'

import './app.scss'

const App = () => {
  return (
    <div id='app'>
      <textarea id='input' placeholder='Input' />
      <div id='output'>output</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
