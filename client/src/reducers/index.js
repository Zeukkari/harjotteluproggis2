import { addToChannel } from '../util/localStorage'

export default function reducer(
  state = { channels: [], messages: [], channel: null },
  action,
) {
  switch (action.type) {
    case 'SET_CHANNEL':
      const channelId = action.payload
      return { ...state, channel: channelId, messages: [] }
    case 'FETCH_CHANNELS':
      return state
    case 'FETCH_CHANNELS_SUCCESS':
      return { ...state, channels: action.payload }
    case 'FETCH_MESSAGES':
      return state
    case 'FETCH_MESSAGES_SUCCESS':
      return { ...state, messages: action.payload.messages }
    case 'PUT_MESSAGE':
      const channel = state.channel
      addToChannel(channel, action.payload.message)
      const newMessages = state.messages.slice()
      newMessages.push(action.payload.message)
      return { ...state, messages: newMessages }
    case 'PUT_MESSAGE_SUCCESS':
      return state
    default:
      return state
  }
}
