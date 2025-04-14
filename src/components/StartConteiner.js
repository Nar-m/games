import { createContext, useState } from "react";

export const GamesContext = createContext()

const options = {
    stringgames: false,
    TicTAC: false,
    Snake: false,
    WhackGames: false,
    flagGames: false,
    space: false,
    flapp: false,
    openflapyjmmp: false,
    vertical: false,
    breakout: false
}

const StringGames = {
    aroma: 'Pleasing smell',
    pepper: 'Salt`s partner',
    halt: 'put a stop to',
    jump: 'Rise Sudenly',
    shuffle: "Mix cards up",
    combine: 'Add; Mix',
    chaos: 'Total disorder',
    labyrinth: 'Maze',
    disturb: 'Interrupt; upset',
    shift: 'Move; Period of word',
    mashine: "Device or appliance",
}

export default function GamesProvider({ children }) {
    const [startGames, setStartGames] = useState(options)
    const [modalInterval, setModalinterval] = useState(false)
    const [secundsNumber, setSecundsNumber] = useState(7)
    const [randomworld, setRandomWord] = useState("")
    const [randomHinit, setrandomhinit] = useState("")
    const word = Object.keys(StringGames)

    const OpenFlappyJumb = () => {
        setStartGames((games) => ({
            ...games,
            openflapyjmmp: true
        }))
        setModalinterval(true)
    }

    const OpenSpaceInveders = () => {
        setStartGames((games) => ({
            ...games,
            space: true
        }))
        setModalinterval(true)
    }
    const OpenFlappGames = () => {
        setStartGames((games) => ({
            ...games,
            flapp: true
        }))
        setModalinterval(true)
    }
    const OpenWhackGames = () => {
        setStartGames((games) => ({
            ...games,
            WhackGames: true
        }))
        setModalinterval(true)
    }
    const OpenFlagGames = () => {
        setStartGames((games) => ({
            ...games,
            flagGames: true
        }))
        setModalinterval(true)
    }
    const HideModal = () => {
        setModalinterval(false)
        setSecundsNumber(7)
    }
    const OpenStringGames = () => {
        setStartGames((games) => ({
            ...games,
            stringgames: true
        }))
        setModalinterval(true)
        let data = word[Math.floor(Math.random() * word.length)]
        setRandomWord(data)
        setrandomhinit(StringGames[data])
    }

    const OpenTicTacGames = () => {
        setStartGames((games) => ({
            ...games,
            TicTAC: true
        }))
        setModalinterval(true)
    }
    const OpenSnakeGames = () => {
        setStartGames((games) => ({ ...games, Snake: true }))
        setModalinterval(true)
    }
    const OpenVerticalGames = () => {
        setStartGames((games) => ({ ...games, vertical: true }))
        setModalinterval(true)
    }
    const OpenBreakOut = () => {
        setStartGames((games) => ({ ...games, breakout: true }))
        setModalinterval(true)
    }
    const ExItGams = () => {
        setStartGames({
            stringgames: false,
            TicTAC: false, Snake: false,
            WhackGames: false,
            flapp: false,
            flagGames: false,
            space: false,
            openflapyjmmp: false,
            vertical: false,
            breakout: false
        })
        setModalinterval(false)
    }
    return <GamesContext.Provider
        value={
            {
                OpenStringGames,
                setRandomWord,
                OpenSpaceInveders,
                OpenVerticalGames,
                OpenFlagGames,
                StringGames,
                setrandomhinit,
                HideModal,
                randomworld,
                setSecundsNumber,
                secundsNumber,
                randomHinit,
                OpenFlappyJumb,
                startGames,
                ExItGams,
                OpenFlappGames,
                modalInterval,
                setModalinterval,
                modalInterval,
                OpenSnakeGames,
                OpenTicTacGames,
                OpenBreakOut,
                OpenWhackGames
            }}>{children}</GamesContext.Provider>
}