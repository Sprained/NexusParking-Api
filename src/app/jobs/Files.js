const fs = require('fs')

class Files{
    get key(){
        return 'Files'
    }

    async handle({ data }){
        function del(){
            fs.unlinkSync(`./temp/${data.name}.csv`)
        }
        setTimeout(del, 60000);
    }
}

module.exports = new Files();