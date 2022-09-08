const { application } = require('express');
const { readFile, readFileSync } = require('fs');
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', function(req, res){
    readFile('./index.html', 'utf8', (err, txt) => {

        if(err){
            res.send('Desculpe, um erro ocorreu :(');
        }

        res.send(txt);
        //res.send('Mande seu request para <span style="text-decoration: underline">https://enviador.vercel.app/</span>');

    })
})

app.post('/', function(req, res){
    const body = req.body;

    sgMail.setApiKey(body.apiKey); 
    const msg = {
        to: body.to,
        from: body.from,
        subject: body.subject,
        text: body.subject,
        html: body.html
    };
    sgMail.send(msg).then((sgRes) => res.send('Email enviado') )
        .catch((sgError) => res.send(sgError.message) )
})

app.listen(5000, () => {
    console.log("Rodando na porta 5000")
});

module.exports = app;