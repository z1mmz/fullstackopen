const Course = ({ course }) => {
    return (
        <div>
            <h1>{course.name}</h1>
             {course.parts.map(c => <li key={c.id}>{c.name} {c.exercises}</li>)}
             <p>total exercises: {course.parts.reduce((total,c) => total+c.exercises,0)}</p>
        </div>
        )
    }
export default Course