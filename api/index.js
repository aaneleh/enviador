const { application } = require('express');
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();

app.use(express.json());
app.use(cors())

let status = false;

app.get('/', function(req, res){
    if(status){
        res.send('nice');
    } else {
        res.send('not nice');
    }

})
app.post('/', function(req, res){
    status = true;

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

app.listen(5050, () => console.log("Rodando na porta 5050"));

module.exports = app;