export default function Square(props) {
    return (
        <div onClick={props.onClick} 
        style={{ color: `${props.x  ? 'red' : 'green'}` }} 
        className='boxes'>{props.x ? "X" : (props.o ? "O" : "")}</div>
    )
}