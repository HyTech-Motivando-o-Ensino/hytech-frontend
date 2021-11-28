import { useContext, useEffect, useState } from "react"
import { Container } from "reactstrap";
import { HomeContext } from "../context/home";
import useFetch from "./fetchData";

function SelectCourse(props) {

    const [courses, setCourses] = useState([]);
    const {allData, addData} = useContext(HomeContext);

    const {getCourses} = useFetch()
    useEffect(async () => {
        const courses = await getCourses();
        addData('courses', courses)
        setCourses(courses);
        
    }, [])
    const selectCourse = (index) => {
        const course = allData.courses[index]
        props.addComponent({
            entity: 'user',
            children: (<>{course.name}</>)
        })
        addData('selectedCourse', course);
        const periodsComp = periods({addComponent: props.addComponent})
        periodsComp.getComponent();
    }
    return (
        <div>
            {courses.map((course) => (
                <div className="link" onClick={() => selectCourse(course.index)} key={course.id}>
                    <p id={course.name}>{course.name}</p>
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
        setPeriods(allData.selectedCourse.periods);
    }, [])

    const getProfessors = (period) => {
        props.addComponent({
            entity: 'user',
            children: (<>Meu periodo: {period}</>)
        })
        const professorsComp = professors({selected: period, course: allData.selectedCourse.id ,addComponent: props.addComponent})
        professorsComp.getComponent();
    }
    return (<div className="link">
        {periods.map((period) => {
            return (<p className="d-inline m-2" id={period} onClick={() => getProfessors(period)} key={period}>{period}</p>)
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
    const [professors, setProfessors] = useState([])
    const {allData, addData} = useContext(HomeContext);

    const {getProfessors} = useFetch();
    useEffect(async () => {
        const professors = await getProfessors(props.period, props.course);
        addData('professors', professors);
        setProfessors(professors);
    }, [])

    const showProfessorContacts = (index) => {
        const professor = allData.professors[index];
        props.addComponent({
            entity: 'user',
            children: (<>Contatos do professor {professor.name}</>)
        })
        const professorContacts = showContact({professor: professor.index, addComponent: props.addComponent})
        professorContacts.getComponent();
    }
    return (<div className="link">
        {professors.map((professor) => {
            return (<div className="link" key={professor.id}  id={professor.name} onClick={() => showProfessorContacts(professor.index)}>{professor.name}<hr /></div>)
        })}
    </div>)
} 
function professors(data) {

    const getComponent = () => {
        data.addComponent({
            entity: 'bot',
            isBox: true,
            title: 'Qual professor você deseja falar?',
            children: (<SelectProfessors addComponent={data.addComponent} period={data.selected} course={data.course} />)
        
        })
    }
    return {getComponent};
}
function ShowContacts(props) {
    const [contacts, setContacts] = useState({})
    const {allData, addData} = useContext(HomeContext);
    const favorites = {
        1: 'SLACK',
        2: 'EMAIL',
        3: 'WHATSAPP'
    }
    useEffect(() => {
        const contacts = allData.professors[props.professor]
        setContacts(contacts);
    }, [])
    return (<div className="text-secondary text-center">
        <p id="contact-slack"><b>Slack</b> {contacts.slack}</p>
        <p id="contact-email"><b>Email</b> {contacts.email}</p>
        <p id="contact-whatsapp"><b>Whatsapp</b> {contacts.whatsapp}</p>
        <p id="contact-preferencial"><b>Preferencial:</b> {favorites[contacts.favorite]}</p>
    </div>)
} 
function showContact(data) {

    const getComponent = () => {
        data.addComponent({
            entity: 'bot',
            isBox: true,
            title: 'Contatos do professor',
            children: (<ShowContacts professor={data.professor} />)
        
        })
    }
    return {getComponent};
}
