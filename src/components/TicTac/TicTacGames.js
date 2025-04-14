import './tictac.css';
import { useState, useEffect } from 'react';
import CheckGamesCombination from './CheckGames';
import StrikeClass from './StrikeClaass';
import WonmODAL from './WonModal';
import Square from './Square';
import PlayerComputer from './PlayerComputer';

export default function TicTacGames() {
    const [ticTac, setTictac] = useState(Array(9).fill(null))
    const [strikeClass, setStriclass] = useState()
    const [x, setX] = useState(0)
    const [o, setO] = useState(0)
    const [gameover, SetGameover] = useState()
    const [restart, setrestart] = useState(false)
    const [timeMount, setTimeUpdate] = useState()

    const Reset = () => {
        setTictac(Array(9).fill(null))
        setStriclass()
        SetGameover()
        setX(0)
        setrestart(false)
        clearInterval(timeMount)
        setTimeUpdate()
        setO(0)
    }

    function HandleClick(index) {
        let PlayernTurn = ticTac.filter(item => item !== null).length % 2 === 0
        if (ticTac[index] !== null) return;
        if (PlayernTurn) {
            let newboard = [...ticTac]
            newboard[index] = "X";
            setTictac(newboard);
            setX(x + 1)
        }
    }

    const NumberCompute = () => {
        setO(o + 1)
    }
    useEffect(() => {
        CheckGamesCombination(ticTac, setStriclass, SetGameover, setrestart, timeMount, setTimeUpdate)
        setTimeUpdate(setTimeout(() => {
            PlayerComputer(ticTac, setTictac, NumberCompute)
        }, 1000))
    }, [ticTac])

    return (
        <>
            <div className="tictac-conteiner">
                <div className='tict-tac'>
                    <div className='title'>
                        <h1>Tic Tac Toe Games</h1>
                    </div>
                    <div className='flex justify-center items-center flex-col'>
                        <p>x: {x}</p>
                        <p>o: {o}</p>
                    </div>
                    <div className='tictact-board'>
                        {ticTac?.map((el, index) => {
                            return (
                                <Square
                                    key={index}
                                    x={el === "X" ? 1 : 0}
                                    o={el === "O" ? 1 : 0}
                                    onClick={() => HandleClick(index)}
                                />
                            )
                        })}
                        <StrikeClass strikeClass={strikeClass} />
                    </div>
                    <div className='reset'>
                        <button onClick={Reset}>Reset</button>
                    </div>
                </div>
            </div>
            <WonmODAL gameover={gameover} restart={restart} Reset={Reset}
            />
        </>
    )
}