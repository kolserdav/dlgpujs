
const Line = require('../src/frontend/line.js').Line;
const canvas2 = document.querySelector('#canvas2');
let ctx2 = canvas2.getContext('2d');

class Module {

    constructor(){
        new Line();
        this.socket = io('http://localhost');
        this.socket.on('connect', function(){
            console.info('Connected!');
        });
        this.socket.on('message', function(data){
            if (data.canvas === 2){
                console.log(data.data);
                var dataImage = ctx2.createImageData(data.width, data.height);
                const array = data.data.split(',');
                array.map((item, index) => {
                    dataImage.data[index] = parseInt(item);
                });
                ctx2.putImageData(dataImage, 0, 0);
            }
        });
        this.socket.on('disconnect', function(){
            console.warn('Disconnected!');
        });


        const buttonRand = document.querySelector('#button-random');
        buttonRand.addEventListener('click', () => {
            this.socket.send({
                request: 0,
                message: 'Start random'
            });
        })

        const buttonStart = document.querySelector('#button-start');
        buttonStart.addEventListener('click', () => {
            this.socket.send({
                request: 1,
                message: 'Start train'
            });
        })
    }
}

const m = new Module();
