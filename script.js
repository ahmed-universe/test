/**
 * @type {HTMLCanvasElement} canvas
 */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

class Render{
    /**
     * @param {CanvasRenderingContext2D} context
     */
    constructor(context) {
        this.context = context;
    }
    clear(color){
        this.context.canvas.width = this.context.canvas.width;
        this.context.canvas.height = this.context.canvas.height;
        if(color){
            this.rect(
                0,
                0,
                this.context.canvas.width,
                this.context.canvas.height
            ).fill(color);
        }
        return this;
    }
    rect(x, y, w, h){
        this.context.rect(x, y, w, h);
        return this;
    }
    m(x,y){
        this.context.moveTo(x,y);
        return this;
    }
    l(x,y){
        this.context.lineTo(x,y);
        return this;
    }
    a(x, y, radius, startAngle, endAngle, anticlockwise = false){
        this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        return this;
    }
    c(cp1x, cp1y, cp2x, cp2y, x, y){
        this.context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        return this;
    }
    q(cpx, cpy, x, y){
        this.context.quadraticCurveTo(cpx, cpy, x, y);
        return this;
    }
    begin(){
        this.context.beginPath();
        return this;
    }
    close(){
        this.context.closePath();
        return this;
    }
    /**
     * @param {CanvasGradient | string} style
     */
    fill(style){
        this.context.fillStyle = style;
        this.context.fill();
        return this;
    }
    /**
     * @param {CanvasGradient | string} style
     */
    stroke(style){
        this.context.strokeStyle = style;
        this.context.stroke();
        return this;
    }
    shadow(color , blur){
        this.context.shadowColor = color;
        this.context.shadowBlur = blur;
        return this;
    }
    reset(){
        this.context.shadowColor = '';
        this.context.shadowBlur = 0;
        return this;
    }
}

class Color{
    constructor(red = 0, green = 0, blue = 0) {
        this.r = red;
        this.g = green;
        this.b = blue;
        this.key = null;
        this.pending = false;
    }
    
    value(){ return `rgb(${this.r},${this.g},${this.b})`; }
    
    change(red, green, blue, transition = 100){
        if(!this.pending){
            this.pending = true;
            var dr = red - this.r;
            var dg = green - this.g;
            var db = blue - this.b;
            var count = 0;
            var target = this;
            function loop(){
                target.key = requestAnimationFrame(loop);
                count++;
                target.r += dr / transition;
                target.g += dg / transition;
                target.b += db / transition;
                console.log(target.key);
                if(count >= transition){
                    cancelAnimationFrame(target.key);
                    target.r = red;
                    target.g = green;
                    target.b = blue;
                    target.pending = false;
                }
            }
            loop();
        }
    }
}

const rnd = new Render(ctx);

const balls = [];

const clr0 = new Color(...randColor());
const clr1 = new Color(...randColor());
const clr2 = new Color(...randColor());

function runtime(){
    requestAnimationFrame(runtime);
    rnd.clear('#fff');
    
    clr1.change(...randColor(), 300);
    clr2.change(...randColor(), 300);
    
    var grd = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
    grd.addColorStop(0, clr1.value());
    grd.addColorStop(1, clr2.value());
    
    //rnd.begin().rect(0, 0, window.innerWidth, window.innerHeight).fill(grd).close();
    rnd.begin().a(400, 600, 100, 0, Math.PI * 2).fill(clr0.value()).close();
}
runtime();

function randColor() {
    var r = (Math.random() * 255).toFixed(0),
        g = (Math.random() * 255).toFixed(0),
        b = (Math.random() * 255).toFixed(0);
    return [r * 1, g * 1, b * 1];
}

function getTouchById(id){
    return touches.filter(th => th.id == id)[0] || false;
}

canvas.addEventListener('touchstart' , (evt) => {
    clr0.change(...randColor(), 20);
});

canvas.addEventListener('touchmove' , (evt) => {
    
});

canvas.addEventListener('touchend' , (evt) => {
    
});