import React, {useState} from 'react';
import classes from "./PointParamsPanel.module.css";
import {useDispatch, useSelector} from "react-redux";
import {RadioButton} from "@yandex/ui/RadioButton/desktop/bundle";
import {Textinput} from "@yandex/ui/Textinput/desktop/bundle";
import {Button} from "@yandex/ui/Button/desktop/bundle";
import {pointAPI} from "../../api/PointService";
import {IPoint} from "../../models/IPoint";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

const PointParamsPanel = (props: any) => {


    const dispatch = useAppDispatch();

    const [submitPoint, {}] = pointAPI.useSubmitNewPointMutation();

    const handleSubmit = async () => {
        if (errorStateX === "error" || errorStateY === "error") return;
        await submitPoint({
            x: Number(stateX),
            y: Number(stateY),
            r: Number(stateR)
        } as IPoint);
    }

    const changeX = (x: string) => {
        dispatch({type: "X_CHANGE", payload: x})
    }

    const changeY = (y: string) => {
        dispatch({type: "Y_CHANGE", payload: y})
    }

    const changeR = (r: string) => {
        dispatch({type: "R_CHANGE", payload: r})
    }

    const stateX = useAppSelector(state => state.point.x);
    const stateY = useAppSelector(state => state.point.y);
    const stateR = useAppSelector(state => state.point.r);

    const errorStateX = useAppSelector(state => state.point.errorStateX);
    const errorStateY = useAppSelector(state => state.point.errorStateY);



    // @ts-ignore
    return (
        <div className={classes.pointParamsPanel}>
            <div>
                <label>R:
            <RadioButton
                size="l"
                view="default"
                disabled={false}
                options={[
                    {value: "1", children: 1},
                    {value: "2", children: 2},
                    {value: "3", children: 3},
                    {value: "4", children: 4}
                ]}
                value={stateR}
                onChange={(event) => {
                    changeR(event.target.value);

                }}/>
                </label>
            </div>
            <div className={classes.text_container}>
                <label>X:
                    <Textinput id="x-selector"
                               size="m"
                               view="default"
                               pin="round-round"
                               placeholder="Input X..."
                               maxLength={3}
                               hasClear={true}
                               value={stateX}
                               state={errorStateX as "error"}
                               hint={errorStateX === "error" ? "-3 <= x <= 3" : ""}
                               onChange={(event) => {
                                   changeX(event.target.value);
                               }}
                    />
                </label>
                <label>Y:
                    <Textinput id="y-selector"
                               size="m"
                               view="default"
                               pin="round-round"
                               placeholder="Input Y..."
                               maxLength={3}
                               hasClear={true}
                               value={stateY}
                               state={errorStateY as "error"}
                               hint={errorStateY === "error" ? "-2 <= y <= 4" : ""}
                               onChange={(event) => {
                                   changeY(event.target.value);
                               }}
                    />
                </label>
            </div>

            <div className={classes.button_container}>
                <Button size="l"
                        width="max"
                        view="default"
                        type="submit"
                        onClick={(e) => handleSubmit()}
                        pin="circle-circle">
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default PointParamsPanel;