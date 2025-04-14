import { useState, useEffect, useContext } from "react"
import { GamesContext } from "../StartConteiner"

export default function EffectModal({ score, length, TryAgain }) {
    const [evalute, setevelute] = useState('')
    const { ExItGams } = useContext(GamesContext)
    useEffect(() => {
        if (score === 1) {
            setevelute('Not so good')
        }
        else if (score >= 2 && score < 5) {
            setevelute('is normal')
        }
        else if (score >= 5 && score < 7) {
            setevelute('It `s good')
        }
        else if (score > 7) {
            setevelute('It `s excellent')
        }
    }, [score])

    return (
        <div className="effect-modal">
            <div className="effect-content">
                <h1>The Result Obtained</h1>
                <span><span className="evalute">{evalute}</span>   {score} / {length}</span>
                <div className="mt-2">
                    <button onClick={() => {
                        setevelute('')
                        TryAgain()
                    }} style={{ background: 'green' }}>Try Agayn</button>
                    <button onClick={ExItGams} style={{ background: 'red' }}>Exit</button>
                </div>
            </div>
        </div>
    )
}