import { Container } from 'reactstrap';
import './message.css';
function Message(props) {

    const location = props.entity === "bot" ? 'start' : 'end';
    const bg = props.entity === "bot" ? 'bot' : 'user';
    const letter = props.entity === "bot" ? 'B' : 'U';
    
    return (
        <Container className={"message py-2 d-flex align-items-center justify-content-" + location}>
            <div id="icon" className={"bg-" + bg}>
                {letter}
            </div>
            <div className="text">
                {props.children}
            </div>
        </Container>
    );
}
export default Message;