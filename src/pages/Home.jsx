import { Container } from 'reactstrap';
import Message from '../components/Message/Message';


import {ReactComponent as SendIcon} from '../assets/Buttons/send.svg';
import {ReactComponent as VerticalDot} from '../assets/Buttons/vertical-dot.svg';

import { useContext, useEffect, useRef, useState } from 'react';
import { HomeContext } from '../context/home';

import './Home.css';
import hello from '../hooks/hello';

function Home(props) {
    const {components, addComponent} = useContext(HomeContext);
    const [rendered, setRendered] = useState(false);
    const messageEl = useRef(null);

    const scrollBottom = () => {
        messageEl.current.scrollIntoView({ behavior: "smooth" })
    };
    const helloComp = hello();
    
    useEffect(() => {
        if(rendered == false) {
            helloComp.getComponent(addComponent);
            setRendered(true);
        }
    })
    useEffect(() => {
        if (messageEl) {
          messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
      }, [])

    return (
        <Container>
            <div className="header">
                <h1>Cesinha</h1>
                <VerticalDot />
            </div>
            <div className="conversation" ref={messageEl}>
                {components.map((data) => (
                    <Message entity={data.entity} key={data.key} box={data.isBox} title={data.title}>
                        {data.children}
                    </Message>
                ))}
            </div>
            <Container>
                {<input type="text" id="message" className="message-input shadow col-11" disabled /> }
                <button className="btn bg-orange" ><SendIcon fill='#FD813B' /></button>
            </Container>
        </Container>
    )
}
export default Home;