import React, {useState} from 'react';
import classes from "./LoginForm.module.css";
import { Textinput } from '@yandex/ui/Textinput/desktop/bundle'
import { Button } from '@yandex/ui/Button/desktop/bundle'
import {Link} from "@yandex/ui/Link";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {login} from "../../api/auth";


const LoginForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();


    const changeLoginInput = (login) => {
        dispatch({type: "LOGIN_CHANGE", payload: login});
    }

    const changePasswordInput = (password) => {
        dispatch({type: "PASSWORD_CHANGE", payload: password});
    }

    const changeJwtToken = (token) => {
        localStorage.setItem("authToken", token);
    }

    let loginState = useSelector(state => state.auth.login);
    let passwordState = useSelector(state => state.auth.password);

    let [error, setError] = useState("");

    function loginUser(e) {
        e.preventDefault();

        function onOK(response) {
            if (response.status === 200) {
                response.json().then((data) => {
                    changeJwtToken(data.jwtToken);
                    history.push("/main");
                });
            }
            else {
                response.text().then(text => setError(text));
            }
        }

        function onErr(error) {
            console.log(error);
        }

        const user = {
            username: loginState,
            password: passwordState
        }
        login(user, onOK, onErr);
        // history.push("/");
    }

    return (
        <div className={classes.login_form}>
            <div className={classes.auth_text}>
                <span>Authorize</span>
            </div>
            <div className={classes.input_block}>

                <div>
                    <div>
                        <Textinput id="loginInput"
                                   className={classes.text_input}
                                   size="s"
                                   view="default"
                                   pin="round-round"
                                   placeholder="Username"
                                   maxlength={12}
                                   hasClear={true}
                                   value={loginState}
                                   onChange={(event) => {
                                       changeLoginInput(event.target.value);
                                   }}
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
                            pin="round-round"
                            placeholder="Password"
                            maxlength={30}
                            type="password"
                            hasClear={true}
                            value={passwordState}
                            onChange={(event) => changePasswordInput(event.target.value)}
                        />
                    </div>
                </div>

            </div>

            {error !== "" &&
            <div className={classes.error_div}>
                {error}
            </div>
            }

            <div className={classes.button_container}>
                <Button size="m"
                        width="max"
                        view="default"
                        type="submit"
                        onClick={e => loginUser(e)}
                        pin="circle-circle">
                    Login
                </Button>
            </div>

            <div className={classes.other_login_options}>
                <Link view="default" href="/register">
                    Not registered yet?
                </Link>
                <Link view="default" href="#">
                    Login via VK
                </Link>
            </div>

        </div>
    );
};

export default LoginForm;