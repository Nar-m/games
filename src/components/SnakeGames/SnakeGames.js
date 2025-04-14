
import { useContext } from 'react'
import { GamesContext } from '../StartConteiner'
import arakda from '../images/arkada.wav'

export default function SnakeGames() {
    const { OpenSnakeGames } = useContext(GamesContext)
    const PlaYaudio = () => {
        new Audio(arakda).play()
    }
    return (
        <div onMouseDown={PlaYaudio} className="wrapper">
            <div className='start-btns'>
                <button onClick={OpenSnakeGames}>Start</button>
            </div>
            <div className="image">
                <img src='https://pics.craiyon.com/2023-06-12/4c3df82a217543af9635fed1cde13932.webp' />
            </div>
        </div>
    )
}