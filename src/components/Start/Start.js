import './start.css'
import NumbersGames from '../display/DisplayGames'
import TicTac from '../TicTac/TicTac'
import SnakeGames from '../SnakeGames/SnakeGames'
import Numbers from '../display/Numbers'
import StartWhack from '../WhackMole/StartWhack'
import FlagImg from '../FlagQuizGame/FlagImg'
import SpaceInvedersImg from '../spaceInveders/Spaceimg'
import Flappimg from '../flappybard/Flappimg'
import FLappyJumpimg from '../flappyJumb/FlappyjumbImg'
import VerticalImg from '../verticalplatform/VerticalImg'
import BreakOut from '../breakcount/BreakCount'

export default function StartConteiner() {
    return (
        <div className="start-conteiner">
            <div className='display-games'>
                <NumbersGames />
                <TicTac />
                <SnakeGames />
                <StartWhack />
                <FlagImg />
                <SpaceInvedersImg />
                <Flappimg />
                <FLappyJumpimg />
                <VerticalImg />
                <BreakOut/>
            </div>
            <Numbers />
        </div>
    )
}