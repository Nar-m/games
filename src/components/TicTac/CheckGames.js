
export const comibination = [
    { combo: [0, 1, 2], strikeclass: 'strike-row-1' },
    { combo: [3, 4, 5], strikeclass: 'strike-row-2' },
    { combo: [6, 7, 8], strikeclass: 'strike-row-3' },

    { combo: [0, 3, 6], strikeclass: 'strike-column-1' },
    { combo: [1, 4, 7], strikeclass: 'strike-column-2' },
    { combo: [2, 5, 8], strikeclass: 'strike-column-3' },

    { combo: [0, 4, 8], strikeclass: 'strike-diagonal-1' },
    { combo: [2, 4, 6], strikeclass: 'strike-diagonal-2' },
]

const GamesState = {
    gameX: 'Games Won X',
    gameO: 'Games Won O'
}

export default function CheckGamesCombination(ticTac, setStriclass, SetGameover, setrestart, timeMount, setTimeUpdate) {
    for (const arr of comibination) {
        const { combo, strikeclass } = arr
        const tiles1 = ticTac[combo[0]]
        const tiles2 = ticTac[combo[1]]
        const tiles3 = ticTac[combo[2]]
        if (tiles1 !== null && tiles1 === tiles2 && tiles1 === tiles3) {
            setStriclass(strikeclass)
            clearTimeout(timeMount)
            setTimeUpdate()
            setrestart(true)
            if (tiles1 === 'X') {
                SetGameover(GamesState.gameX)
            }
            else {
                SetGameover(GamesState.gameO)
            }
        }
    }
}