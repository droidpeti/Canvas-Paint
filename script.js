const canvas = document.getElementById("Canvas");
canvas.getContext("2d").fillStyle = "white";
canvas.getContext("2d").fillRect(0,0,canvas.width,canvas.height);

const imageLoader = document.getElementById("imageLoader");
let isDrawing = false;
let lastX;
let lastY;

function canvasDraw(canvas, event){
    let ctx = canvas.getContext("2d");
    let color = document.getElementById("colorPicker").value;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x,y);
        ctx.stroke();
        ctx.closePath();
    }

    lastX = x;
    lastY = y;
}

function saveImage(){
    let canvasUrl = canvas.toDataURL("image/jpeg", 0.5);
    console.log(canvasUrl);
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = "meno_webes_paint";
    createEl.click();
    createEl.remove();
}

function importIMG() {
    let file = imageLoader.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        img.src = event.target.result;
    }
}


canvas.addEventListener('mousedown', function(e) {
    canvasDraw(canvas, e)
    let ctx = canvas.getContext("2d");
    let color = document.getElementById("colorPicker").value;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.fillStyle = color;
    ctx.fillRect(x,y,3,3);
    isDrawing = true;
})

canvas.addEventListener('mousemove' , function(e){
    if(isDrawing){
        canvasDraw(canvas,e)
    }
})

canvas.addEventListener('mouseup', function(e){
    isDrawing = false;
})

canvas.addEventListener('mouseleave', function(e){
    isDrawing = false;
})