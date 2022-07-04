const express = require('express');//rotas
const VoiceResponse = require('twilio').twiml.VoiceResponse;//função twilio
const urlencoded = require('body-parser').urlencoded;
var request = require("request")


const app = express();
app.use(express.json())

app.use(urlencoded({ extended: false }));
app.post('/', (request, response) => {
    const twiml = new VoiceResponse();
    const gather = twiml.gather({
        language: 'pt-BR',
        input: 'speech',
        action: '/gather'
    });
    twiml.play('https://dialogfiles.s3.us-east-2.amazonaws.com/work/Record+(online-voice-recorder.com)+(10).mp3')

    twiml.redirect('/');
    response.send(twiml.toString());
});

app.post('/gather', async (request, response) => {
    const twiml = new VoiceResponse();
    const body = request.body

    console.log(body.SpeechResult)
    var cep = (body.SpeechResult).replace(/[^\d]/g, "")
    console.log(cep)
    if (cep && ((cep.toString()).length == 8)) {

        var request = require("request");
        await request(`https://viacep.com.br/ws/${cep}/json/`, function (_error, res3) {
            const log = JSON.parse(res3.body);
            console.log(log);
            twiml.play('https://dialogfiles.s3.us-east-2.amazonaws.com/work/Record+(online-voice-recorder.com)+(10).mp3')
            twiml.say({
                voice: 'woman',
                language: 'pt-BR',
                action: '/end'
            }, `A rua deste cep é: ${log.logradouro}...`);
            console.log(log.logradouro)
            response.type('text/xml');
            response.send(twiml.toString());

        });

    }
    else {
        twiml.play('https://dialogfiles.s3.us-east-2.amazonaws.com/work/Record+(online-voice-recorder.com)+(11).mp3');
        twiml.redirect('/');
        response.send(twiml.toString());
    }
});

app.post('/end', (req, resp) => {
    const twiml = new VoiceResponse();
    twiml.say({
        voice: 'woman',
        language: 'pt-BR'
    }, `Obrigado por usar esta URA, até a próxima...`);
    resp.type('text/xml');
    resp.send(twiml.toString());
})



console.log('Twilio Client app HTTP server running at http://127.0.0.1:1337');
app.listen(1337);
