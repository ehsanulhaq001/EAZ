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