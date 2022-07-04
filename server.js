const http = require('http');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

http
  .createServer((req, res) => {
    // Create TwiML response
    const twiml = new VoiceResponse();

    twiml.say({
        voice: 'woman',
        language: 'pt-BR'
    },'Boa tarde Rosângela, você é incrível');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  })
  .listen(1337, '127.0.0.1');

console.log('TwiML server running at http://127.0.0.1:1337/');
