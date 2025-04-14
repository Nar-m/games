import './space.css';
import { useState, useRef, useEffect, useContext } from 'react';
import spaceShip from '../images/spaceship.png'
import space from '../images/space.png'
import invaders from '../audio/invaders.mp3'
import { GamesContext } from '../StartConteiner';

export default function SpaceInveders() {
    const canvasRef = useRef()
    const { ExItGams } = useContext(GamesContext)
    const [startSpace, setStartSpace] = useState(false)
    let tellsize = 32;
    let rowsize = 16;
    let canvas;
    let columnsize = 16;
    let boardWidth = 512;
    let boardHeight = 512;
    let context;
    let shipWidth = tellsize * 2; //64px width//
    let shipImg;
    let veloticyX = tellsize; //32//

    let parametrs = {
        x: tellsize * columnsize / 2, //8x//
        y: tellsize * rowsize - tellsize * 2,  //368y///
        w: tellsize * 2, //64px width/
        h: tellsize //32height// 
    }

    let alienArray = []
    let alienX = tellsize; //32//
    let alienY = tellsize; //32//
    let alienimg;
    let alienVeloticy = 1;
    let bulletarray = []
    let alienCount = 0
    let alientcolumn = 3
    let aliennrows = 2
    let gameover = false;

    useEffect(() => {
        canvas = canvasRef.current
        canvas.width = boardWidth
        canvas.height = boardHeight
        context = canvas.getContext("2d")
        shipImg = new Image()
        shipImg.src = spaceShip
        shipImg.onload = function () {
            context.drawImage(shipImg, parametrs.x, parametrs.y, parametrs.w, parametrs.h)
        }
        alienimg = new Image()
        alienimg.src = space
        UpdateAlien()
        if (startSpace) {
            requestAnimationFrame(update)
        }
        else {
            cancelAnimationFrame(update)
        }
        document.addEventListener('keydown', MoveShip)
        document.addEventListener("keyup", Shoot)

    }, [startSpace])

    function update() {
        if (gameover) {
            return;
        }
        requestAnimationFrame(update)
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(shipImg, parametrs.x, parametrs.y, parametrs.w, parametrs.h)

        for (let i = 0; i < alienArray.length; i++) {
            let alien = alienArray[i]
            if (alien.alive) {
                alien.x += alienVeloticy;
                if (alien.x + alien.width >= canvas.width || alien.x <= 0) {
                    alienVeloticy *= -1;
                    for (let j = 0; j < alienArray.length; j++) {
                        alienArray[j].y += 32;
                    }
                }
                context.drawImage(alienimg, alien.x, alien.y, alien.width, alien.height)
                if (alien.y >= parametrs.y) {
                    gameover = true;
                }
            }
        }

        for (let i = 0; i < bulletarray.length; i++) {
            let bullet = bulletarray[i];
            bullet.y -= 10;
            context.fillStyle = 'white';
            context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)

            for (let i = 0; i < alienArray.length; i++) {
                let alien = alienArray[i]
                if (!bullet.used && alien.alive && DetectCollection(bullet, alien)) {
                    bullet.used = true;
                    alien.alive = false;
                    alienCount--
                    bullet.deletMe = true
                }
            }
        }
        bulletarray = bulletarray.filter(item => item.deletMe !== true)
        if (alienCount === 0) {
            let minColmcount = Math.min(alientcolumn + 1, 16 / 2 - 2)
            let minRowscount = Math.min(aliennrows + 1, 16 - 2)
            alientcolumn = minColmcount
            aliennrows = minRowscount
            alienX += 0.2
            alienArray = []
            bulletarray = []
            UpdateAlien()
            gameover = false;
        }
        bulletarray = bulletarray.filter(item => item.y < canvas.height)
    }
    function UpdateAlien() {
        for (let i = 0; i < alientcolumn; i++) {
            for (let j = 0; j < aliennrows; j++) {
                alienArray.push({
                    img: alienimg,
                    x: alienX + i * 64,
                    y: alienY + j * 32,
                    width: 64,
                    height: 32,
                    alive: true,
                })
            }
        }
        alienCount = alienArray.length
    }

    function MoveShip(event) {
        switch (event.code) {
            case 'ArrowLeft':
                if (parametrs.x - veloticyX >= 0) {
                    parametrs.x -= veloticyX;
                }
                break;
            case 'ArrowRight':
                if (parametrs.x + veloticyX + parametrs.w <= canvas.width) {
                    parametrs.x += veloticyX;
                }
                break;
        }
    }

    function Shoot(e) {
        if (e.code == 'Space') {
            new Audio(invaders).play()
            bulletarray.push({
                x: parametrs.x + shipWidth * 15 / 32,
                y: parametrs.y,
                width: 4,
                height: 16,
                used: false
            })
            if (gameover) {
                alientcolumn = 3
                aliennrows = 2
                alienX += 0.2
                alienArray = []
                bulletarray = []
                gameover = false
                UpdateAlien()
            }
        }
    }

    function DetectCollection(a, b) {
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
    }
    return (
        <div className="space-inveders">
            <div>
                <h1>Space Inveders</h1>
                <button onClick={() => setStartSpace(true)}>Start</button>
                <button onClick={ExItGams}>Exit</button>
                <canvas id='canvas' ref={canvasRef}></canvas>
            </div>
        </div>
    )
}