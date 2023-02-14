import "./Task.css";

const Task = ({id,title, date, handleDeletionById}) => {
    return(
        <div className="task">
            <p>{title} {date}</p>
            <button onClick={() => handleDeletionById(id)} >delete</button>
        </div>);
}

export default Task;
