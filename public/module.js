


const canvas = document.querySelector('#canvas');
const canvas2 = document.querySelector('#canvas2');
let ctx = canvas.getContext('2d');
let ctx2 = canvas2.getContext('2d');

class Module {

    constructor(){
        this.socket = io('http://localhost');
        this.socket.on('connect', function(){
            console.info('Connected!');
        });
        this.socket.on('message', function(data){
            console.log(data);
            console.log(data.dataPack)
            var dataImage = ctx.createImageData(data.width, data.height);
            const array = data.data.split(',');
            array.map((item, index) => {
                dataImage.data[index] = parseInt(item);
            });
            ctx2.putImageData(dataImage, 0, 0);
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
