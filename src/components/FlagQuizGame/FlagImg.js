import { useContext } from "react"
import { GamesContext } from "../StartConteiner"
import arakda from '../images/arkada.wav'

export default function FlagImg() {
    const { OpenFlagGames } = useContext(GamesContext)
    const PlaYaudio = () => {
        new Audio(arakda).play()
    }

    return (
        <div onMouseDown={PlaYaudio} className="wrapper" >
            <div className='start-btns'>
                <button onClick={OpenFlagGames}>Start</button>
            </div>
            <div className="image">
                <img alt='games2' src="https://cdn6.aptoide.com/imgs/7/e/7/7e79cccf3119a32061e9f43d35f21f8e_icon.png" />
                
            </div>
        </div>
    )
}