import './brekOut.css';
import { useEffect, useRef } from 'react';

export default function BreakOutGames() {
    const canvasRef = useRef();
    let canvasWidth = 500;
    let canvasHeight = 500;
    let canvas;
    let context;
    let speed = 3;
    let gameover = false;
    let brick = []
    let score = 0;

    let platformParamters = {
        right: false,
        left: false
    }

    let brickColums = 5;
    let brickRow = 3;
    let brickpadding = 20;
    let brickLeft = 35;
    let brickTop = 30
    let brickWidth = 75;
    let brickHeight = 12;

    useEffect(() => {
        canvas = canvasRef.current;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        context = canvas.getContext("2d");
        generatePath();
        requestAnimationFrame(update);
        document.addEventListener("keydown", HandleKeyDown)
        document.addEventListener("keyup", HandleKeyup)

    }, [])


    function Random(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    function DrawBreak() {
        for (let c = 0; c < brickColums; c++) {
            for (let r = 0; r < brickRow; r++) {
                if (brick[c][r].status == 1) {
                    let brickX = c * (brickWidth + brickpadding) + brickLeft;
                    let brickY = r * (brickHeight + brickpadding) + brickTop;
                    brick[c][r].x = brickX;
                    brick[c][r].y = brickY;
                    context.fillStyle = brick[c][r].color
                    context.fillRect(brickX, brickY, brickWidth, brickHeight)
                }
            }
        }
    }

    class Parametrs {
        constructor() {
            this.brick = []
            this.brickColums = 5;
            this.brickRow = 3;
            this.brickWidth = 75;
            this.brickHeight = 12;
            this.brickLeft = 35;
            this.brickTop = 15;

            this.ball = {
                x: canvasWidth / 2 - 75,
                y: canvasHeight - 50,
                dx: speed,
                dy: -speed + 1,
                radius: 7,
                color: "rgb(" + Math.floor(Math.random() * brick.length) + ", " + Random(0, 255) + "," + Random(0, 255) + ")",
                draw: function () {
                    context.beginPath();
                    context.fillStyle = this.color;
                    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
                    context.closePath();
                    context.fill();
                }
            }
            this.paddle = {
                width: 127,
                height: 30,
                x: canvasWidth / 2,
                draw: function () {
                    context.fillStyle = "black";
                    context.fillRect(this.x, canvas.height - this.height, this.width, this.height);
                }
            }
        }
    }

    let parametrs = new Parametrs();

    function updateScore() {
        context.fillStyle = "white";
        context.font = "16px Arial"
        context.fillText("Score: " + " " + score, 8, 20)
    }

    function generatePath() {
        for (let c = 0; c < brickColums; c++) {
            brick[c] = [];

            for (let r = 0; r < brickRow; r++) {
                brick[c][r] = { x: 0, y: 0, color: "rgb(" + Random(0, 255) + ", " + Random(0, 255) + "," + Random(0, 255) + ")", status: 1 };
            }
        }
    }

    function HandleKeyDown(ev) {
        if (ev.code === 'ArrowRight') {
            platformParamters.right = true
        }
        else if (ev.code === 'ArrowLeft') {
            platformParamters.left = true
        }
    }

    function HandleKeyup() {
        platformParamters = { right: false, left: false }
    }

    function MovePaddle() {
        if (platformParamters.right) {
            parametrs.paddle.x += 4;
            if (parametrs.paddle.x + parametrs.paddle.width >= canvas.width) {
                parametrs.paddle.x = canvas.width - parametrs.paddle.width
            }
        }
        else if (platformParamters.left) {
            parametrs.paddle.x -= 4;
            if (parametrs.paddle.x <= 0) {
                parametrs.paddle.x = 0
            }
        }
    }

    function DetectionColection() {
        for (let c = 0; c < brickColums; c++) {
            for (let r = 0; r < brickRow; r++) {
                if (brick[c][r].status == 1) {
                    if (parametrs.ball.x >= brick[c][r].x
                        && parametrs.ball.x <= brick[c][r].x + brickWidth
                        && parametrs.ball.y >= brick[c][r].y
                        && parametrs.ball.y <= brick[c][r].y + brickHeight) {
                        parametrs.ball.dy *= -1;
                        brick[c][r].status = 0;
                        score++
                    }
                }
            }
        }
    }

    function update() {
        if (gameover) {
            context.font = "40px Arial";
            context.fillStyle = "white";
            context.fillText("Game Over", canvasWidth / 2 - 75, canvasHeight / 2 - 75)
            return;
        }
        requestAnimationFrame(update)
        context.clearRect(0, 0, canvas.width, canvas.height)
        parametrs.ball.draw()
        parametrs.paddle.draw();
        DetectionColection();
        DrawBreak();
        updateScore();
        MovePaddle();
        parametrs.ball.x += parametrs.ball.dx;
        parametrs.ball.y += parametrs.ball.dy;

        if (parametrs.ball.y + parametrs.ball.radius >= canvas.height) {
            gameover = true
        }

        if (parametrs.ball.x + parametrs.ball.radius >= canvas.width || parametrs.ball.x <= 0) {
            parametrs.ball.dx *= -1;
        }
        if (parametrs.ball.y <= 0) {
            parametrs.ball.dy *= -1;
        }
        if (CheckBall(parametrs.ball, parametrs.paddle)) {
            parametrs.ball.dy *= -1
            parametrs.ball.color = "rgb(" + Math.floor(Math.random() * brick.length) + ", " + Random(0, 255) + "," + Random(0, 255) + ")";
        }
    }
    function CheckBall(a, b) {
        return a.x >= b.x && a.x <= b.x + b.width && a.y + a.radius >= canvas.height - b.height
    }
    return (
        <div className="breakout-conteiner">
            <canvas ref={canvasRef} id='breakOut'>

            </canvas>
        </div>
    )
}