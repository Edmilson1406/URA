// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
const express = require('express');//rotas
const VoiceResponse = require('twilio').twiml.VoiceResponse;//função twilio
const urlencoded = require('body-parser').urlencoded;
var request = require("request")


const app = express();
app.use(express.json())
// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.use(urlencoded({ extended: false }));
app.post('/', (request, response) => {
    var a = "Olá, me chamo Fin, me fale seu cep, por favor!";
    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new VoiceResponse();
  
    const gather = twiml.gather({
        //numDigits: 1,
        language: 'pt-BR',
        input: 'speech',
        action: '/gather'
    });
    gather.say({
        voice: 'woman',
        language: 'pt-BR'
    }, a);
  
    // If the user doesn't enter input, loop
    twiml.redirect('/');
  
    // Render the response as XML in reply to the webhook request
    response.type('text/xml');
    response.send(twiml.toString());
  });
  
  // Create a route that will handle <Gather> input
  app.post('/gather', async (request, response) => {
    const twiml = new VoiceResponse();
    const body = request.body
    //console.log(body)
    console.log(body.SpeechResult)
    var cep = (body.SpeechResult).replace(/[^\d]/g, "")
    console.log(cep)
    if(cep && ((cep.toString()).length == 8)){
    // Use the Twilio Node.js SDK to build an XML response
    var request = require("request");
    await request(`https://viacep.com.br/ws/${cep}/json/`, function(_error, res3) {
          const log = JSON.parse(res3.body);
          console.log(log);
          twiml.say({
            voice: 'woman',
            language: 'pt-BR'
        }, `A rua deste cep é: ${log.logradouro}; adeus meu amigo...`);
          console.log(log.logradouro)
          response.type('text/xml');
          response.send(twiml.toString());
        
    });
    
    // If the user entered digits, process their request
    /*if (request.body.Digits) {
      switch (request.body.Digits) {
        case '1':
          twiml.say({
            voice: 'woman',
            language: 'pt-BR'
        },'Você selecionou o setor de vendas, não há atendentes no momento, adeus!');
          break;
        case '2':
          twiml.say({
            voice: 'woman',
            language: 'pt-BR'
        },'Você selecionou um setor que não há atendentes no momento, adeus!');
          break;
        default:
          twiml.say({
            voice: 'woman',
            language: 'pt-BR'
        },"Descula, mas não compreendi o que você digitou, tente novamente");
          twiml.pause();
          twiml.redirect('/');
          break;
      }
    } else {
      // If no input was sent, redirect to the /voice route
      twiml.redirect('/');
    }*/
  
    // Render the response as XML in reply to the webhook request
    
}
else{
    twiml.say({
        voice: 'woman',
        language: 'pt-BR'
    }, 'Ops, não consegui entender seu cep, tente falar número por número, por favor!');
    twiml.redirect('/')
    response.type('text/xml');
    response.send(twiml.toString());
}
  });
  


console.log('Twilio Client app HTTP server running at http://127.0.0.1:1337');
app.listen(1337);
  