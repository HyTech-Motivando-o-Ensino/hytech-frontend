import { useContext, useEffect, useState } from "react"
import { Container } from "reactstrap";
import { HomeContext } from "../context/home";

function SelectCourse(props) {

    const [courses, setCourses] = useState([]);
    const {allData, addData} = useContext(HomeContext);
    useEffect(() => {
        // GET COURSES
        addData('courses', [
            {
                id: 1,
                name: 'Design',
                periods: [1, 2, 3, 4, 5, 6, 7, 8]
            },
            {
                id: 2,
                name: 'Ciências da Computacao',
                periods: [1, 2, 3, 4, 5]
            }
    
        ])
        addData('allPeriods', [1, 2, 3, 4, 5, 6, 0, 8]);
        setCourses([
            {
                id: 1,
                name: 'Design',
            },
            {
                id: 2,
                name: 'Ciências da Computacao'
            }
    
        ]);
        console.log(courses);
        
    }, [])
    const selectCourse = (id) => {
        props.addComponent({
            entity: 'user',
            children: (<>{id}</>)
        })
        const periodsComp = periods({addComponent: props.addComponent})
        periodsComp.getComponent();
    }
    return (
        <div>
            {courses.map((course) => (
                <div className="link" onClick={() => selectCourse(course.name)} key={course.id}>
                    <p>{course.name}</p>
                <hr />
            </div>
            ))}
        </div>
    )
}

export default function contacts(addComponent) {

    const getComponent = () => {
        addComponent({
            entity: 'bot',
            isBox: true,
            title: 'Você estuda em qual curso?',
            children: (<SelectCourse addComponent={addComponent} />)
        
        })
    }
    return {getComponent};
}

function SelectPeriods(props) {
    const [periods, setPeriods] = useState([])
    const {allData, addData} = useContext(HomeContext);

    useEffect(() => {
        // GET PERIODOS FROM COURSE
        setPeriods(allData.courses[0].periods);
    }, [])

    const getProfessors = (period) => {
        props.addComponent({
            entity: 'user',
            children: (<>{period}</>)
        })
        const professorsComp = professors({addComponent: props.addComponent})
        professorsComp.getComponent();
    }
    return (<div className="link">
        {periods.map((period) => {
            return (<p className="d-inline m-2" onClick={() => getProfessors(period)} key={period}>{period}</p>)
        })}
    </div>)
} 
function periods(data) {

    const getComponent = () => {
        data.addComponent({
            entity: 'bot',
            isBox: true,
            title: 'Qual periodo você esta?',
            children: (<SelectPeriods addComponent={data.addComponent} />)
        
        })
    }
    return {getComponent};
}
function SelectProfessors(props) {
    const [subjects, setSubjects] = useState([])
    const {allData, addData} = useContext(HomeContext);

    useEffect(() => {
        // GET PERIODOS FROM COURSE
        setSubjects([{
            name: 'Ricardo Costa',
            id: 1
        },
        {
            name: 'Juliano M. Borges',
            id: 2
        }]);
    }, [])

    const showProfessorContacts = (professor) => {
        props.addComponent({
            entity: 'user',
            children: (<>{professor}</>)
        })
        const professorContacts = showContact({addComponent: props.addComponent})
        professorContacts.getComponent();
    }
    return (<div className="link">
        {subjects.map((subject) => {
            return (<div className="link" key={subject.id} onClick={() => showProfessorContacts(subject.name)}>{subject.name}<hr /></div>)
        })}
    </div>)
} 
function professors(data) {

    const getComponent = () => {
        data.addComponent({
            entity: 'bot',
            isBox: true,
            title: 'Qual professor você deseja falar?',
            children: (<SelectProfessors addComponent={data.addComponent} />)
        
        })
    }
    return {getComponent};
}
function ShowContacts(props) {
    const [contacts, setContacts] = useState({})
    const {allData, addData} = useContext(HomeContext);

    useEffect(() => {
        // GET PERIODOS FROM COURSE
        setContacts({
            slack: '@JulianoMBorges',
            email: 'jmb@cesar.school',
            whatsapp: '(11) 999999999'
        });
    }, [])
    return (<div className="text-secondary text-center">
        <p>Slack {contacts.slack}</p>
        <p>Email {contacts.email}</p>
        <p>Whatsapp {contacts.whatsapp}</p>
    </div>)
} 
function showContact(data) {

    const getComponent = () => {
        data.addComponent({
            entity: 'bot',
            isBox: true,
            title: 'Contatos do professor',
            children: (<ShowContacts />)
        
        })
    }
    return {getComponent};
}
