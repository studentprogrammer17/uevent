import nodemailer from 'nodemailer';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('src/settings/email-config.json', 'utf8'));

class SendMail { 
    constructor(userEmail) {

    }
    send(to, token, type) {
        const massageEmail = {};
        if(type === 'buyTicket') {
            massageEmail.subject = 'Sign up for the event';
            massageEmail.html = `
     <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div{
            padding: 15px;
            text-align: center;
            background-color: #000000;
        }
        .header{
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 600;
            font-size: 28px;
            line-height: 43px;
            color: #9e9e9e;
        } 
        .text{
            font-family: 'Montserrat';
            font-style: normal;
            width: 400;
            text-align: center;
            font-weight: 400;
            font-size: 18px;
            line-height: 150%;
            width: 446px;
            color: #9e9e9e;
        }
        .confirm-link{
            font-family: 'Montserrat';
            text-decoration: none;
            font-weight: 400;
            font-size: 18px;
            line-height:  150%;
        }
        .text-div{
        display: flex;
        margin-left: 360px;
        
        }
    </style>
</head>
<body>
    
    <div>
        <h1 class="header">Kvitochok</h1>
        <div class="text-div" style="justify-content: center">
        <p class="text">
            Thank you for buying a ticket on our website, your ticket is attached to this message
                <a style="color:#fba92c;"class ="confirm-link" href="http://localhost:3000/tickets">
                click here
                </a>
                to check your tickets
        </p>
    </div>
    </div>
</body>
</html>
        `;
        }


        else if (type === 'activate') {
            massageEmail.subject = 'Email confirmation';
            massageEmail.html = `
     <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div{
            padding: 15px;
            text-align: center;
            background-color: #000000;
        }
        .header{
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 600;
            font-size: 28px;
            line-height: 43px;
            color: #9e9e9e;
        } 
        .text{
            font-family: 'Montserrat';
            font-style: normal;
            width: 400;
            text-align: center;
            font-weight: 400;
            font-size: 18px;
            line-height: 150%;
            width: 446px;
            color: #9e9e9e;
        }
        .confirm-link{
            font-family: 'Montserrat';
            text-decoration: none;
            font-weight: 400;
            font-size: 18px;
            line-height:  150%;
        }
        .text-div{
        display: flex;
        margin-left: 360px;
        
        }
    </style>
</head>
<body>
    
    <div>
        <h1 class="header">Concertik</h1>
        <div class="text-div" style="justify-content: center">
        <p class="text">
            Thank you for registering on our website,
                <a style="color:#fba92c;"class ="confirm-link" href="http://localhost:3000/confirm-email/${token}">
                click here
                </a>
                to confirm your email
        </p>
    </div>
    </div>
</body>
</html>
        `;
        } else {
            massageEmail.subject = 'Reset password';
            massageEmail.html = `
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div{
            padding: 15px;
            text-align: center;
            background-color: #000000;
        }
        .header{
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 600;
            font-size: 28px;
            line-height: 43px;
            color: #9e9e9e;
        } 
        .text{
            font-family: 'Montserrat';
            font-style: normal;
            width: 400;
            text-align: center;
            font-weight: 400;
            font-size: 18px;
            line-height: 150%;
            width: 446px;
            color: #9e9e9e;
        }
        .confirm-link{
            font-family: 'Montserrat';
            text-decoration: none;
            font-weight: 400;
            font-size: 18px;
            line-height:  150%;
        }
        .text-div{
        display: flex;
        margin-left: 360px;
        
        }
    </style>
</head>
<body>
    
    <div>
        <h1 class="header">Concertik</h1>
        <div class="text-div" style="justify-content: center">
        <p class="text">
             You requested for reset password,
                <a style="color:#fba92c;"class ="confirm-link" href="http://localhost:3000/reset-password/${token}">
                click here
                </a>
                to reset your password
        </p>
    </div>
    </div>
</body>
</html>
        `;
        }
        const mail = nodemailer.createTransport(config);
        const mailOptions = {
            from: this.from,
            to,
            subject: massageEmail.subject,
            text: '',
            html: massageEmail.html
        };
        if(type === 'buyTicket') {
            mailOptions.attachments = [{
                    filename: 'ticket.pdf',
                    path: `../../UEvent/server/assets/tickets/${token}.pdf`,
                    contentType: 'application/pdf'
            }]
        }
        mail.sendMail(mailOptions, function (error, info) {
        });
    }
}

export default new SendMail();