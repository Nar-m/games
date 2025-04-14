import { useContext } from 'react'
import { GamesContext } from '../StartConteiner'
import arakda from '../images/arkada.wav'

export default function SpaceInvedersImg() {
    const {OpenSpaceInveders} = useContext(GamesContext)
    const PlayAudioGames = () => {
        new Audio(arakda).play()
    }
    return (
        <div onMouseDown={PlayAudioGames} className="wrapper">
            <div className='start-btns'>
                <button onClick={OpenSpaceInveders}>Start</button>
            </div>
            <div className="image">
                <img alt='games2' src='https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/s/space-invaders-forever-switch/hero'/>
            </div>
        </div>
    )
}