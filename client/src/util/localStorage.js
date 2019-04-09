export function getChannel(channelId) {
    if(!channelId) return;
    const channelMessages = localStorage.getItem(channelId)
    const messageList = JSON.parse(channelMessages)  || []
    return messageList
}

export function addToChannel(channelId, message) {
    if(!channelId) return;
    const channelMessages = localStorage.getItem(channelId)
    const messageList = JSON.parse(channelMessages) || []
    messageList.push(message)
    const newMessages = JSON.stringify(messageList)
    localStorage.setItem(channelId, newMessages)
}