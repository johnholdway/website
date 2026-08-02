
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Default Matrix characters
let rainMode = "bauhaus";

const rainModes = {

    matrix: {
        characters:
        "アァイウエオ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&",

        fontSize: 12
    },

    pixels: {
        characters:
        "■",

        fontSize: 8
    },

    binary: {
        characters:
        "01",

        fontSize: 18
    },

    blocks: {
        characters:
        "█▓▒░",

        fontSize: 20
    },

    bauhaus: {
        characters:
        "■",

        fontSize: 30
    },

    circles: {
        characters:
        "○",

        fontSize: 25
    }

};

// User added characters
let customCharacters = "";



let fontSize = rainModes[rainMode].fontSize;

let columns = Math.floor(canvas.width / fontSize);

let drops = [];


function initializeDrops(){

    drops = [];

    for(let i = 0; i < columns; i++){
        drops[i] = Math.random() * canvas.height;
    }

}

initializeDrops();



function getCharacters(){

    return rainModes[rainMode].characters + customCharacters;

}


function drawBauhaus(x,y){

    let colors = [
        "#ff0000",
        "#ffff00",
        "#0000ff",
        "#000000"
    ];

    ctx.fillStyle =
    colors[
        Math.floor(Math.random()*colors.length)
    ];


    let size =
    Math.floor(Math.random()*30)+10;


    ctx.fillRect(
        x,
        y,
        size,
        size
    );

}

function drawCircle(x,y){

    ctx.fillStyle = "#aaaaaa";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        Math.random() * 12 + 2, //change circle size here
        0,
        Math.PI * 2
    );

    ctx.fill();

}

function drawMatrix(){
// This piece the last number affects the trail length, the smaller the number the longer the trail 0.08 is the original and 1.0 is instant erase.
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

ctx.fillStyle = "#00ff41";

ctx.font = fontSize + "px monospace";

let availableCharacters = getCharacters();


    for(let i = 0; i < drops.length; i++){

        let character =
        availableCharacters[
            Math.floor(
                Math.random() *
                availableCharacters.length
            )
        ];

        if(rainMode === "bauhaus"){

            drawBauhaus(
                i * fontSize,
                drops[i] * fontSize
            );

        }

        else if(rainMode === "circles"){

            drawCircle(
                i * fontSize,
                drops[i] * fontSize
            );

        }

        else {

            ctx.fillText(
                character,
                i * fontSize,
                drops[i] * fontSize
            );

        }




        if(
            drops[i] * fontSize > canvas.height &&
            Math.random() > 0.975
        ){
            drops[i] = 0;
        }


        drops[i]++;
    }

}

// This is the speed of the rain, the smaller the number the faster the rain. I started with 35 milliseconds.
setInterval(drawMatrix,70);


/*
// Add user characters

document
.getElementById("addCharacters")
.addEventListener("click",()=>{

    let input =
    document.getElementById("matrixInput");


    if(input.value.trim() !== ""){

        customCharacters += input.value;

        input.value = "";

    }

});

*/

// Resize handling

window.addEventListener("resize",()=>{

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    columns =
    Math.floor(canvas.width / fontSize);

    initializeDrops();

});


document
.getElementById("pixelMode")
.addEventListener("click",()=>{

    rainMode = "pixels";

    fontSize = rainModes[rainMode].fontSize;

    columns = Math.floor(canvas.width / fontSize);

    initializeDrops();

});


document
.getElementById("matrixMode")
.addEventListener("click",()=>{

    rainMode = "matrix";

    fontSize = rainModes[rainMode].fontSize;

    columns = Math.floor(canvas.width / fontSize);

    initializeDrops();

});

document
.getElementById("bauhausMode")
.addEventListener("click",()=>{

    rainMode = "bauhaus";

    fontSize = rainModes[rainMode].fontSize;

    columns = Math.floor(canvas.width / fontSize);

    initializeDrops();

});

const circleButton = document.getElementById("circleMode");

if(circleButton){

    circleButton.addEventListener("click",()=>{

        rainMode = "circles";

        fontSize = rainModes[rainMode].fontSize;

        columns = Math.floor(canvas.width / fontSize);

        initializeDrops();

        console.log("circle mode selected");

    });

}