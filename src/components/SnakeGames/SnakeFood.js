import './snake.css';
import { useState, useEffect } from 'react';
import ChangePostionFood from './ChangePositionFood';
import HandleKeyPress from './HandleKeyPress';
import GameOver from './GameOver';
import PositionsFood from './PositionFood';
import HandleBodyCelision from './HandleBodyCelison';
import SnakeTryagain from './SnakeTryAgayn';

export default function SnakeFood() {
    const [gameover, setGameover] = useState(false)
    const [snake, setSnake] = useState([{ x: 11, y: 11 }, { x: 11, y: 11 }])
    const [score, setsCore] = useState(0)
    const [startGame, setStartGame] = useState(false)
    const [food, setFood] = useState(ChangePostionFood())
    const [diretion, setDiretion] = useState('RIGHT')

    useEffect(() => {
        var interval;
        if (startGame) {
            interval = setInterval(MoveSnake, 118)
            return () => clearInterval(interval)
        }
        else {
            clearInterval(interval)
        }
    }, [snake, startGame])


    function MoveSnake() {
        setSnake((snake) => {
            const newsnake = [...snake]
            const newtiles = { x: newsnake[0].x, y: newsnake[0].y }
            for (let i = newsnake.length - 1; i > 0; i--) {
                newsnake[i].x = newsnake[i - 1].x
                newsnake[i].y = newsnake[i - 1].y
            }
            switch (diretion) {
                case 'UP':
                    newtiles.y -= 1
                    break;
                case 'LEFT':
                    newtiles.x -= 1;
                    break;
                case 'RIGHT':
                    newtiles.x += 1;
                    break;
                case 'DOWN':
                    newtiles.y += 1;
                    break;
                default:
                    break;
            }
            newsnake[0] = newtiles;
            PositionsFood(newsnake, setsCore, setFood, food, score)
            GameOver(newtiles, setGameover, setStartGame)
            HandleBodyCelision(newsnake, setGameover, setStartGame)
            return newsnake;
        })
    }
    document.addEventListener("keydown", (event) => {
        if (startGame) {
            HandleKeyPress(event, setDiretion)
        }
    })
    return (
        <>
            <div className="snake-conteiner">
                <div style={{
                    borderBottomLeftRadius: '5px',
                    borderBottomRightRadius: '5px',
                }} className='flex fixed top-0 left-[50%]  bg-white justify-center items-center'>
                    <div className='start'>
                        <button onClick={() => setStartGame(true)} style={{ background: 'green' }}>Start</button>
                    </div>
                    <div className='stop'>
                        <button onClick={() => setStartGame(false)} style={{ background: 'orangered' }}>Stop</button>
                    </div>
                </div>
                <div className='snake-body'>
                    <div style={{ padding: '20px 27px' }} className='flex justify-between text-[#B8C6DC] text-[1.2rem] font-500 items-center'>
                        <div>
                            <span>Score: {score}</span>
                        </div>
                        <div>
                            <span>Hight Score: {score * 10}</span>
                        </div>
                    </div>
                    <div className='board'>
                        <div className='fodd' style={{
                            gridRowStart: food.y,
                            gridColumnStart: food.x,
                            background: 'red',
                            borderRadius: '2px'
                        }}>
                        </div>
                        {snake.map((item, index) => {
                            return <div className='head' style={{
                                background: 'green',
                                gridRowStart: item.y,
                                gridColumnStart: item.x
                            }} key={index}></div>
                        })}
                    </div>
                </div>
            </div>
            {gameover ? <SnakeTryagain
                setSnake={setSnake}
                setGameover={setGameover}
                setsCore={setsCore}
                setFood={setFood}
                setStartGame={setStartGame}
                setDiretion={setDiretion}
            /> : ''}
        </>
    )
}