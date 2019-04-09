const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

// Server state
const state = {
    channel1: [],
    channel2: [],
    channel3: [],
    channel4: [],
    channel5: []
}


app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.text({ type: 'text/plain' }))

// Public path
app.use(express.static('public'))

// API Routes
app.get('/api/channels', (req, res) => {
    console.log("Received a GET HTTP method: list channels")
    const channels = Object.keys(state)
    return res.json(channels);
});

app.get('/api/messages/:channel', (req, res) => {
    const channelId = req.params.channel
    console.log('Received a GET HTTP method for channel ' + channelId);
    
    const response = state[channelId]
    return res.json(response);
});

app.put('/api/:channel', (req, res) => {
    const channelId = req.params.channel
    const newMessage = req.body

    console.log('Received a PUT HTTP method for channel ' + channelId);

    if(!channelId) {
        res.status(500)
        res.render('Error: Invalid channel')
    }

    console.log("Adding new message: " + newMessage)
    state[channelId].push(newMessage)
    const response = state[channelId]
    return res.json(response);
});


app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});

app.listen(port, () => {
    console.log('Express server listening on port ' + port)
})

module.exports = app
