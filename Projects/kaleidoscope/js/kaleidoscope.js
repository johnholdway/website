// ----------------------------------------
// Audio
// ----------------------------------------

let audioContext;
let analyser;
let microphone;
let audioData;

const micButton =
    document.getElementById("micButton");

const audioLevels =
    document.getElementById("audioLevels");

const bassMeter =
    document.getElementById("bassMeter");

const midMeter =
    document.getElementById("midMeter");

const trebleMeter =
    document.getElementById("trebleMeter");


micButton.addEventListener(
    "click",
    enableMicrophone
);


async function enableMicrophone() {

    try {

        const stream =
            await navigator.mediaDevices
                .getUserMedia({
                    audio: true
                });


        audioContext =
            new AudioContext();


        microphone =
            audioContext.createMediaStreamSource(
                stream
            );


        analyser =
            audioContext.createAnalyser();


        analyser.fftSize = 1024;

        analyser.smoothingTimeConstant =
            0.8;


        audioData =
            new Uint8Array(
                analyser.frequencyBinCount
            );


        microphone.connect(
            analyser
        );


        micButton.textContent =
            "♫ Microphone Active";

        audioLevels.style.display =
            "block";


        analyzeAudio();


    } catch (error) {

        console.error(
            "Microphone access failed:",
            error
        );

        micButton.textContent =
            "Microphone unavailable";
    }
}

function getFrequencyRange(
    startFrequency,
    endFrequency
) {

    const nyquist =
        audioContext.sampleRate / 2;

    const start =
        Math.floor(
            startFrequency /
            nyquist *
            audioData.length
        );

    const end =
        Math.floor(
            endFrequency /
            nyquist *
            audioData.length
        );


    let total = 0;
    let count = 0;


    for (
        let i = start;
        i <= end;
        i++
    ) {

        total += audioData[i];
        count++;
    }


    return count
        ? total / count / 255
        : 0;
}


function analyzeAudio() {

    analyser.getByteFrequencyData(
        audioData
    );


    // Approximate frequency bands

    const bass =
        getFrequencyRange(
            20,
            180
        );

    const mid =
        getFrequencyRange(
            180,
            2000
        );

    const treble =
        getFrequencyRange(
            2000,
            10000
        );


    bassLevel = bass;
    midLevel = mid;
    trebleLevel = treble;


// Smooth the responses

smoothBass +=
    (bassLevel - smoothBass) * 0.08;

smoothMid +=
    (midLevel - smoothMid) * 0.08;

smoothTreble +=
    (trebleLevel - smoothTreble) * 0.12;

    // Display them

    bassMeter.style.width =
        `${bass * 100}%`;

    midMeter.style.width =
        `${mid * 100}%`;

    trebleMeter.style.width =
        `${treble * 100}%`;


    requestAnimationFrame(
        analyzeAudio
    );
}

const canvas = document.getElementById("visual");
const ctx = canvas.getContext("2d");

let bassLevel = 0;
let midLevel = 0;
let trebleLevel = 0;

let smoothBass = 0;
let smoothMid = 0;
let smoothTreble = 0;

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

        // adjust size with 2 + Math.random() * 3 as starting point, can be adjusted to experiment
        size:
            -0.5 + Math.random() * 2,

        audioSensitivity:
            1 + Math.random() * 5,

        length:
            20 + Math.random() * 120,

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
    const headSize =
    particle.size *
    (
        1 +
        smoothTreble *
        particle.audioSensitivity *
        3
    );

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
        headSize
    );


    // --------------------------------
    // Particle head
    // --------------------------------

    ctx.fillStyle =
        `hsl(${particle.hue},100%,75%)`;

    ctx.fillRect(
        -headSize/ 2,
        -headSize / 2,
        headSize,
        headSize
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
    // Animate particles - adjust bassBoost 3 as starting point, can be adjusted to experiment
    // --------------------------------

    for (
        const particle of particles
    ) {
        const bassBoost =
            2 + bassLevel * 0.3;

        particle.distance +=
            particle.speed *
            16 *
            bassBoost;

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


    // Kaleidoscope rotation adjust the smoothMid value 0.01 as base 
    
const midRotation =
    0.0008 +
    smoothMid * 0.001;

rotation +=
    midRotation;


    // Slow zoom
    zoom += 0.0003;


    requestAnimationFrame(
        draw
    );
}


requestAnimationFrame(
    draw
);