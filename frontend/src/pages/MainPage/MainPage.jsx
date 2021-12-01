import React, {useEffect, useState} from 'react';
import LabHeader from "../../components/LabHeader/LabHeader";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {Button} from "@yandex/ui/Button";
import Graph from "../../components/Graph/Graph";
import classes from "./MainPage.module.css";
import PointParamsPanel from "../../components/PointParamsPanel/PointParamsPanel";
import ResultContainer from "../../components/ResultContainer/ResultContainer";
import {useAppSelector} from "../../hooks/redux";

const MainPage = () => {
    const history = useHistory();
    let jwt = localStorage.getItem("authToken");
    let [authSuccess, setAuthSuccess] = useState(false);
    let radius = useAppSelector(state => state.point.r);

    useEffect(() => {
        document.title = "Main Page"
    } )

    function signOut() {
        localStorage.setItem("authToken", "");
        history.push("/");
    }

    function onCanvasClick() {
        console.log("qwe");
    }


    return (
        <div>
            {jwt !== "" && {authSuccess} ?
                <div>
                    <LabHeader midtext="Main page"/>
                    <Button size="m"
                            width="max"
                            view="default"
                            type="submit"
                            onClick={signOut}
                            pin="circle-circle">Sign Out</Button>
                    <div className={classes.input}>
                        <div className={classes.input_left}>
                            <div className={classes.canvasGraph}>
                                <Graph id={"canvas-graph"} onClick={onCanvasClick} radius={radius}/>
                            </div>
                        </div>
                        <div className={classes.input_right}>
                            <ResultContainer/>
                        </div>
                        <div className={classes.input_center}>
                            <PointParamsPanel/>
                        </div>
                    </div>
                </div>
                : <h1 style={{textAlign: "center"}}>Unauthorized</h1>
            }
        </div>

    );
}
export default MainPage;