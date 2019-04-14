import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const MessagelListItem = ({ message }) => (
  <ListItem>
    <ListItemText secondary={message} disabled />
  </ListItem>
)

export default MessagelListItem
