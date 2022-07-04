const express = require('express');
const urlencoded = require('body-parser').urlencoded;
var request = require("request")
const VoiceResponse = require('twilio').twiml.VoiceResponse;


const app = express()
app.use(express.json())
app.use(urlencoded({ extended: false }));

app.get('/', async (req2, response) =>{
    const cep = req2.body;
    console.log(cep.cep)
    //await request('GET',`https://viacep.com.br/ws/${cep.cep}/json/`);
    await request(`https://viacep.com.br/ws/${cep.cep}/json/`, function(_error, res3) {
          const log = JSON.parse(res3.body);
          console.log(log);
          twiml.say({
            voice: 'woman',
            language: 'pt-BR'
        }, `A rua deste cep é: ${log.logradouro}; adeus meu amigo...`);
          console.log(log.logradouro)
        
    });
    
     
});
//console.log(log)
app.listen(1337)