const { application } = require('express');
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();

app.use(express.json());
app.use(cors())

app.post('/', function(req, res){
    const body = req.body;
    let respose;

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

app.listen(1337, () => console.log("Rodando"))