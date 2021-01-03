import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import jsonBeautify from 'json-beautify'
import jsonFormatHighlight from 'json-format-highlight'

import './app.scss'

const isJsonValid = str => {
  try {
    const json = JSON.parse(str)
    return (typeof json === 'object')
  } catch (e) {
    return false
  }
}

const format = props => {
  const { input } = props

  if (isJsonValid(input)) {
    const _input = JSON.parse(input)
    const beautify = jsonBeautify(_input, null, 2)
    const highlight = jsonFormatHighlight(beautify)
    return highlight
  } else {
    return 'JSON is not valid'
  }
}

const App = () => {
  const defaultJsonInput = '{"store":{"book":[{"category":"reference","author":"Nigel Rees","title":"Sayings of the Century","price":8.95},{"category":"fiction","author":"Evelyn Waugh","title":"Sword of Honour","price":12.99},{"category":"fiction","author":"J. R. R. Tolkien","title":"The Lord of the Rings","isbn":"0-395-19395-8","price":22.99}],"bicycle":{"color":"red","price":19.95}}}'
  const localStorageJsonInput = window.localStorage.getItem('3:jsonInput')
  const _jsonInput = localStorageJsonInput || defaultJsonInput
  const [jsonInput, setJsonInput] = useState(_jsonInput)
  const [output, setOutput] = useState(format({ input: jsonInput }))

  const onJsonInputChange = e => {
    const value = e.target.value
    setJsonInput(value)

    const _format = format({ input: value })
    setOutput(_format)

    window.localStorage.setItem('3:jsonInput', value)
  }

  return (
    <div id='app'>
      <textarea
        id='input'
        value={jsonInput}
        onChange={onJsonInputChange}
        placeholder='Put some JSON here'
      />
      <div
        id='output'
        dangerouslySetInnerHTML={{ __html: output }}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
