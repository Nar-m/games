import { useState, useContext, useEffect } from "react"
import { GamesContext } from "../StartConteiner"
import Modalmessage from "./ModalMessage"

export default function StringGames() {
    const { randomHinit, randomworld, StringGames, setRandomWord, setrandomhinit } = useContext(GamesContext)
    let btns = []

    for (let i = 65; i < 91; i++) {
        btns.push(String.fromCharCode(i))
    }
    const [buttons] = useState(btns)
    const [message, setmeassage] = useState("")
    const [color, setcolor] = useState('#008000')
    const [chanses, setChanses] = useState(7)
    const [active, setactive] = useState(false)
    const [activeindex, setactiveindex] = useState(null)
    const [letter, setletter] = useState(randomworld.toUpperCase().split(""))
    const [count, setCount] = useState(0)
    const [results, setresults] = useState({ message: false, over: '' })
    const [charIndex, setCharindex] = useState(0)
    const word = Object.keys(StringGames)

    const StartAgain = () => {
        let data = word[Math.floor(Math.random() * word.length)]
        setRandomWord(data)
        setrandomhinit(StringGames[data])
        let InputSpace = document.getElementsByClassName('InputSpace')
        setmeassage("")
        setcolor('#008000')
        setChanses(7)
        setactive(false)
        setactiveindex(null)
        setCount(0)
        setresults({ message: false, over: '' })
        letter.forEach((item, index) => {
            InputSpace[index].innerHTML = "_"
        })
    }

    const DeleteCharakters = (ind) => {
        setCharindex(ind)
        if (charIndex === ind) {
            window.addEventListener("keyup", (e) => {
                if (e.key === 'Backspace') {
                    letter.forEach((item) => {
                        letter.splice(charIndex, 1)
                    })
                }
            })
        }
    }

    const HandleClick = (text, ind) => {
        setactiveindex(ind)
        setmeassage('Correct Letter')
        let InputSpace = document.getElementsByClassName('InputSpace')
        if (letter.includes(text)) {
            letter.forEach((element, index) => {
                if (element === text) {
                    setactive(true)
                    setcolor('#008000')
                    InputSpace[index].innerHTML = element
                    setCount(count + 1)
                }
            })
        }
        else {
            setChanses(chanses - 1)
            setcolor('red')
            setmeassage('Error Laterr')
        }
    }

    useEffect(() => {
        if (count === letter.length) {
            setresults({ message: true, over: 'you won the game' })
            setRandomWord("")
            setrandomhinit("")
        }
        if (chanses < 1) {
            setresults({ message: true, over: 'Game Over' })
            setRandomWord("")
            setrandomhinit("")
        }
    }, [count, chanses])

    return (
        <>
            <div className="string-conteiner">
                <div className="colm">
                    <p className="count">Chances Left: {chanses}</p>
                    <span className="randomworld"><span style={{ fontWeight: '700' }}>Hinit: {randomHinit}</span></span>
                    <div>
                        {letter.map((item, index) => <span onClick={() => DeleteCharakters(index)} className="InputSpace" style={{ margin: '0 8px' }} key={index}>_</span>)}
                    </div>
                    <p style={{ color: color }} className="results">{message}</p>
                    <div id="letter-conteiner">
                        {buttons.map((el, index) => <button className={`${active && activeindex === index ? 'active' : ''}`} onClick={() => HandleClick(el, index)} key={index}>{el}</button>)}
                    </div>
                </div>
            </div>
            {results.message && <Modalmessage StartAgain={StartAgain} results={results} />}
        </>
    )
}