import './whack.css'
import { useState, useEffect } from 'react'
import whackaudio from '../images/whack-to-head.mp3'
import { whakeMoleGames } from './whackeMolegames'
import WhackMolecontent from './WhackMolecontent'

export default function WhackGames() {
    const [mousePage, setMousepage] = useState({ x: 0, y: 0 })
    const [active, setActive] = useState(false)
    const [startWheckGame, setStartWheckGame] = useState(false)
    const [intervalid, setintervalid] = useState()
    const [score, setScore] = useState(0)
    const [board, setBoard] = useState(whakeMoleGames)

    useEffect(() => {
        if (startWheckGame) {
            setintervalid(setTimeout(() => {
                ActiveMole()
            }, 700))
        }
        else {
            clearTimeout(intervalid)
        }
    }, [startWheckGame])

    function ActiveMole() {
        const randomIndex = Math.floor(Math.random() * board.length)
        setBoard((board) => {
            const newitems = [...board]
            newitems[randomIndex].active = true
            newitems[randomIndex].hite = false
            return newitems
        })
        setintervalid(setTimeout(() => {
            HideActiveMole(randomIndex)
        }, 700))
    }

    function HideActiveMole(index) {
        setBoard((board) => {
            const newitems = [...board]
            newitems[index].active = false
            return newitems
        })
        setintervalid(setTimeout(() => {
            ActiveMole()
        }, 700))
    }

    const HandleMole = (index) => {
        if (!startWheckGame) return;
        new Audio(whackaudio).play()
        setBoard((board) => {
            const newitems = [...board]
            setTimeout(() => {
                newitems[index].active = false
            }, 450)
            newitems[index].hite = true
            return newitems
        })
        setScore(score + 10)
        clearTimeout(intervalid)
        setintervalid(setTimeout(() => {
            ActiveMole()
        }, 700))
    }

    const OnmuseMove = (e) => {
        setMousepage({ x: e.pageX, y: e.pageY })
    }

    return (
        <WhackMolecontent
            OnmuseMove={OnmuseMove}
            setActive={setActive}
            board={board}
            HandleMole={HandleMole}
            setMousepage={setMousepage}
            score={score}
            mousePage={mousePage}
            active={active}
            setStartWheckGame={setStartWheckGame}
        />
    )
}