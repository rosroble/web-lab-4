import React, {useEffect} from 'react';
import LabHeader from "../../components/LabHeader/LabHeader";
import LoginForm from "../../components/LoginForm/LoginForm";
import classes from "./LoginPage.module.css"
import {useHistory} from "react-router-dom";

const LoginPage = () => {
    const history = useHistory();
    let authToken = localStorage.getItem("authToken");

    useEffect(() => {
        document.title = "Login Page"
    } )

    authToken !== "" && history.push("/main")
    return (
        <div className={classes.login_page}>
            <LabHeader midtext="Login Page"/>
            <div className={classes.login_form}>
                <LoginForm/>
            </div>
        </div>
    );
};

export default LoginPage;