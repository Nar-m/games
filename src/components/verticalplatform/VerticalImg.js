import arakda from '../images/arkada.wav'
import { useContext } from 'react'
import { GamesContext } from '../StartConteiner'


export default function VerticalImg() {
    const { OpenVerticalGames } = useContext(GamesContext)
    const StartAudio = () => {
        new Audio(arakda).play()
    }
    return (
        <div className="wrapper" onMouseDown={StartAudio}>
            <div className='start-btns'>
                <button onClick={OpenVerticalGames}>Start</button>
            </div>
            <div className="image">
                <img alt='games1' src="https://i.pinimg.com/originals/31/8c/3a/318c3a243a0ef5c410c3fd91b7c0db51.jpg" />
            </div>
        </div>
    )
}