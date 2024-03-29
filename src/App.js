import React, { Component } from 'react'
import './App.css'
import './DarkApp.css'

import {marked} from 'marked'

import { sampleText } from './sampleText'

class App extends Component {
  state = {
    text: sampleText,
  }

  componentDidMount() {
    const text = localStorage.getItem('text')

    if (text) {
      this.setState({ text })
    } else {
      this.setState({ text: sampleText })
    }
  }

  componentDidUpdate() {
    const { text } = this.state
    localStorage.setItem('text', text)
  }

  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }

  renderText = text => {
    const __html = marked(text, { sanitize: true })
    return { __html }
  }


  render() {

    return (
      <div className='container'>
        <h1 className='head'>MarkDown Editor</h1>
        <div className='row'>
          <div className='col-sm-6'>
            <textarea
              onChange={this.handleChange}
              value={this.state.text}
              className='form-control dark-mode'
              rows='24' />
          </div>
          <div className='col-sm-5 dark-mode'>
            <div className='dark-mode' dangerouslySetInnerHTML={this.renderText(this.state.text)} />
          </div>
        </div>
      </div>
    )
  }
}

export default App