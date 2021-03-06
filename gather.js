const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;

const app = express();

// Parse incoming POST params with Express middleware
app.use(urlencoded({ extended: false }));

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post('/', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();

  // Use the <Gather> verb to collect user input
  const gather = twiml.gather({ numDigits: 1 });
  gather.say({
    voice: 'woman',
    language: 'pt-BR'
},'Para vendas, digite 1, por favor!');

  // If the user doesn't enter input, loop
  twiml.redirect('/');

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
console.log('Twilio Client app HTTP server running at http://127.0.0.1:1337');
app.listen(1337);
