const canvas = document.getElementById("visual");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
