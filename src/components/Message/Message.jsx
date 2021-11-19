import { Container } from 'reactstrap';
import './message.css';
function Message(props) {

    const location = props.entity === "bot" ? 'start' : 'end';
    const bg = props.entity === "bot" ? 'bot' : 'user';
    
    if(props.box) {
        return (
            <Container className={"message py-2 d-flex flex-column justify-content-" + location}>
                <div className="content align-items-center box">
                    <div className={"p-2 d-flex align-items-center justify-content-center text-center message-header bg-" + bg}>
                        <p>{props.title}</p>
                    </div>
                    <div className="box-bg box-content">
                        {props.children}
                    </div>
                </div>
            </Container>
        )
    }
    return (
        <Container className={"message py-2 d-flex align-items-center justify-content-" + location}>
            <div className="content">
                <div className={"text bg-" + bg}>
                    {props.children}
                </div>
            </div>
        </Container>
    );
}
export default Message;