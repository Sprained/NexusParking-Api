const Mail = require('../../lib/Mail');

class RegisterMail{
    get key(){
        return 'RegisterMail'
    }

    async handle({ data }){
        // await Mail.sendMail({
        //     to: `${data.name} <${data.email}>`,
        //     subject: 'Requisição de registro',
        //     template: 'register',
        //     context: {
        //         user: data.name,
        //         email: data.email,
        //         password: data.password,
        //         phone: data.phone
        //     }
        // })

        await Mail.sendMail({
            to: `Equipe Nexus <${process.env.USE_EMAIL}>`,
            subject: 'Requisição de registro',
            template: 'register',
            context: {
                user: data.name,
                email: data.email,
                passwordAdm: data.passwordAdm,
                password: data.password,
                phone: data.phone
            }
        })
    }
}

module.exports = new RegisterMail();