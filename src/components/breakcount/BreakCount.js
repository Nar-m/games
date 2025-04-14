import { useContext } from 'react'
import { GamesContext } from '../StartConteiner'
import arakda from '../images/arkada.wav'

export default function BreakOut() {
    const { OpenBreakOut } = useContext(GamesContext)
    const PlayAudioGames = () => {
        new Audio(arakda).play()
    }
    return (
        <div onMouseDown={PlayAudioGames} className="wrapper">
            <div className='start-btns'>
                <button onClick={OpenBreakOut}>Start</button>
            </div>
            <div className="image">
                <img alt='games2' src='https://www.coolmathgames.com/sites/default/files/styles/blog_node_image/public/2022-11/Retro%20Game%20Atari%20Breakout%20Blog%20Thumbnail.png?itok=lmDmvPKx' />
            </div>
        </div>
    )
}