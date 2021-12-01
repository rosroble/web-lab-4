import * as React from 'react';
import {FC} from "react";
import {IPoint} from "../../models/IPoint";

interface ResultItemProps {
    point: IPoint;
}

const ResultItem: FC<ResultItemProps> =  (props) => {
    return (
        <tr>
            <td>{props.point.x}</td>
            <td>{props.point.y}</td>
            <td>{props.point.r}</td>
            <td>{String(props.point.hit)}</td>
        </tr>
    );
};

export default ResultItem;