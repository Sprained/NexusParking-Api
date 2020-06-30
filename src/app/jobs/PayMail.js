const Mail = require('../../lib/Mail');

class PayMail{
    get key(){
        return 'PayMail'
    }

    async handle({ data }){
        await Mail.sendMail({
            to: `${data.name} <${data.email}>`,
            subject: `Pagamento realizado no estacionamento ${data.company}`,
            template: 'payment',
            context: {
                company: data.company,
                user: data.name,
                price: data.price,
                day: data.day,
            }
        })
    }
}

module.exports = new PayMail();