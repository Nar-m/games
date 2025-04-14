import overgame from '../images/gameover.mp3'

export default function HandleBodyCelision(newsnake, setGameover, setStartGame) {
    const snakhead = newsnake[0]
    for (let i = 1; i < newsnake.length; i++) {
        if (snakhead.x === snakhead.y) return;
        if (snakhead.x === newsnake[i].x && snakhead.y === newsnake[i].y) {
            new Audio(overgame).play()
            setGameover(true)
            setStartGame(false)
        }
    }
}