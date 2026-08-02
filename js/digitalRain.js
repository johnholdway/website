
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Default Matrix characters
let rainMode = "pixels";

const rainModes = {

    matrix:
    "アァイウエオ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&",

    pixels:
    "■",

    binary:
    "01",

    blocks:
    "█▓▒░",

    bauhaus:
    "■",

    circles:
    "○"

};


// User added characters
let customCharacters = "";



const fontSize = 18;

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

    return rainModes[rainMode] + customCharacters;

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
        5,
        0,
        Math.PI * 2
    );

    ctx.fill();

}

function drawMatrix(){

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


setInterval(drawMatrix,35);


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

});


document
.getElementById("matrixMode")
.addEventListener("click",()=>{

    rainMode = "matrix";

});

document
.getElementById("bauhausMode")
.addEventListener("click",()=>{

    rainMode = "bauhaus";

});

const circleButton = document.getElementById("circleMode");

if(circleButton){

    circleButton.addEventListener("click",()=>{

        rainMode = "circles";
        console.log("circle mode selected");

    });

}