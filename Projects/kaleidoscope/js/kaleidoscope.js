const canvas = document.getElementById("visual");
const ctx = canvas.getContext("2d");

let width;
let height;
let centerX;
let centerY;

let rotation = 0;
let zoom = 0;


function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    centerX = width / 2;
    centerY = height / 2;
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();


function drawPattern(scale, time) {

    const radius = Math.max(width, height) * scale;

    const wedgeAngle = Math.PI * 2 / 8;

    ctx.save();

    // Keep the pattern inside one wedge
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


    // Gradient
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


    // Moving circles
    for (let i = 1; i < 13; i++) {

        const distance =
            radius *
            (i / 12);

        const wave =
            Math.sin(
                time * 0.8 +
                i
            ) * radius * 0.15;

        ctx.beginPath();

        ctx.arc(
            distance,
            wave,
            radius * 0.045,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `hsl(${i * 45 + time * 30}, 100%, 60%)`;

        ctx.fill();
    }

    ctx.restore();
}


function draw(time) {

    ctx.fillStyle = "black";
    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    ctx.save();

    ctx.translate(
        centerX,
        centerY
    );

    ctx.rotate(rotation);


    const symmetry = 8;
    const wedgeAngle =
        Math.PI * 2 / symmetry;


    /*
       Draw several nested scales.

       As zoom increases, the scales
       continuously move through one another.
    */

    for (let layer = 0; layer < 12; layer++) {

        let scale =
            Math.pow(
                1.35,
                layer - 6
            );

        scale *=
            Math.pow(
                1.7,
                zoom
            );


        // Keep scales in a useful range
        scale =
            scale % 3;


        if (scale < 0.25) {
            scale += 0.25;
        }


        ctx.save();

        for (
            let i = 0;
            i < symmetry;
            i++
        ) {

            ctx.save();

            ctx.rotate(
                i * wedgeAngle
            );

            drawPattern(
                scale,
                time * 0.001
            );

            // Mirror
            ctx.scale(1, -1);

            drawPattern(
                scale,
                time * 0.001
            );

            ctx.restore();
        }

        ctx.restore();
    }

    ctx.restore();


    // Slowly rotate
    rotation += 0.0015;

    // Slowly zoom
    zoom += 0.0003;


    requestAnimationFrame(draw);
}


requestAnimationFrame(draw);
