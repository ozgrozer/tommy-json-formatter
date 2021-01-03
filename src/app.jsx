import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import jsonBeautify from 'json-beautify'
import jsonFormatHighlight from 'json-format-highlight'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
  const defaultJsonInput = '{"1":{"n":"Word Counter","d":"A word counter app","v":"1.0.1","r":"ozgrozer/tommy-word-counter"},"2":{"n":"Unixtime Converter","d":"A unixtime converter app","v":"1.0.3","r":"ozgrozer/tommy-unixtime-converter"},"3":{"n":"JSON Formatter","d":"A JSON formatter app","v":"1.0.0","r":"ozgrozer/tommy-json-formatter"}}'
  const localStorageJsonInput = window.localStorage.getItem('3:jsonInput')
  const _jsonInput = localStorageJsonInput || defaultJsonInput
  const [jsonInput, setJsonInput] = useState(_jsonInput)
  const [output, setOutput] = useState(format({ input: jsonInput }))
  const strippedOutput = output.replace(/<[^>]*>/g, '')

  const onJsonInputChange = e => {
    const value = e.target.value
    setJsonInput(value)

    const _format = format({ input: value })
    setOutput(_format)

    window.localStorage.setItem('3:jsonInput', value)
  }

  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
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

      {(strippedOutput && strippedOutput !== 'JSON is not valid') && (
        <CopyToClipboard
          onCopy={onCopy}
          text={strippedOutput}
        >
          <button id='copy' disabled={copied}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </CopyToClipboard>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
