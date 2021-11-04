import { Container } from 'reactstrap';
import Message from '../components/Message/Message';
import './Home.css';
function Home(props) {

    const onClickTry = () => {
        alert("Clicou!");
    }
    return (
        <Container>
            <div className="header bg-secondary">
                <h1>Chatbot - Carlos</h1>
            </div>
            <div className="conversation">
                <Message entity="bot" >
                    <p onClick={onClickTry}>TESTE</p>
                </Message>
                <Message entity="user" >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse vero laboriosam officiis. Nam neque eius assumenda a, nesciunt quidem culpa fugiat! Commodi itaque ad impedit quis neque, vel doloremque eligendi!
                </Message>
                <Message entity="bot" >
                    Como vai sua vida?
                </Message>
            </div>
        </Container>
    )
}
export default Home;