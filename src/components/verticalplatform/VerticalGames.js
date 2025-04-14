
import './vertical.css'
import { useEffect, useRef } from 'react'
import bulletrright from '../images/rightBulltet.png'
import platform from '../images/platform.png'
import men from '../images/men.png'
import men2 from '../images/men2.png'
import opponnent from '../images/opponnent.png'
import bullet from '../images/bullet.mp3'
import heart from '../images/heart.png'
import boxer from '../images/boxer.wav'
import bonus from '../images/bonus.wav'

export default function VerticalGames() {
    const canvasRef = useRef();
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    let canvas;
    let context;
    const gravity = 0.5;
    let menImg;
    let heartimg;
    let bulletImg;
    let platformImg;
    let platformArray = [];
    let oppenentArray = [];
    let bulletArray = [];
    let opponnetimg;
    let columns = 2;
    let menwish = 280;
    let gameover = false;
    let deltaX = 0;
    let score = 0;
    let oppowelocity = 1

    useEffect(() => {
        canvas = canvasRef.current;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        context = canvas.getContext("2d");
        menImg = new Image();
        menImg.src = men;
        bulletImg = new Image();
        bulletImg.src = bulletrright;
        platformImg = new Image();
        platformImg.src = platform;
        opponnetimg = new Image();
        opponnetimg.src = opponnent;
        heartimg = new Image();
        heartimg.src = heart;
        
        for (let i = 0; i < 7; i++) {
            if (i % 2 === 0) {
                platformArray.push({
                    img: platformImg,
                    x: Math.floor(Math.random() * canvasWidth - i / 4),
                    y: Math.floor(Math.random() * canvasHeight - 320),
                    width: 100,
                    height: 100,
                })
            }
        }
        updateOpponent()
        requestAnimationFrame(loop)
        setInterval(updateBullet, 600)
        document.addEventListener("keydown", HandleKeydown)
        document.addEventListener("keyup", HandleKeyup)

    }, [])

    function updateBullet() {
        if (gameover) {
            return;
        }
        for (let i = 0; i < oppenentArray.length; i++) {
            setTimeout(() => {
                bulletArray.push({
                    img: bulletImg,
                    x: canvasWidth - 15 * i + 45,
                    y: canvasHeight - 100,
                    width: 12,
                    height: 12
                })
            }, 1000)
        }
    }

    class Player {
        constructor(position) {
            this.position = position;
            this.velocity = {
                x: 0,
                y: 1
            }
            this.bullet = [];
            this.height = 100;
            this.width = 100;
            this.parametr = {
                x: this.position.x,
                y: this.position.y,
                width: this.width,
                height: this.height,
            }

            this.heart = {
                x: Math.floor(Math.random() * canvasWidth * 2 / 3),
                y: Math.floor(Math.random() * canvasHeight * 2 / 3),
                width: 32,
                height: 32,
                status: false
            }
        }
        draw() {
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.drawImage(menImg, this.parametr.x, this.parametr.y, this.parametr.width, this.parametr.height)
            context.font = "50px serif";
            context.fillStyle = "white";
            context.fillText(score, canvasWidth - 150, 90)
            const checkColors = menwish <= 80 ? "yellow" : menwish <= 35 ? "red" : "green";
            context.fillStyle = checkColors;
            context.fillRect(50, 50, menwish, 20);
            this.parametr.x += this.velocity.x;

            for (let i = 0; i < this.bullet.length; i++) {
                let bullet = this.bullet[i]
                context.drawImage(bulletImg, bullet.x, bullet.y, bullet.width, bullet.height);
            }
            if (this.parametr.x + this.parametr.width >= canvas.width || this.parametr.x <= 0) {
                this.velocity.x *= -1;
            }
        }
        update() {
            this.draw()
            this.parametr.y += this.velocity.y;

            for (let i = 0; i < this.bullet.length; i++) {
                let bullet = this.bullet[i]
                bullet.x += 10;
            }
            this.bullet.filter(item => {
                if (item.x > canvas.width) {
                    return false;
                }
                return true;
            })

            if (checkDoodle(this.parametr, this.heart)) {
                new Audio(bonus).play()
                menwish = 280
                this.heart = {
                    x: Math.floor(Math.random() * canvasWidth * 2 / 3),
                    y: Math.floor(Math.random() * canvasHeight * 2 / 3),
                    width: 32,
                    height: 32,
                    status: false
                }
            }

            if (menwish <= 75) {
                this.heart.status = true
                if (this.heart.status) {
                    context.drawImage(heartimg, this.heart.x, this.heart.y, this.heart.width, this.heart.height)
                }
            }

            for (let i = 0; i < oppenentArray.length; i++) {
                let oppo = oppenentArray[i]
                oppo.x -= oppowelocity;

                if (oppo.x <= 0) {
                    oppowelocity *= -1;
                }
            }

            for (let i = 0; i < bulletArray.length; i++) {
                let bullet = bulletArray[i]
                bullet.x -= 10;
            }

            if (this.parametr.y + this.parametr.height + this.velocity.y <= canvas.height) {
                this.velocity.y += gravity;
            }
            else {
                this.velocity.y = 0;
            }
        }
    }

    const player2 = new Player({
        x: 0,
        y: 805
    })

    function HandleKeydown(event) {
        event.preventDefault()
        switch (event.code) {
            case 'ArrowRight':
                menImg.src = men
                player2.velocity.x = 3;
                break;
            case 'ArrowLeft':
                menImg.src = men2;
                player2.velocity.x = -3;
                break;
            case 'ArrowUp':
                player2.velocity.y = -13;
                break;
            case 'Space':
                new Audio(bullet).play()
                player2.bullet.push({
                    x: player2.parametr.x + player2.parametr.width - 10,
                    y: player2.parametr.y + 10,
                    width: 12,
                    height: 12
                })
                break;
        }
    }

    function updateOpponent() {
        for (let i = 0; i < columns; i++) {
            deltaX = canvasWidth - 105 + 42 * i + 32
            oppenentArray.push({
                img: opponnetimg,
                x: deltaX,
                y: canvasHeight - 100,
                width: 100,
                height: 100
            })
        }
    }

    function HandleKeyup(event) {
        event.preventDefault();
        player2.velocity.x = 0;
    }

    function loop() {
        if (gameover) {
            return;
        }
        requestAnimationFrame(loop)
        player2.update()
        for (let i = 0; i < platformArray.length; i++) {
            if (checkDoodle(player2.parametr, platformArray[i])) {
                player2.parametr.y = platformArray[i].y - platformArray[i].height
                player2.velocity.y = 0
            }
            context.drawImage(platformArray[i].img, platformArray[i].x, platformArray[i].y, platformArray[i].width, platformArray[i].height)
        }

        for (let i = 0; i < player2.bullet.length; i++) {
            let bull = player2.bullet[i]
            for (let i = 0; i < platformArray.length; i++) {
                let platform = platformArray[i]
                if (checkDoodle(bull, platform)) {
                    bull.delete = true
                }
            }
        }

        for (let i = 0; i < player2.bullet.length; i++) {
            let bullet = player2.bullet[i]
            for (let i = 0; i < oppenentArray.length; i++) {
                let oppo = oppenentArray[i]
                if (checkDoodle(bullet, oppo)) {
                    score++
                    bullet.delete = true;
                    oppo.delete = true;
                }
            }
        }

        for (let i = 0; i < oppenentArray.length; i++) {
            let oppo = oppenentArray[i]
            context.drawImage(oppo.img, oppo.x, oppo.y, oppo.width, oppo.height)
        }

        for (let i = 0; i < bulletArray.length; i++) {
            let bullet = bulletArray[i]
            context.drawImage(bullet.img, bullet.x, bullet.y, bullet.width, bullet.height)
        }

        for (let i = 0; i < bulletArray.length; i++) {
            let bullet = bulletArray[i]
            for (let i = 0; i < platformArray.length; i++) {
                if (checkDoodle(bullet, platformArray[i])) {
                    bullet.delete = true
                }
            }
        }


        for (let i = 0; i < bulletArray.length; i++) {
            let bullet = bulletArray[i]
            if (checkDoodle(player2.parametr, bullet)) {
                new Audio(boxer).play()
                if (bulletArray.length === 1) {
                    menwish -= 0.3
                }
                else if (menwish.length === 2) {
                    menwish -= 0.4
                }
                else if (menwish.length === 3) {
                    menwish -= 0.5
                }
                else if (bulletArray.length === 4) {
                    menwish -= 0.6
                }
                else {
                    menwish -= 1
                }
                bullet.delete = true
            }
        }

        if (menwish <= 0) {
            menwish = 0
            gameover = true
        }

        if (oppenentArray.length === 0) {
            columns = Math.min(columns + 1, 5000)
            bulletArray = []
            updateOpponent()
            setTimeout(() => {
                updateBullet()
            }, 3200)
        }
        bulletArray = bulletArray.filter(item => item.delete !== true)
        oppenentArray = oppenentArray.filter(item => item.delete !== true)
        player2.bullet = player2.bullet.filter(item => item.delete !== true)
    }

    const checkDoodle = (a, b) => {
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
    }

    return (
        <div className="vertical-conteiner">
            <canvas ref={canvasRef} id='vertical'>

            </canvas>
        </div>
    )
}