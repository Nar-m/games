import './flappy.css'
import { useRef, useEffect } from 'react'
import flapp from '../images/flapp.png'
import bootomimg from '../images/bootomjpg.jpg'


export default function FlappyGames() {
    const canvasref = useRef()
    let boardwidth = window.innerWidth;
    let boardheight = window.innerHeight;
    let context;
    let canvas;
    let flappyImg;
    let flappwidth = 52;
    let flappheight = 52
    let topPipeimg;
    let bottomimg;

    let flappPosition = {
        x: boardwidth / 8 - 30,
        y: 56,
        width: flappwidth,
        height: flappheight
    }

    let pippes = []
    let pippieswidth = 64;
    let pippesheight = 522;
    let pipeX = boardwidth
    let pipeY = 0;
    let veloticY = 0;
    let gameover = false;
    let score = 0;
    let coinsarr = [];

    useEffect(() => {
        canvas = canvasref.current;
        canvas.width = boardwidth;
        canvas.height = boardheight;
        context = canvas.getContext("2d");
        flappyImg = new Image();

        flappyImg.src = flapp;
        flappyImg.onload = () => {
            context.drawImage(flappyImg, flappPosition.x, flappPosition.y, flappPosition.width, flappPosition.height)
        }
        topPipeimg = new Image()
        topPipeimg.src = 'https://toppng.com/uploads/preview/warp-pipe-artwork-mario-green-pipe-11563256438brndjsspbc.png';
        bottomimg = new Image();
        bottomimg.src = `${bootomimg}`;
        canvas.addEventListener("click", () => {
            requestAnimationFrame(animate)
            setInterval(Inter, 1500)
            if (gameover) {
                flappPosition.y = flappPosition.y;
                score = 0;
                gameover = false;
                pippes = [];
            }
        })
        document.addEventListener("keydown", HadleKeyppress)
    }, [])

    function Inter() {
        if (gameover) {
            return;
        }
        let randomY = pipeY - pippesheight / 4 - Math.random() * (pippesheight / 2)
        let piiperobj = {
            img: topPipeimg,
            x: pipeX,
            y: randomY,
            w: pippieswidth,
            h: pippesheight
        }
        pippes.push(piiperobj)

        let botomObj = {
            img: bottomimg,
            x: pipeX,
            y: randomY + 400 + canvas.height / 2,
            w: pippieswidth,
            h: pippesheight
        }
        pippes.push(botomObj)
    }

    function animate() {
        requestAnimationFrame(animate)
        if (gameover) {
            return;
        }
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(flappyImg, flappPosition.x, flappPosition.y, flappPosition.width, flappPosition.height)
        veloticY += 0.4;
        flappPosition.y += veloticY;
        if (flappPosition.y > canvas.height || flappPosition.y <= 0) {
            gameover = true;
        }

        for (let i = 0; i < pippes.length; i++) {
            let piArr = pippes[i]
            piArr.x -= 2;
            context.drawImage(piArr.img, piArr.x, piArr.y, piArr.w, piArr.h)

            if (flappPosition.x > piArr.x + piArr.w) {
                score += 1;
            }

            if (CheckCollison(flappPosition, piArr)) {
                gameover = true;
            }
        }
        context.fillStyle = 'white';
        context.font = "45px sans-serif";
        context.fillText(score, 5, 45);

        if (gameover) {
            context.fillText("Game Over", boardwidth * 2 / 2, 90)
        }

        for (let i = 0; i < coinsarr.length; i++) {
            let coins = coinsarr[i]
            context.drawImage(coins.img, coins.x, coins.y, coins.width, coins.height)
        }
    }

    const HadleKeyppress = (event) => {
        event.preventDefault();
        if (event.code == 'Space' || event.code == 'ArrowUp') {
            veloticY = -6;
            if (gameover) {
                flappPosition.y = 56;
                score = 0;
                gameover = false;
                pippes = []
            }
        }
    }

    function CheckCollison(a, b) {
        return a.x < b.x + b.w &&
            a.x + a.width > b.x &&
            a.y < b.y + b.h &&
            a.y + a.height > b.y;
    }
    return (
        <>
            <canvas ref={canvasref} id="flappy-board">

            </canvas>
        </>
    )
}