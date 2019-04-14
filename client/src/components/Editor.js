import React, { Component } from 'react'

export default class Editor extends Component {
  state = {
    text: '',
    channel: null,
  }

  changeText(event) {
    const newText = event.target.value
    this.setState({ text: newText })
  }

  sendMessage() {
    const message = this.state.text
    const channel = this.props.channel
    this.props.putMessage({ channel: channel, message: message })
    this.setState({ ...this.state, text: '' })
  }

  render() {
    return (
      <div>
        <input
          type='text'
          onChange={this.changeText.bind(this)}
          value={this.state.text}
        />
        <button
          disabled={this.state.text === ''}
          onClick={this.sendMessage.bind(this)}
        >
          Submit
        </button>
      </div>
    )
  }
}
