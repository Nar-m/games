import './flag.css'
import { useState, useContext } from 'react'
import FlagGamescontrols from './FlagGamesContext.'
import { GamesContext } from '../StartConteiner'

export default function FlagQuizGame() {
    const [startcontrls, setstartcontrols] = useState(true)
    const { ExItGams } = useContext(GamesContext)
    return (
        <div className="flag-conteiner">
            <div>
                {startcontrls ? <div className="startflag">
                    <button onClick={() => setstartcontrols(false)} className="flagstart">Start</button>
                    <button onClick={ExItGams} className="flagExit">Exit</button>
                </div> : <div>
                    <FlagGamescontrols startcontrls={startcontrls}/>
                </div>}
            </div>
        </div>
    )
}