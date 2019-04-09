const API_URL = '/api'

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    return response.json().then(json => {
      const errorMsg = json.hasOwnProperty('message')
        ? json.message
        : response.statusText
      const error = new Error(errorMsg)
      throw error
    })
  }
}

export function parseJSON(response) {
  return response.text().then(text => {
    return text ? JSON.parse(text) : {}
  })
}

export default class Api {
  static getChannels() {
    return fetch(`${API_URL}/channels`)
      .then(checkStatus)
      .then(parseJSON)
  }

  static getMessages(channelId) {
    const options = {
      method: 'GET',
      mode: 'cors',
    }
    return fetch(`${API_URL}/messages/${channelId}`, options)
      .then(checkStatus)
      .then(parseJSON)
  }

  static putMessage(channelId, message) {
    const options = {
      method: 'PUT',
      mode: 'cors',
      body: message
    }
    return fetch(`${API_URL}/${channelId}`, options)
      .then(checkStatus)
      .then(parseJSON)
  }
}