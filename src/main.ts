import * as d3 from 'd3';

let transform: d3.ZoomTransform = d3.zoomIdentity;

const canvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
const devicePixelRatio = window.devicePixelRatio || 1;

const width = window.innerWidth;
const height = window.innerHeight;

const viewport = {
    width: width * devicePixelRatio,
    height: height * devicePixelRatio
};

canvas.style.width = width + 'px';
canvas.style.height = height + 'px';

canvas.width = viewport.width;
canvas.height = viewport.height;

ctx.scale(devicePixelRatio, devicePixelRatio);

document.body.appendChild(canvas);

const zoom: d3.ZoomBehavior<any, any> = d3.zoom()
    .scaleExtent([0, Infinity])
    .on('zoom', () => {
        transform = d3.event.transform;

        drawCircle();
    });

d3.select(canvas).call(zoom)
    .on('click', () => {
        console.log(d3.mouse(canvas));
    });

drawCircle();

function drawCircle () {
    ctx.clearRect(0, 0, viewport.width, viewport.height);
    ctx.save();

    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.k, transform.k);

    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 50, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
}
