import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {fetchPostRequest} from "../../middlewares/request";
import {setToken} from "../../helpers";

const LoginPage = ({ setAuthorized }) => {
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
              <div className="title" >Login</div>
              <input ref={emailInput} className="input email" placeholder="email" type="email" />
              <input ref={passwordInput} className="password input " placeholder="password" type="password"/>
              <button onClick={processInput} className="submit" disabled={isLoading}>Submit</button>
              {errorMessage && <div className="error" >{errorMessage}</div>}
              <Link className="link" to="/signup" > Sign up </Link>
          </div>
      </div>
    );
}

export default LoginPage;
