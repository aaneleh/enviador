//dependencias
const { application, response } = require('express');
const express = require('express');
const cors = require('cors');
const { readFile, readFileSync } = require('fs');
const sgMail = require('@sendgrid/mail');

//inicialização
const app = express();
app.use(express.json());
app.use(cors())

//rotas
app.get('/', function(req, res){
    
    const html = readFileSync('intro.html', 'utf8');
    res.send(html)
    
/*    
    res.send(html);
    res.send('Mande seu request para <span style="text-decoration: underline">https://enviador.vercel.app/</span>');
    readFile('intro.html', 'utf8', (err, html) => {
        if(err) res.status(500).send('Fora do ar :(');
        
        res.send(html);
    })
*/
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