const canvas = document.getElementById("visual");
const ctx = canvas.getContext("2d");

let width;
let height;
let centerX;
let centerY;

let rotation = 0;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    centerX = width / 2;
    centerY = height / 2;
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();


function draw() {

    // Clear the canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    // Move to the center
    ctx.save();
    ctx.translate(centerX, centerY);

    // Rotate the entire pattern
    ctx.rotate(rotation);

    // Draw several radial lines
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    const radius = Math.max(width, height);

    for (let i = 0; i < 16; i++) {

        const angle = (Math.PI * 2 / 16) * i;

        ctx.beginPath();
        ctx.moveTo(0, 0);

        ctx.lineTo(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius
        );

        ctx.stroke();
    }

    ctx.restore();

    // Slowly rotate
    rotation += 0.002;

    requestAnimationFrame(draw);
}

draw();
