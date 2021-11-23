import api from "./api";
function useFetch() {

    const getCourses = async() => {
        try {
            const {data} = await api.get('/get/courses/all/');
            // const {data} = await api.get();
            const courses = [];
            const coursesFromResponse = data.msg;
            let index = 0;
            coursesFromResponse.map((course) => {
                const courseData = {
                    id: course[0],
                    name: course[1],
                    index: index
                }
                const periods = []
                for(let i = 0; i < course[2]; i++) {
                    periods.push(i + 1);
                }
                courseData["periods"] = periods;
                courses.push(courseData);
                index++;
            });
            return courses;
        } catch (error) {
            alert('ERROR AO ACHAR NO BANCO DE DADOS!')
        }        
        return [];
    }
    const getProfessors = async(period, courseId) => {
        try {
            const {data} = await api.get('get/professors/' + period + '/' + courseId);
            const professors = [];
            let index = 0;
            data.msg.map((professor) => {
                const teacher = {
                    name: professor.name,
                    slack: professor.slack,
                    email: professor.email,
                    whatsapp: professor.whatsapp,
                    favorite: professor.favorite,
                    index
                };
                professors.push(teacher);
                index++;
            });
            return professors
        } catch (error) {
            alert('ERROR AO ACHAR NO BANCO DE DADOS!')
        }
    }
    return {getCourses, getProfessors}
}
export default useFetch;