const brain = require('brain.js');
const nj = require('numjs');
const jimp = require('jimp');
const http = require('http');
var GPU = require("gpu.js").GPU;
var gpu = new GPU();

const image = './public/static/images/puppy-1903313__340.jpg';
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    jimp.read(image)
    .then(image => {
        const width = image.bitmap.width;
        const heigth = image.bitmap.height;
        let array = nj.uint8(image.bitmap.data.toJSON().data);
        array = array.reshape(heigth, width, 4)
        let list = array.tolist();
        console.log(list.length)
        console.log(list[1].length)
        console.log(list[1][1].length)
        var gpuKernel = gpu.createKernel(function(array) {
            if (this.thread.z % 3 === 0){
                return array[this.thread.z][this.thread.y][this.thread.x] * 2;
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
        console.log(list.length)
        console.log(list[1].length)
        console.log(list[1][1].length)
        res.end(JSON.stringify({
            data: array2,
            width: width,
            height: heigth
        })) 
    })
    .catch(err => console.error(err))
    
})
server.listen(3000)

const myFunc = gpu.createKernel(function() {
    return this.thread.x;
}).setOutput([4, 3, 2]);

console.log(myFunc());


