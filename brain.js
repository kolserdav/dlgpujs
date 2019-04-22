const brain = require('brain.js');
const nj = require('numjs');
const jimp = require('jimp');
const GPU = require("gpu.js").GPU;
const gpu = new GPU();
const fs = require('fs');
const io = require('socket.io').listen(3000);
    
    
class Brain {

    constructor(){

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

        const imageOld = './public/static/images/puppy-1903313__340.jpg';
        const image = `./dataSets/${this.data[1].dbName}/${this.data[1].fileName}`
        io.sockets.on('connection', (socket) => {
            socket.on('message', (data) => {
                jimp.read(image)
                .then(image => {
                    const width = image.bitmap.width;
                    const heigth = image.bitmap.height;
                    let array = nj.uint8(image.bitmap.data.toJSON().data);
                    array = array.reshape(heigth, width, 4);
                    let list = array.tolist();
                    var gpuKernel = gpu.createKernel(function(array) {
                        if (this.thread.x !== 3){
                            return array[this.thread.z][this.thread.y][this.thread.x];
                        }
                        else {
                            return array[this.thread.z][this.thread.y][this.thread.x];
                        }
                    })
                        .setOutput([4, width, heigth]);
                    list = gpuKernel(list);
                    let array2 = nj.uint8(list);
                
                    array = array.reshape(heigth * width * 4)
                    array2 = array2.reshape(heigth * width * 4)
                    socket.json.send({
                        data: array2,
                        dataPack: this.data,
                        width: width,
                        height: heigth
                    }); 
                })
                .catch(err => console.error(err))
            });
        });
        io.sockets.on('disconnect', () => {
            const time = (new Date).toLocaleTimeString();
            io.sockets.json.send({'event': 'userSplit'});
        })
        
    }
}

const b = new Brain();
