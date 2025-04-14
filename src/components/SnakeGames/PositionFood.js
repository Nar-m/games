import plus from '../images/plus.mp3'

export default function PositionsFood(newsnake, setsCore, setFood, food, score) {
    const snakehead = newsnake[0]
    if (snakehead.x === food.x && snakehead.y === food.y) {
        setsCore(score + 1)
        new Audio(plus).play()
        setFood({
            x: Math.floor(Math.random() * 20) + 1,
            y: Math.floor(Math.random() * 20) + 1
        })
        newsnake.push({
            x: newsnake[newsnake.length - 1].x,
            y: newsnake[newsnake.length - 1].y
        })
    }
}