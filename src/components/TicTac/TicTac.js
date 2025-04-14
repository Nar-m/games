import images1 from '../images/images1.jpg'
import { useContext } from 'react'
import { GamesContext } from '../StartConteiner'
import arakda from '../images/arkada.wav'

export default function TicTac() {  
    const {OpenTicTacGames} = useContext(GamesContext)
    const PlayAudioGames = () =>{
        new Audio(arakda).play()
    }
    return (
        <div onMouseDown={PlayAudioGames} className="wrapper">
            <div className='start-btns'>
                <button onClick={OpenTicTacGames}>Start</button>
            </div>
            <div className="image">
                <img alt='games2' src={images1}/>
            </div>
        </div>
    )
}