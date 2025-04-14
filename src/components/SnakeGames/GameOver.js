import overgame from '../images/gameover.mp3'

export default function GameOver(newtiles, setGameover, setStartGame) {
    if (newtiles.x <= 0 || newtiles.x >= 21 || newtiles.y <= 0 || newtiles.y >= 21) {
        new Audio(overgame).play()
        setGameover(true)
        setStartGame(false)
    }
}