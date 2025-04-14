import { useContext } from 'react'
import arakda from '../images/arkada.wav'
import { GamesContext } from '../StartConteiner'

export default function Flappimg() {
    const { OpenFlappGames } = useContext(GamesContext)
    const PlaYaudio = () => {
        new Audio(arakda).play()
    }
    return (
        <div onMouseDown={PlaYaudio} className="wrapper" >
            <div className='start-btns'>
                <button onClick={OpenFlappGames}>Start</button>
            </div>
            <div className="image">
                <img alt='games2' src="https://cdn.wccftech.com/wp-content/uploads/2021/04/Flappy-Bird-in-macOS-Big-Sur-Notifications.jpg" />
            </div>
        </div>
    )
}