const GPU = require('gpu.js').GPU;
const gpu = new GPU();
const http = require('http');




const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const matMult = gpu.createKernel(function(a, b) {
        var sum = 0;
        for (var i = 0; i < 800; i++) {
            sum += a[this.thread.y][i] * b[i][this.thread.x];
        }
        return sum;
    }).setOutput([800, 800]);
    
    // Perform matrix multiplication on 2 matrices of size 512 x 512
    const c = matMult(800, 800);
    console.log(c)
    res.end(JSON.stringify({res: c}));
});

server.listen(3000);