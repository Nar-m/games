
import { useContext } from 'react'
import { GamesContext } from '../StartConteiner'
import arakda from '../images/arkada.wav'

export default function NumbersGames() {
    const { OpenStringGames } = useContext(GamesContext)

    const StartAudio = () => {
        new Audio(arakda).play()
    }
    return (
        <div className="wrapper" onMouseDown={StartAudio}>
            <div className='start-btns'>
                <button onClick={OpenStringGames}>Start</button>
            </div>
            <div className="image">
                <img alt='games1' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAAm936wVdZZ49oFmIdRelFAZO8WDwQcqHcZDbFygk8c_4gmZTfBYehopNCvfGDFS0IA&usqp=CAU" />
            </div>
        </div>
    )
}