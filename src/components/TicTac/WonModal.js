import { useContext } from "react"
import { GamesContext } from "../StartConteiner"

export default function WonmODAL({ restart, gameover, Reset }) {
    const {ExItGams} = useContext(GamesContext)
    return (
        <div className={`${restart ? 'won-modal active' : 'won-modal'}`}>
            <div className={`${restart ? 'won-content active' : 'won-content'}`}>
                <div className="text-center text-2xl font-bold mb-3">
                    <h1 style={{ color: 'black' }}>we congratulate։ <span style={{ color: 'green' }}>{gameover}</span></h1>
                </div>
                <div className="flex justify-center items-center p-2 mt-3">
                    <button onClick={Reset} style={{background: 'orange'}}>Restart</button>
                    <button onClick={ExItGams} style={{background: 'red'}}>Exit</button>
                </div>
            </div>
        </div>
    )
}