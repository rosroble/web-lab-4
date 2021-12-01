import React from 'react';
import classes from './LabHeader.module.css';

const LabHeader = (props) => {

    let textLeftTop = "Web-programming";
    let textLeftBottom = "Lab # 4"
    let textRightTop = "Poloshkov Boris. P3213";
    let textRightBottom = "Variant # 5637";
    let textMiddle = props.midtext;
    return (
        <div className={classes.main_header}>
            <div className={classes.text}>
                <span>{textLeftTop}</span>
                <br/>
                <span>{textLeftBottom}</span>
            </div>
            <div className={classes.text}>{textMiddle}</div>
            <div className={classes.text}>
                {textRightTop}
                <br/>
                {textRightBottom}
            </div>
        </div>
    );
};

export default LabHeader;