import axios from "axios";

const fetchPostRequest = async (url, body, setError) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}${url}`, body);
        if (data.success) {
            return data;
        }
        setError(data.error)
    } catch (err) {
        const message = err.response.data.message;
        setError(typeof message === 'string' ? message : message[0])

    }
}

const getTaskRequest = async (token, setError) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/task`, { headers: { token } });
        if (data.success) {
            return data;
        }
        setError(data.error)
    } catch (err) {
        const message = err?.response?.data?.message;
        setError(typeof message === 'string' ? message : message[0])

    }
}

const postTaskRequest = async (token, body, setError) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/task`, body, { headers: { token } });
        if (data.success) {
            return data;
        }
        setError(data.error)
    } catch (err) {
        const message = err?.response?.data?.message;
        setError(typeof message === 'string' ? message : message[0])

    }
}

const deleteTaskRequest = async (token, taskId, setError) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/task/${taskId}`, { headers: { token } });
        if (data.success) {
            return data;
        }
        setError(data.error)
    } catch (err) {
        const message = err?.response?.data?.message;
        setError(typeof message === 'string' ? message : message[0])

    }
}

export {
    fetchPostRequest,
    getTaskRequest,
    postTaskRequest,
    deleteTaskRequest
}
