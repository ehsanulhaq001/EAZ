window.onload = function() {
    start();
};

function start() {
    setup();
    requestAnimationFrame(draw);
}
let cnv;
let rez = 20;
let rows;
let cols;
let noise;
let block = new Array();
let t = 0;
let spread = 0.01;
let color = 1;
let sign;
let rand;

function setup() {
    cnv = document.querySelector("#canvas");
    cnv.height = window.innerHeight;
    cnv.width = window.innerWidth;
    rows = Math.floor(cnv.height / rez);
    cols = Math.floor(cnv.width / rez);
    cnv.style.backgroundColor = "rgb(0, 0, 0)";
    ctx = cnv.getContext("2d");

    noise = new OpenSimplexNoise(Date.now());

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            block[i * cols + j] = new Block(i, j);
        }
    }

    change();
}

function draw() {
    let a = 0;
    for (let i = 0; i < rows; i++) {
        a += spread;
        let b = 0;
        for (let j = 0; j < cols; j++) {
            b += spread;
            if (rand === 0) {
                block[i * cols + j].value = noise.noise3D(a, b, t);
            }
            if (rand === 1) {
                block[i * cols + j].value = Math.random();
            }
            block[i * cols + j].show();
        }
    }
    t += 0.01;
    clear();
    requestAnimationFrame(draw);
}

function clear() {

    let x = (cnv.width - 1100) / 2;
    let y = (cnv.height - 500) / 2;
    ctx.fillStyle = "black"
    ctx.beginPath();
    // E
    ctx.rect(x, y, 100, 500);
    ctx.rect(x, y, 300, 100);
    ctx.rect(x, 200 + y, 300, 100);
    ctx.rect(x, 400 + y, 300, 100);
    // A
    ctx.rect(400 + x, y, 100, 500);
    ctx.rect(400 + x, y, 300, 100);
    ctx.rect(400 + x, 200 + y, 300, 100);
    ctx.rect(600 + x, y, 100, 500);

    // Z
    ctx.rect(800 + x, y, 300, 100);

    ctx.moveTo(1000 + x, 100 + y);
    ctx.lineTo(800 + x, 400 + y);
    ctx.lineTo(900 + x, 400 + y);
    ctx.lineTo(1100 + x, 100 + y);

    ctx.rect(800 + x, 400 + y, 300, 100);

    ctx.fill();
}

function Block(i, j) {
    this.x = rez * j;
    this.y = rez * i;
    this.value;

    this.show = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, rez, rez);

        if (sign > 0) {
            ctx.fillStyle = "rgba(" + 0 + "," + this.value * 255 + "," + 0 + ")";
        } else if (sign < 0) {
            if (j % 3 == 0) {
                this.color = "rgb(" + this.value * 255 + ", 0, 0)";
            } else if (j % 3 == 1) {
                this.color = "rgb(0, " + this.value * 255 + ", 0)";
            } else if (j % 3 == 2) {
                this.color = "rgb(0, 0, " + this.value * 255 + ")";
            }
            ctx.fillStyle = this.color;
        }
        ctx.fill();
    }
}

function change() {
    switch (color) {
        case 1:
            sign = 1;
            rand = 0;
            break;

        case 2:
            sign = -1;
            rand = 0;
            break;

        case 3:
            sign = 1;
            rand = 1;
            break;

        case 4:
            sign = -1;
            rand = 1;
            break;

        default:
            break;
    }
    color++;
    if (color > 4) {
        color = 1;
    }
}