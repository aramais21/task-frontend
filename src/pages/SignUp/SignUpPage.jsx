import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { setToken } from "../../helpers";
import { fetchPostRequest } from "../../middlewares/request";

const SignUpPage = ({ setAuthorized }) => {
    const [errorMessage, setErrorMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const emailInput = useRef();
    const passwordInput = useRef();

    const processInput = async () => {
        setIsLoading(true);
        const body = {
            email: emailInput.current?.value,
            pass: passwordInput.current?.value,
        };
        const data = await fetchPostRequest('/register', body, setErrorMessage);
        if (!data) {
            setIsLoading(false);
            return;
        }
        const loginData = await fetchPostRequest('/login', body, setErrorMessage)
        if(!loginData) {
            setIsLoading(false);
            return;
        }
        setToken(loginData.token);
        setAuthorized(true);
        setIsLoading(false);
    }

    return(
        <div className="back" >
            <div className="container" >
                <div className="title" >Sign Up</div>
                <input ref={emailInput} className="input email" placeholder="email" type="email" />
                <input ref={passwordInput} className="password input " placeholder="password" type="password"/>
                <button onClick={processInput} className="submit" disabled={isLoading}>Submit</button>
                {errorMessage && <div className="error" >{errorMessage}</div>}
                <Link className="link" to="/" > Log up </Link>
            </div>
        </div>
    );
}

export default SignUpPage;
