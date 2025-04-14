import { useState, useEffect } from "react"
import { array } from "./flag"
import EffectModal from "./Effectmodal"

export default function FlagGamescontrols() {
    const [curentIndex, setcurentindex] = useState(0)
    const [score, setscore] = useState(0)
    const [results, setresults] = useState({ text: '', color: '' })
    const [ansver, setansver] = useState('')
    const [effect, setEffect] = useState(false)
    
    const TryAgain = () => {
        setcurentindex(0)
        setscore(0)
        setresults({ text: '', color: '' })
        setansver('')
        setEffect(false)
    }

    const CheckTestFlag = (text) => {
        let wrongansver = array[curentIndex].ansver
        if (text === wrongansver) {
            setresults({ text: '!Coorect', color: 'yellow' })
            setscore((score) => score + 1)
        }
        else {
            setresults({ text: `!Wrong coorect`, color: 'red' })
            setansver(wrongansver)
        }
        setTimeout(() => {
            setcurentindex(curentIndex + 1)
            setresults({ text: '', color: '' })
            setansver('')
        }, 2000)
    }

    const HandleNextFlag = () => setcurentindex(curentIndex + 1)
    const HandlePrevFlag = () => setcurentindex(curentIndex - 1)


    useEffect(() => {
        if (curentIndex >= array.length) {
            setEffect(true)
        }
    }, [curentIndex])

    return (
        <>
            <div className="flag-content">
                <div className="flag-items">
                    <img src={curentIndex < array.length ? array[curentIndex].img : array[0].img} />
                    <span style={{ color: results.color }} className="results">{results.text} <span style={{ color: 'white' }}>{ansver}</span></span>
                    <div className="flex flex-col items-center">
                        {curentIndex < array.length ? array[curentIndex].wrongansver.map((item, index) => {
                            return <div onClick={() => CheckTestFlag(item)} className="wraong-item" key={index}>{item}</div>
                        }) : array[0].wrongansver.map((item, index) => <div key={index} className="wraong-item">{item.name}</div>)}
                    </div>
                </div>
                <div className="score">Score: {score} / {array.length}</div>
                <div className="indexlength">{curentIndex + 1} / {array.length}</div>
                <div className="flex justify-between items-center w-full">
                    <button style={{ visibility: `${curentIndex === 0 ? 'hidden' : 'visible'}` }}
                        disabled={curentIndex === 0 ? true : false} onClick={HandlePrevFlag}>Previus</button>
                    <button style={{ visibility: `${curentIndex === array.length - 1 ? 'hidden' : 'visible'}` }}
                        disabled={curentIndex === array.length ? true : false} onClick={HandleNextFlag}>Next</button>
                </div>
            </div>
            {effect ? <EffectModal
                TryAgain={TryAgain}
                score={score}
                length={array.length} /> : ''}
        </>
    )
}