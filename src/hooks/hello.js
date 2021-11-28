import contacts from './contacts';
function Clickable(props) {
    const redirectContact = () => {
        const contactComp = contacts(props.addComponent);
        props.addComponent({
            entity: 'user',
            children: (<>Contatos</>)
        });
        contactComp.getComponent();
        
    }
    return (
        <div>
            <div className="link" onClick={redirectContact}>
                <p id="select-contacts">Contatos</p>
                <hr />
            </div>
            <div className="link">
                <p>Links das salas</p>
                <hr />
            </div>
            <div className="link">
                <p>Código do classroom</p>
                <hr />
            </div>
            <div className="link">
                <p>Avisos</p>
            </div>
        </div>
    )
}

export default function hello() {

    const getComponent = (addComponent) => {
        addComponent({
            entity: 'bot',
            isBox: true,
            title: 'Olá! Por favor, selecione alguma das seguintes opções:',
            children: (<Clickable addComponent={addComponent} />)
        
        })
    }
    return {getComponent};
}