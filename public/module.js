

const canvas = document.querySelector('#canvas');
const canvas2 = document.querySelector('#canvas2');
let ctx = canvas.getContext('2d');
let ctx2 = canvas2.getContext('2d');


const button = document.querySelector('#button');
button.addEventListener('click', () => {
    fetch('http://localhost:3000')
        .then(r => r.json())
        .then(data => {
            console.log(data.data)
            var dataImage = ctx.createImageData(data.width, data.height);
            const array = data.data.split(',');
            array.map((item, index) => {
                dataImage.data[index] = parseInt(item);
            });
            ctx2.putImageData(dataImage, 0, 0);
        })
        .catch(err => console.log(err))
})
