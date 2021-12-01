import React, {useEffect} from 'react';
import LabHeader from "../../components/LabHeader/LabHeader";
import classes from "./RegisterPage.module.css"
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import {useHistory} from "react-router-dom";

const RegisterPage = () => {
    const history = useHistory();
    let authToken = localStorage.getItem("authToken");
    authToken !== "" && history.push("/main")
    useEffect(() => {
        document.title = "Register Page"
    } )
    return (
        <div className={classes.register_page}>
            <LabHeader midtext="Register Page"/>
            <RegisterForm/>
        </div>
    );
};

export default RegisterPage;