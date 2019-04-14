import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import {
  setChannel,
  fetchMessages,
  putMessage,
} from '../actions/actionCreators'

import Editor from './Editor'
import MessageListItem from './MessageListItem'

class Dashboard extends Component {
  componentDidMount() {
    this.props.onFetchChannels()
  }

  getChannel(channelId) {
    this.props.onFetchMessages(channelId)
  }

  render() {
    const { setChannel, putMessage, channels, messages, channel } = this.props

    const channelListItems = channels.map(channel => (
      <ListItem button key={channel} onClick={() => setChannel(channel)}>
        <ListItemText primary={channel} />
      </ListItem>
    ))

    const messageListItems = messages.map(message => (
      <MessageListItem message={message} />
    ))

    return (
      <div>
        <main>
          <div />
          <Typography variant='h4' gutterBottom component='h2'>
            Channels
          </Typography>
          <Typography component='div'>
            <List>{channelListItems}</List>
          </Typography>
          <Divider />

          <Typography variant='h4' gutterBottom component='h2'>
            {`Messages ${channel || ''}`}
          </Typography>
          <Typography component='div'>
            <List>{messageListItems}</List>
          </Typography>
          <Divider />

          <Typography variant='h4' gutterBottom component='h2'>
            Editor
          </Typography>
          <div>
            <Editor channel={channel} putMessage={putMessage} />
          </div>
          <Divider />
        </main>
      </div>
    )
  }
}

Dashboard.propTypes = {
  channel: PropTypes.string,
  channels: PropTypes.array,
  messages: PropTypes.array,
  onFetchChannels: PropTypes.func,
}
Dashboard.defaultProps = {
  channel: '',
  channels: [],
  messages: [],
}

function mapStateToProps(state) {
  const { channels, messages, channel } = state
  return { channels: channels, messages: messages, channel: channel }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchMessages,
      putMessage,
      setChannel,
    },
    dispatch,
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
