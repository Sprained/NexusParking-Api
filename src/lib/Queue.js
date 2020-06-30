const Bee = require('bee-queue');

const RegisterMail = require('../app/jobs/RegisterMail');
const PayMail = require('../app/jobs/PayMail');

const redisConfig = require('../config/redis');

const jobs = [RegisterMail, PayMail];

class Queue{
    constructor(){
        this.queues = {};

        this.init();
    }

    init(){
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
                bee: new Bee(key, {
                    redis: redisConfig
                }),
                handle 
            };
        });
    }

    add(queue, job){
        return this.queues[queue].bee.createJob(job).save();
    }

    processQueue(){
        jobs.forEach(job => {
            const { bee, handle } = this.queues[job.key];

            bee.on('failed', this.handleFailure).process(handle);
        });
    }

    handleFailure(job, error){
        console.log(`Queue ${job.queue.name}: FAILED`, error);
    }
}

module.exports = new Queue();