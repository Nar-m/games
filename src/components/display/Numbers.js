import { useContext, useEffect, useState } from "react"
import { GamesContext } from "../StartConteiner"
import './numbers.css';
import StringGames from "./GamesContent";
import SnakeFood from "../SnakeGames/SnakeFood";
import TicTacGames from "../TicTac/TicTacGames";
import WhackGames from "../WhackMole/WhackGames";
import FlagQuizGame from "../FlagQuizGame/FlagQuizgame";
import SpaceInveders from "../spaceInveders/SpaceInveders";
import FlappyGames from "../flappybard/FlappyGames";
import FlappyJump from "../flappyJumb/FlappyJumb";
import VerticalGames from "../verticalplatform/VerticalGames";
import BreakOutGames from "../breakcount/BreakOutGames";

export default function Numbers() {
    const { modalInterval, startGames, setSecundsNumber, secundsNumber, HideModal } = useContext(GamesContext)
    const [interval, setintervalid] = useState()
    const CheckGames = () => {
        if (!modalInterval && startGames.stringgames) {
            return <StringGames />
        }
        else if (!modalInterval && startGames.Snake) {
            return <SnakeFood />
        }
        else if (!modalInterval && startGames.TicTAC) {
            return <TicTacGames />
        }
        else if(!modalInterval && startGames.flapp){
            return <FlappyGames/>
        }
        else if (!modalInterval && startGames.WhackGames) {
            return <WhackGames />
        }
        else if (!modalInterval && startGames.flagGames) {
            return <FlagQuizGame />
        }
        else if (!modalInterval && startGames.space) {
            return <SpaceInveders />
        }
        else if(!modalInterval && startGames.openflapyjmmp){
            return <FlappyJump/>
        }
        else if(!modalInterval && startGames.vertical){
            return <VerticalGames/>
        }
        else if(!modalInterval && startGames.breakout){
            return <BreakOutGames/>
        }
    }
    useEffect(() => {
        if (modalInterval) {
            setintervalid(setInterval(() => {
                { setSecundsNumber(secundsNumber - 1) }
                if (secundsNumber <= 0) {
                    HideModal()
                }
            }, 1000))
            return () => clearInterval(interval)
        }
        else {
            clearInterval(interval)
        }
    }, [modalInterval, secundsNumber])

    return (
        <>
            {modalInterval ? <div className="modal-interval">
                <div className="modal-numbers">
                    <span>This Mush  {secundsNumber}  secunds</span>
                </div>
            </div> : CheckGames()}
        </>
    )
}