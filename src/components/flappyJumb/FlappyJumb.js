import './flappyjump.css';
import React, { useEffect, useRef } from 'react';
import doodleimg from '../images/doodle.png'
import doodle2 from '../images/doodle2.png'
import tetriis from '../images/tetris.png'

export default function FlappyJump() {
    const canvasRef = useRef()

    let board;
    let context;
    let boardWidth = window.innerWidth;
    let boardHeight = window.innerHeight;
    let doodleX = boardWidth / 2;
    let doodleY = boardHeight / 3 - 200;
    let doodleWidth = 50;
    let doodlehieght = 50;
    let doodleRighhtImg;
    let doodleLeftImg;

    let doodllePlatforrm = {
        img: null,
        x: doodleX,
        y: doodleY,
        width: doodleWidth,
        height: doodlehieght
    }

    let platformArray = []
    let platformWidth = 85;
    let platformHeight = 85;
    let platformImg;
    let veloticyX = 0;
    let veloticyY = 0;
    let initialVeloticy = -8;
    let gravity = 0.4;
    let score = 0;
    let gameover = false;

    useEffect(() => {
        board = canvasRef.current;
        board.width = boardWidth;
        board.height = boardHeight
        context = board.getContext("2d");

        doodleRighhtImg = new Image();
        doodleRighhtImg.src = doodleimg;
        doodllePlatforrm.img = doodleRighhtImg;
        
        doodleRighhtImg.onload = () => {
            context.drawImage(doodllePlatforrm.img, doodllePlatforrm.x, doodllePlatforrm.y, doodllePlatforrm.width, doodllePlatforrm.height)
        }
        doodleLeftImg = new Image();
        doodleLeftImg.src = doodle2;
        platformImg = new Image();
        platformImg.src = tetriis;
        Platforms()
        veloticyY = initialVeloticy
        requestAnimationFrame(animate)
        document.addEventListener("keydown", HandleKeydown)
    }, [])

    const HandleKeydown = (event) => {
        event.preventDefault()
        switch (event.code) {
            case 'ArrowLeft':
                veloticyX = -4;
                doodllePlatforrm.img = doodleLeftImg;
                break;
            case 'ArrowRight':
                veloticyX = 4;
                doodllePlatforrm.img = doodleRighhtImg;
                break;
            case 'ArrowUp':
                veloticyY = -4
                break;
            case 'Space' && gameover:
                doodllePlatforrm = {
                    img: doodleRighhtImg,
                    x: doodleX,
                    y: doodleY,
                    width: doodleWidth,
                    height: doodlehieght
                }
                veloticyX = 0;
                veloticyY = initialVeloticy;
                gameover = false;
                Platforms()
        }
    }

    function Platforms() {
        platformArray = []
        let platform = {
            img: platformImg,
            x: boardWidth / 2,
            y: boardHeight - 50,
            width: platformWidth,
            height: platformHeight,
        }
        platformArray.push(platform)
        for (let i = 0; i < 30; i++) {
            let randomX = Math.floor(Math.random() * boardWidth * 3 / 4)
            let platform = {
                img: platformImg,
                x: randomX,
                y: boardHeight - 75 * i - 150,
                width: platformWidth,
                height: platformHeight,
            }
            platformArray.push(platform)
        }
    }

    function animate() {
        if (gameover) {
            return;
        }
        requestAnimationFrame(animate)
        context.clearRect(0, 0, board.width, board.height)
        doodllePlatforrm.x += veloticyX;

        if (doodllePlatforrm.x > board.width) {
            doodllePlatforrm.x = 0;
        }

        else if (doodllePlatforrm.x + doodllePlatforrm.width < 0) {
            doodllePlatforrm.x = boardWidth;
        }
        veloticyY += gravity;
        doodllePlatforrm.y += veloticyY;

        if (doodllePlatforrm.y > board.height) {
            gameover = true;
        }
        context.drawImage(doodllePlatforrm.img, doodllePlatforrm.x, doodllePlatforrm.y, doodllePlatforrm.width, doodllePlatforrm.height)

        for (let i = 0; i < platformArray.length; i++) {
            let platform = platformArray[i]
            
            if (veloticyY < 0 && doodllePlatforrm.y < board.height * 3 / 4) {
                platform.y -= initialVeloticy;
            }
            if (checkDoodle(doodllePlatforrm, platform) && veloticyY >= 0) {
                veloticyY = initialVeloticy;
                doodllePlatforrm.y = platform.y
            }
            context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height)
        }
        while (platformArray.length > 0 && platformArray[0].y >= boardHeight) {
            platformArray.shift()
            newPlatform()
        }
    }

    const newPlatform = () => {
        let randomX = Math.floor(Math.random() * boardWidth * 3 / 4)
        let platform = {
            img: platformImg,
            x: randomX,
            y: -boardHeight,
            width: platformWidth,
            height: platformHeight
        }
        platformArray.push(platform)
    }

    const checkDoodle = (a, b) => {
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
    }

    return (
        <>
            <canvas ref={canvasRef} id="flapp-jump">

            </canvas>
        </>
    )
}