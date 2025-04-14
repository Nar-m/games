import './trymodal.css'
import { useContext } from 'react'
import { GamesContext } from '../StartConteiner'

export default function SnakeTryagain(props) {
    const { ExItGams } = useContext(GamesContext)
    const { setSnake, setGameover, setsCore, setFood, setStartGame, setDiretion } = props
    
    const UpdateGame = () => {
        setGameover(false)
        setsCore(0)
        setFood({
            x: Math.floor(Math.random() * 10 + 1),
            y: Math.floor(Math.random() * 10 + 1)
        })
        setSnake([{ x: 11, y: 11 }, { x: 11, y: 11 }])
        setStartGame(true)
        setDiretion('RIGHT')
    }
    return (
        <div className="try-modal">
            <div className='overlay'>
                <span className='text-center text-2xl font-bold text-gray-200'>Game Over</span>
                <div className='flex justify-center mt-2 p-2 items-center'>
                    <button onClick={() => UpdateGame()} type="button" className="btn btn-restart">Restart</button>
                    <button onClick={() => ExItGams()} type="button" className="btn btn-exit">Exit</button>
                </div>
            </div>
        </div>
    )
}