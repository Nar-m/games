import arakda from '../images/arkada.wav'
import { useContext } from 'react'
import { GamesContext } from '../StartConteiner'

export default function StartWhack() {
    const { OpenWhackGames } = useContext(GamesContext)
    const StartAudio = () => {
        new Audio(arakda).play()
    }
    return (
        <div className="wrapper" onMouseDown={StartAudio}>
            <div className='start-btns'>
                <button onClick={OpenWhackGames}>Start</button>
            </div>
            <div className="image">
                <img alt='games1' src="https://imgs2.dab3games.com/whack-a-mole-champ-6943.png" />
            </div>
        </div>
    )
}