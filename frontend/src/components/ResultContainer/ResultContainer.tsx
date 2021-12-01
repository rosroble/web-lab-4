import * as React from 'react';
import "./ResultContainer.module.css";
import {pointAPI} from "../../api/PointService";
import ResultItem from "../ResultItem/ResultItem";
import classes from "./ResultContainer.module.css";

const ResultContainer = () => {
    const {data: points, error} = pointAPI.useFetchAllPointsQuery("");
    return (
        <div className={classes.resultContainer}>
            {error && <div style={{textAlign: "center"}}>Server error occurred</div>}
            <table>
                <thead>
                <tr>
                    <th>{"X"}</th>
                    <th>{"Y"}</th>
                    <th>{"R"}</th>
                    <th>{"Hit"}</th>
                </tr>
                </thead>
                <tbody>
                {points && points.map(point =>
                    <ResultItem point={point}/>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ResultContainer;