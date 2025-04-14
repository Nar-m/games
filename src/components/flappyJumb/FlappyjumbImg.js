import { useContext } from 'react'
import arakda from '../images/arkada.wav'
import { GamesContext } from '../StartConteiner'

export default function FLappyJumpimg() {
    const { OpenFlappyJumb } = useContext(GamesContext)
    const PlaYaudio = () => {
        new Audio(arakda).play()
    }
    return (
        <div onMouseDown={PlaYaudio} className="wrapper" >
            <div className='start-btns'>
                <button onClick={OpenFlappyJumb}>Start</button>
            </div>
            <div className="image">
                <img alt='games2' src="https://s.cafebazaar.ir/images/icons/com.crazygamer.extremeflappyjump-ab0d792c-911d-47c7-ad73-b0daab2e0a2b_512x512.png?x-img=v1/resize,h_256,w_256,lossless_false/optimize" />
            </div>
        </div>
    )
}