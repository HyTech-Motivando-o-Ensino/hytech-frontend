import { useEffect, useState } from "react"
import { Container } from "reactstrap";

function SelectCourse(props) {

    const [courses, setCourses] = useState([]);
    useEffect(() => {
        setCourses([
            {
                id: 1,
                name: 'Design',
            },
            {
                id: 2,
                name: 'Ciências da Computacao'
            }
    
        ])
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
    useEffect(() => {
        setPeriods([1, 2, 3, 4, 5, 6, 7, 8])
    }, [])
    return (<div className="link">
        <p className="d-inline m-2">1</p>
        <p className="d-inline m-2">2</p>
        <p className="d-inline m-2">3</p>
        <p className="d-inline m-2">4</p>
        <p className="d-inline m-2">5</p>
        <p className="d-inline m-2">6</p>
        <p className="d-inline m-2">7</p>
        <p className="d-inline m-2">8</p>
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
