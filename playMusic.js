const VoiceResponse = require('twilio').twiml.VoiceResponse;
const express =  require('express')
const urlencoded = require('body-parser').urlencoded

const app = express()
app.use(express.json())
app.use(urlencoded({ extended: false }));

app.post('/', (request, response) =>{
    const twiml = new VoiceResponse()

    twiml.play({
        loop: 2
    },'https://api.twilio.com/cowbell.mp3')
    response.send(twiml.toString());
})

//console.log(response.toString());

app.listen(1337)
