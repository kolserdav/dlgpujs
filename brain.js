const brain = require('brain.js');
const nj = require('numjs');
const jimp = require('jimp');
const GPU = require("gpu.js").GPU;
const gpu = new GPU({mode: 'gpu'});
const fs = require('fs');
const io = require('socket.io').listen(3000);
const clientMongo = require('./src/mongodb').mongoConnect();
const assert = require('assert');  
    
class Brain {

    constructor(){
        this.weights = {};
        this.data = [];
        const dataPack = () => {
            let data = fs.readFileSync('./dataSets/training-a.csv').toString();
            data = data.split('\n');
            data.map(item => {
                let elements = item.split(',');
                this.data.push({
                    fileName: elements[0],
                    fullFileName: elements[1],
                    id: elements[2],
                    digit: elements[3],
                    dbName: elements[6]
                });
            });
        };
        dataPack();

        io.sockets.on('connection', (socket) => {
            socket.on('message', (data) => {
                this.startTrain(socket, data);  
            });
        });
        io.sockets.on('disconnect', () => {
            const time = (new Date).toLocaleTimeString();
            io.sockets.json.send({'event': 'userSplit'});
        })
        
    }

    async getClient(){
        this.db = await new Promise(resolve => {
            clientMongo.then(client => {
                const db = client.db('new');
                resolve(db)
            })
        });
    }

    async startTrain(socket, data){
        this.socket = socket;
        await this.getClient();
        this.collection = this.db.collection('weights');
        switch(data.request){
            case 0: 
                let i = (Math.random() * this.data.length).toFixed(0);
                await this.getWeight(i);
                this.trainScript(i);
                break;
            case 1:
                for (let i = 1; i < this.data.length; i ++){
                    await this.getWeight(i);
                    await this.trainScript(i);
                }
                break;
        }
    }

    async getWeight(i){
        return await new Promise(resolve => {
            this.collection.findOne({class: this.data[i].digit}, [], (err, res) => {
                assert.equal(null, err);
                if (res !== null){
                    this.weights[this.data[i].digit] = res.weight;
                }
                else {
                    this.weights[this.data[i].digit] = null;
                }
                resolve(res);
            })
        });
    }

    trainScript(i){
        return new Promise(resolve => {
            const image = `./dataSets/${this.data[i].dbName}/${this.data[i].fileName}`
        jimp.read(image)
        .then(image => {
            const width = image.bitmap.width;
            const heigth = image.bitmap.height;
            let array = nj.uint8(image.bitmap.data.toJSON().data);
            array = array.reshape(heigth, width, 4);
            let list = array.tolist();
            const classWeight = this.data[i].digit;
            if (!this.weights[classWeight]){
                let listWeigth = gpu.createKernel(function(){
                    return Math.random();
                })
                    .setOutput([4, width, heigth]);
                this.weights[classWeight] = listWeigth();
                this.collection.insertOne({
                    class: classWeight,
                    weight: this.weights[classWeight]
                }, function (){
         
                });
                
            }
            const gpuKernel = gpu.createKernel(function(array, weight) {
                if (this.thread.x !== 3){
                    return array[this.thread.z][this.thread.y][this.thread.x] * weight[this.thread.z][this.thread.y][this.thread.x];
                }
                else {
                    return array[this.thread.z][this.thread.y][this.thread.x];
                }
            })
                .setOutput([4, width, heigth]);
            list = gpuKernel(list, this.weights[classWeight]);
            array = nj.uint8(list);
            array = array.reshape(heigth * width * 4)
            this.socket.json.send({
                data: array,
                dataPack: this.data,
                width: width,
                height: heigth
            }); 
            resolve('Success');
        })
        .catch(err => console.error(err))
        })
    }
}

const b = new Brain();
