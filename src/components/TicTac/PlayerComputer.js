export default function PlayerComputer(tictac, setTictac, NumberCompute) {
    const playerCompute = tictac.filter(item => item !== null).length % 2 === 1
    if (playerCompute) {
        const emtyIndex =
            tictac.map((item, index) => item === null ? index : null)
                .filter(val => val !== null)
        const index = Math.ceil(Math.random() * emtyIndex.length)
        const randomIndex = emtyIndex[index];
        const newtiles = [...tictac]
        newtiles[randomIndex] = "O";
        NumberCompute()
        setTictac(newtiles)
    }
}