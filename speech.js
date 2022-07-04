const express = require('express');//rotas
const VoiceResponse = require('twilio').twiml.VoiceResponse;//função twilio
const urlencoded = require('body-parser').urlencoded;


const app = express();

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.use(urlencoded({ extended: false }));


app.post('/', (request, response) => {
    const thw = new VoiceResponse();
    const gather = thw.gather({
    input: 'speech',
    action: '/completed'
});
gather.say('Welcome to Twilio, please tell us why youre calling');

response.redirect('/');
  
    // Render the response as XML in reply to the webhook request
    response.type('text/xml');
    response.send(gather.toString());
});

//app.post('/gather', (request, response) => {
app.post('/completed', (request, response) => {
    const twiml = new VoiceResponse();

    twiml.say({
        voice: 'woman',
        language: 'pt-BR'
    },'Você selecionou um setor que não há atendentes no momento, adeus!');

    response.type('text/xml');
    response.send(twiml.toString());
});
//console.log(response.toString());
console.log('Twilio Client app HTTP server running at http://127.0.0.1:1337');
app.listen(1337);