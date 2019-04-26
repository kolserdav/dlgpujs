const GPU = require("gpu.js").GPU;
const gpu = new GPU({mode: 'gpu'});
const selectDigest = gpu.createKernel(function (){
  return this.thread.x
})
  .setOutput([3, 3]);
const selectDigest1 = gpu.createKernel(function (){
  return this.thread.x
})
  .setOutput([3, 3]);
let matrix1 = selectDigest();
let matrix2 = selectDigest1();
const multiPle = gpu.createKernel(function (matrix1, matrix2){
  return matrix1[this.thread.z][this.thread.y][this.thread.x] * matrix2[this.thread.z][this.thread.y][this.thread.x];
})
  .setOutput([3, 3]);
console.log(multiPle(matrix1, matrix2))