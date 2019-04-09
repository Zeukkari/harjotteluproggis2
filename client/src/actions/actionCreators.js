export function fetchMessages(channelId) {
    return { type: 'FETCH_MESSAGES', payload: channelId };
}

export function putMessage(payload) {
    return { type: 'PUT_MESSAGE', payload: payload };
}

export function setChannel(channel) {
    return { type: 'SET_CHANNEL', payload: channel}
}