import {useEffect, useState, useRef, useCallback} from "react";

import Loader from "../../components/Loader/Loader";
import Task from "../../components/Task/Task";

import { getToken } from '../../helpers';
import {deleteTaskRequest, getTaskRequest, postTaskRequest} from "../../middlewares/request";

import "./HomePage.css";

const HomePage = () => {
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const titleRef = useRef();
    const dateRef = useRef();

    const processInput = async () => {
        setIsLoading(true);
        const token = getToken();
        const data = await postTaskRequest(token, {
            title: titleRef.current.value,
            date: dateRef.current.value,
        }, setErrorMessage)
        if (!data || !data.success) {
            setIsLoading(false)
            return;
        }
        setData(data.list);
        setIsLoading(false);
    }

    const handleDeletionById = useCallback(async (id) => {
        setIsLoading(true);
        const token = getToken();
        const response = await deleteTaskRequest(token, id, setErrorMessage)
        if (!response || !response.success) {
            setIsLoading(false)
            return;
        }
        setData(data.filter((task) => task._id !== id));
        setIsLoading(false);
    },[data, setData])

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const token = getToken();
            const data = await getTaskRequest(token, setErrorMessage);
            if (!data || !data.success) {
                setIsLoading(false)
                return;
            }
            setData(data.list);
            setIsLoading(false);
        })()
    }, []);

    return(
        <div className="back">
            <div className="container" >
                {isLoading?
                    (<Loader/>)
                    :
                    (<div className="list" >
                        <div className="heading" >
                            <input ref={titleRef} className="input text" placeholder="title" type="text" />
                            <input ref={dateRef} className="input date" placeholder="to-do" type="date" />
                            <button onClick={processInput} className="submit">Add</button>
                            {errorMessage && <div className="error" >{errorMessage}</div>}
                        </div>
                        {data.map((task) => <Task
                            key={task._id}
                            id={task._id}
                            date={task.date}
                            title={task.title}
                            handleDeletionById={handleDeletionById}
                        /> )}
                    </div>)
                }
            </div>
        </div>
    );
}

export default HomePage;
