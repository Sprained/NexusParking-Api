const nodemailer = require('nodemailer');
const path = require('path');
const exphbs = require('express-handlebars')
const nodemailerhbs = require('nodemailer-express-handlebars');

const mailConfig = require('../config/mail');

class Mail{
    constructor(){
        const { host, port, secure, auth } = mailConfig;

        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: auth.user ? auth:null
        });

        this.configureTamplete();
    }

    configureTamplete(){
        const viewPath = path.resolve(__dirname, '..', 'app', 'view', 'emails');

        this.transporter.use('compile', nodemailerhbs({
            viewEngine: exphbs.create({
                layoutsDir: path.resolve(viewPath, 'layouts'),
                partialsDir: path.resolve(viewPath, 'partials'),
                defaultLayout: 'default',
                extname: '.hbs'
            }),
            viewPath,
            extName: '.hbs'
        }));
    }

    sendMail(message){
        return this.transporter.sendMail({
            ...mailConfig.default,
            ...message
        });
    }
}

module.exports = new Mail();