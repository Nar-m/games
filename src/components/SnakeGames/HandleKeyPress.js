export default function HandleKeyPress(event, setDiretion) {
    switch (event.key) {
        case 'ArrowUp':
            setDiretion('UP')
            break;
        case 'ArrowLeft':
            setDiretion('LEFT')
            break;
        case 'ArrowRight':
            setDiretion('RIGHT')
            break;
        case 'ArrowDown':
            setDiretion('DOWN')
            break;
        default:
            break;
    }
}