import { all, put, takeEvery, call } from 'redux-saga/effects'

import API from '../api/apiService'

export function* watchsetChannel() {
  yield takeEvery('SET_CHANNEL', setChannel)
}

export function* watchfetchChannels() {
  yield takeEvery('FETCH_CHANNELS', fetchChannels)
}

export function* watchFetchMessages() {
  yield takeEvery('FETCH_MESSAGES', fetchMessages)
}

export function* watchPutMessage() {
  yield takeEvery('PUT_MESSAGE', putMessage)
}

export function* fetchChannels(action) {
  const channels = yield call(API.getChannels, action)
  yield put({ type: 'FETCH_CHANNELS_SUCCESS', payload: channels })
}

function* fetchMessages(action) {
  const messages = yield call(API.getMessages, action.payload)
  yield put({type: 'FETCH_MESSAGES_SUCCESS', payload: { messages: messages }})
}

function* putMessage(action) {
  const { channel, message } = action.payload;
  yield put({type: 'PUT_MESSAGE_SUCCESS', payload: {channel: channel, message: message}})
  yield call(API.putMessage, channel, message)
}

export function* setChannel(action) {
  const channel = action.payload;
  yield put({ type: 'SET_CHANNEL_SUCCESS', payload: channel })
  yield put({ type: 'FETCH_MESSAGES', payload: channel })
}

export default function* rootSaga() {
  yield all([
    watchfetchChannels(),
    watchFetchMessages(),
    watchPutMessage(),
    watchsetChannel()
  ])
}