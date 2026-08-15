const canvas = document.getElementById("visual");
const ctx = canvas.getContext("2d");

let width;
let height;
let centerX;
let centerY;

let rotation = 0;
let zoom = 0;

const symmetry = 8;
const particles = [];


// ----------------------------------------
// Canvas
// ----------------------------------------

function resizeCanvas() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    centerX = width / 2;
    centerY = height / 2;
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();


// ----------------------------------------
// Particle
// ----------------------------------------

function createParticle() {

    return {

        distance: Math.random(),

        speed:
            0.00003 +
            Math.random() * 0.00008,

        angle:
            (Math.random() - 0.5) *
            (Math.PI / symmetry),

        size:
            2 + Math.random() * 5,

        length:
            20 + Math.random() * 80,

        hue:
            Math.random() * 360,

        rotation:
            Math.random() * Math.PI * 2,

        rotationSpeed:
            (Math.random() - 0.5) * 0.003
    };
}


// Create initial particles

for (let i = 0; i < 80; i++) {

    particles.push(
        createParticle()
    );
}


// ----------------------------------------
// Draw one particle
// ----------------------------------------

function drawParticle(
    particle,
    radius,
    time
) {

    const wedgeAngle =
        Math.PI * 2 / symmetry;


    // Particle moves outward
    const distance =
        particle.distance * radius;


    // Slowly curve its path
    const angle =
        particle.angle +
        Math.sin(
            time * 0.8 +
            particle.distance * 10
        ) * 0.15;


    const x =
        Math.cos(angle) *
        distance;

    const y =
        Math.sin(angle) *
        distance;


    ctx.save();

    ctx.translate(x, y);

    ctx.rotate(
        particle.rotation
    );


    // --------------------------------
    // Fading trail
    // --------------------------------

    const gradient =
        ctx.createLinearGradient(
            -particle.length,
            0,
            0,
            0
        );

    gradient.addColorStop(
        0,
        `hsla(${particle.hue},100%,60%,0)`
    );

    gradient.addColorStop(
        1,
        `hsla(${particle.hue},100%,70%,0.9)`
    );


    ctx.fillStyle = gradient;


    ctx.fillRect(
        -particle.length,
        -particle.size / 2,
        particle.length,
        particle.size
    );


    // --------------------------------
    // Particle head
    // --------------------------------

    ctx.fillStyle =
        `hsl(${particle.hue},100%,75%)`;

    ctx.fillRect(
        -particle.size / 2,
        -particle.size / 2,
        particle.size,
        particle.size
    );


    ctx.restore();
}


// ----------------------------------------
// Draw
// ----------------------------------------

function draw(time) {

    const seconds =
        time * 0.001;


    // Fade previous frame slightly
    // instead of completely clearing it.
    ctx.fillStyle =
        "rgba(0, 0, 0, 0.18)";

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


    ctx.rotate(
        rotation
    );


    const radius =
        Math.max(width, height);


    const wedgeAngle =
        Math.PI * 2 / symmetry;


    // --------------------------------
    // Kaleidoscope
    // --------------------------------

    for (
        let wedge = 0;
        wedge < symmetry;
        wedge++
    ) {

        ctx.save();

        ctx.rotate(
            wedge * wedgeAngle
        );


        for (
            const particle of particles
        ) {

            drawParticle(
                particle,
                radius,
                seconds
            );


            // Mirror the wedge
            ctx.save();

            ctx.scale(
                1,
                -1
            );

            drawParticle(
                particle,
                radius,
                seconds
            );

            ctx.restore();
        }


        ctx.restore();
    }


    ctx.restore();


    // --------------------------------
    // Animate particles
    // --------------------------------

    for (
        const particle of particles
    ) {

        particle.distance +=
            particle.speed *
            16;

        particle.rotation +=
            particle.rotationSpeed;


        // Reappear at the center
        // when they leave the field.

        if (
            particle.distance > 1.1
        ) {

            particle.distance =
                -0.05;

            particle.angle =
                (Math.random() - 0.5) *
                (Math.PI / symmetry);

            particle.hue =
                Math.random() * 360;
        }
    }


    // Kaleidoscope rotation
    rotation += 0.0008;


    // Slow zoom
    zoom += 0.0003;


    requestAnimationFrame(
        draw
    );
}


requestAnimationFrame(
    draw
);