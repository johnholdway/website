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


function drawWedge() {

    const radius = Math.max(width, height);

    // The wedge angle
    const wedgeAngle = Math.PI * 2 / 8;

    ctx.save();

    // Draw the pattern inside one wedge
    ctx.beginPath();

    ctx.moveTo(0, 0);

    ctx.arc(
        0,
        0,
        radius,
        -wedgeAngle / 2,
        wedgeAngle / 2
    );

    ctx.closePath();

    ctx.clip();

    // Background of the wedge
    const gradient = ctx.createLinearGradient(
        0,
        0,
        radius,
        0
    );

    gradient.addColorStop(0, "#ff00cc");
    gradient.addColorStop(0.5, "#6600ff");
    gradient.addColorStop(1, "#00ccff");

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        -radius,
        radius,
        radius * 2
    );

    // Some circles inside the wedge
    for (let i = 1; i < 8; i++) {

        const distance = radius * i / 8;

        ctx.beginPath();

        ctx.arc(
            distance,
            Math.sin(i) * radius * 0.15,
            radius * 0.04,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `hsl(${i * 45}, 100%, 60%)`;

        ctx.fill();
    }

    ctx.restore();
}


function draw() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    ctx.save();

    ctx.translate(centerX, centerY);

    ctx.rotate(rotation);

    const symmetry = 8;
    const wedgeAngle = Math.PI * 2 / symmetry;

    for (let i = 0; i < symmetry; i++) {

        ctx.save();

        ctx.rotate(i * wedgeAngle);

        // Draw the normal wedge
        drawWedge();

        // Draw its mirror image
        ctx.scale(1, -1);

        drawWedge();

        ctx.restore();
    }

    ctx.restore();

    rotation += 0.002;

    requestAnimationFrame(draw);
}

draw();
