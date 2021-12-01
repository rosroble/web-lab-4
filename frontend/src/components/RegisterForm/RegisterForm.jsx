import React, {useState} from 'react';
import classes from "./RegisterForm.module.css";
import {Textinput} from "@yandex/ui/Textinput/desktop/bundle";
import {Button} from "@yandex/ui/Button/desktop/bundle";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {register} from "../../api/auth.js";

const RegisterForm = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    let loginState = useSelector(state => state.auth.login);
    let passwordState = useSelector(state => state.auth.password);
    let confirmPasswordState = useSelector(state => state.auth.confirm);
    let errorState = useSelector(state => state.auth.confirmed);

    let [errorDiv, setErrorDiv] = useState("");



    const changeLoginInput = (login) => {
        dispatch({type: "LOGIN_CHANGE", payload: login})
    }

    const changePasswordInput = (password) => {
        dispatch({type: "PASSWORD_CHANGE", payload: password})
    }

    const changeConfirmInput = (confirm) => {
        dispatch({type: "CONFIRM_CHANGE", payload: confirm});
    }

    function registerUser() {
        function onOK(response) {
            if (response.status === 200) {
                history.push("/");
            } else {
                response.text().then(text => setErrorDiv(text));
            }
        }

        function onErr(err) {
            console.log(err);
        }

        if (errorState === "error") return;
        const user = {
            username: loginState,
            password: passwordState
        }

       register(user, onOK, onErr);
    }

    return (
        <div className={classes.register_form}>
            <div className={classes.auth_text}>
                <span>Register</span>
            </div>
            <div className={classes.input_block}>
                <div>
                    <div>
                        <Textinput id="loginInput"
                                   className={classes.text_input}
                                   size="s"
                                   view="default"
                                   placeholder="Username"
                                   maxlength={12}
                                   value={loginState}
                                   onChange={(event) => changeLoginInput(event.target.value)}
                                   pin="round-round"
                                   hasClear={true}
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <Textinput
                            id="passwordInput"
                            className={classes.text_input}
                            size="s"
                            view="default"
                            maxlength="30"
                            placeholder="Password"
                            type="password"
                            value={passwordState}
                            onChange={(event) => {
                                changePasswordInput(event.target.value)
                                console.log(passwordState);
                                console.log(event.target.value);
                            }}
                            pin="round-round"
                            hasClear={true}
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <Textinput
                            id="passwordInput"
                            className={classes.text_input}
                            size="s"
                            view="default"
                            maxlength="30"
                            placeholder="Confirm password"
                            type="password"
                            onChange={(event) => changeConfirmInput(event.target.value)}
                            value={confirmPasswordState}
                            pin="round-round"
                            state={errorState}
                            hint={errorState === "error" ? "Passwords do not match" : ""}
                            hasClear={true}
                        />
                    </div>
                </div>
            </div>

            {errorDiv !== "" &&
            <div className={classes.error_div}>
                {errorDiv}
            </div>
            }
            <div className={classes.button_container}>
                <Button size="m"
                        width="max"
                        view="default"
                        type="submit"
                        pin="circle-circle"
                        onClick={registerUser}
                >
                    Register
                </Button>
            </div>

        </div>
    );
};

export default RegisterForm;