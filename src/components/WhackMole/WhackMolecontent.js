import ground from '../images/ground.png'
import mole from '../images/mole.png'

export default function WhackMolecontent(props) {
    const { OnmuseMove, setActive, board, HandleMole, setMousepage, score, mousePage, setStartWheckGame, active } = props
    return (
        <div
            onMouseUp={() => setActive(false)}
            onMouseDown={() => setActive(true)}
            onMouseMove={(e) => OnmuseMove(e)}
            onMouseLeave={() => setMousepage({ x: 0, y: 0 })}

            className="whack-conteiner">
            <div className='whack-title'>
                <h1 className='score'>Score: <span>{score === 0 ? '00' : score}</span></h1>
            </div>
            <div className='whack-content'>
                <div className='whack-board'>
                    {board.map((boar, index) => {
                        return (
                            <div key={index} className='hole'>
                                <img onClick={() => HandleMole(index)}
                                    className={`${boar.active ? 'mole active' : 'mole'}`} alt='images/Games'
                                    src={boar.hite ? mole : ground} />
                            </div>
                        )
                    })}
                </div>
                <div className='start-game'>
                    <button onClick={() => setStartWheckGame(true)}>
                        Start
                    </button>
                    <button onClick={() => setStartWheckGame(false)}>
                        Stop
                    </button>
                </div>
            </div>
            <div style={{
                top: mousePage.y + "px",
                left: mousePage.x + "px"
            }} className={`${active ? 'cursor active' : 'cursor'}`}>
            </div>
        </div>
    )
}