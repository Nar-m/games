import { useContext } from "react"
import { GamesContext } from "../StartConteiner"

export default function Modalmessage({ StartAgain, results }) {
    const { ExItGams } = useContext(GamesContext)
    const checkColor = results.over === 'Game Over' ? 'text-red-500' : 'text-[2rem] text-gray-500'
    return (
        <div className="modal">
            <div className="modal-message">
                <div className="flex justify-between items-center border-b ">
                    <div className="important-mesage">
                        <span>Important Message</span>
                    </div>
                    <div className="fi-times">
                        <span onClick={StartAgain}>&times;</span>
                    </div>
                </div>
                <div className="flex justify-center items-center flex-col p-2 mt-3 text-center">
                    <h1 className="text-gray-500 text-2xl">Question!</h1>
                    <p className={`${checkColor}`}>{results.over === 'Game Over' ? 'Game Over' : 'You won the game'}</p>
                    <div className="mt-2">
                        <button onClick={StartAgain}>Start Again</button>
                        <button onClick={ExItGams}>Exit Games</button>
                    </div>
                </div>
            </div>
        </div>
    )
}