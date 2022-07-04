const { response } = require('express');
const express =  require('express');
const twilio = require('twilio');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;

const app = express();
app.use(express.json());
app.use(urlencoded({extended: false}));

app.post('/', (req, resp) =>{
    const record = new VoiceResponse()
    record.say({
        voise: 'woman',
        language: 'pt-BR'
    }, 'Me deixa uma mensagem para eu reproduzir para você: ')

    record.record({
        maxlength: 10,
        //transcribe: true,
        action: '/record'
        
    });
    resp.type('text/xml');
    resp.send(record.toString());
})

app.post('/record', (req, resp) => {
    const re = req.body;
    const re2 = req.params;
    //console.log(re2);
    console.log(re);
    console.log(re.RecordingUrl);
    const replay = new VoiceResponse();
    replay.play({
        loop: 1
    }, (`${re.RecordingUrl}.mp3`));
    //resp.type('text/xml');
    resp.send(replay.toString());
})

app.listen(1337);


