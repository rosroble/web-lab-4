import React, {useEffect, useRef} from 'react';
import {pointAPI} from "../../api/PointService";
import {IPoint} from "../../models/IPoint";

const Graph = (props: any) => {

    const canvas = useRef(null);
    const {data: points} = pointAPI.useFetchNewRadiusPointsQuery(props.radius);
    const [submitPoint, {}] = pointAPI.useSubmitNewPointMutation();



    const handleClick = async (event: any) => {
        let point = normalizePoint(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        await submitPoint(point as unknown as IPoint);
    }

    function normalizePoint(x: number, y: number) {
        const gapPx = 300 / 11;
        let xVal = ((x - 150) / gapPx);
        let yVal = ((y - 150) / -gapPx);

        return {
            x: xVal.toFixed(2),
            y: yVal.toFixed(2),
            r: props.radius,
        }
    }

    function drawPointByRelativeCoordinates(relX: number, relY: number, hit: boolean) {
        const gapPx = 300 / 11;
        let absoluteX = 150 + relX * gapPx;
        let absoluteY = 150 - relY * gapPx;
        drawPoint(absoluteX, absoluteY, hit);
    }

    function drawCanvas(canvas: any) {
        const ctx = canvas.getContext('2d');
        let canvasWidth = canvas.clientWidth;
        let canvasHeight = canvas.clientHeight;
        let labels = ["5", "4", "3", "2", "1", " ", "-1", "-2", "-3", "-4", "-5"];
        let xAxis = canvasWidth / 2;
        let yAxis = canvasHeight / 2;
        let xLabel = canvasWidth / 6;
        let yLabel = canvasHeight / 6;
        let offsetAxis = 7;
        let gapBetweenNotchesY = (canvasHeight) / (labels.length);
        let gapBetweenNotchesX = (canvasWidth) / (labels.length);


        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = "#000000";
        ctx.globalAlpha = 1;
        drawAxes();
        designAxisX();
        designAxisY();

        function drawAxes() {
            ctx.beginPath();
            ctx.fillStyle = "#000000";
            ctx.strokeStyle = "#000000";
            ctx.moveTo(xAxis, 0);
            ctx.lineTo(xAxis, canvasHeight);
            ctx.moveTo(0, yAxis);
            ctx.lineTo(canvasWidth, yAxis);
            ctx.stroke();
            ctx.closePath();
        }

        function designAxisY() {
            ctx.moveTo(0, yAxis);
            ctx.font = "15px Arial";
            ctx.fillText("y", xAxis - 2 * offsetAxis, offsetAxis * 2);
            ctx.moveTo(xAxis - offsetAxis / 2, offsetAxis);
            ctx.lineTo(xAxis, 0);
            ctx.moveTo(xAxis + offsetAxis / 2, offsetAxis);
            ctx.lineTo(xAxis, 0);
            ctx.stroke();
            for (let i = 0; i < labels.length; i++) {
                ctx.moveTo(xAxis - offsetAxis / 2, 2 * offsetAxis + gapBetweenNotchesY * i);
                ctx.lineTo(xAxis + offsetAxis / 2, 2 * offsetAxis + gapBetweenNotchesY * i);
                ctx.fillText(labels[i], xAxis + offsetAxis, 2 * offsetAxis + gapBetweenNotchesY * i);
                ctx.stroke();
            }
        }

        function designAxisX() {
            ctx.font = "15px Arial";
            ctx.moveTo(2 * xAxis - offsetAxis, yAxis - offsetAxis / 2);
            ctx.lineTo(2 * xAxis, yAxis);
            ctx.moveTo(2 * xAxis - offsetAxis, yAxis + offsetAxis / 2);
            ctx.lineTo(2 * xAxis, yAxis);
            ctx.fillText("x", 2 * xAxis - offsetAxis, yAxis + offsetAxis * 2);
            ctx.stroke();

            for (let i = 0; i < labels.length; i++) {
                ctx.moveTo(2 * xAxis - 2 * offsetAxis - gapBetweenNotchesX * i, yAxis - offsetAxis);
                ctx.lineTo(2 * xAxis - 2 * offsetAxis - gapBetweenNotchesX * i, yAxis + offsetAxis);
                ctx.fillText(labels[i], 2 * xAxis - 2 * offsetAxis - gapBetweenNotchesX * i, yAxis - 2 * offsetAxis);
                ctx.stroke();
            }

        }

        function drawShapes(r: number) {
            const ctx = canvas.getContext("2d");
            ctx.globalAlpha = 0.4;
            drawRectangle();
            drawCircle();
            drawTriangle();

            function drawCircle() {
                ctx.moveTo(xAxis, yAxis);
                ctx.fillStyle = "#15ecec";
                ctx.arc(xAxis, yAxis, gapBetweenNotchesX * r, 0, Math.PI * 0.5);
                ctx.fill();
                ctx.closePath();
            }

            function drawRectangle() {
                ctx.fillStyle = "#993132"
                ctx.fillRect(xAxis, yAxis, gapBetweenNotchesX * r / 2, -gapBetweenNotchesY * r);
                ctx.stroke();
            }

            function drawTriangle() {
                ctx.fillStyle = "#327313"
                ctx.moveTo(xAxis, yAxis);
                ctx.lineTo(xAxis, yAxis - gapBetweenNotchesY * r / 2);
                ctx.lineTo(xAxis - gapBetweenNotchesX * r, yAxis);
                ctx.fill();
                ctx.stroke();
            }
        }

        return drawShapes;
    }

    function drawPoint(x: Number, y: Number, hit: boolean) {
        let ctxAxes = canvas.current.getContext('2d');
        ctxAxes.globalAlpha = 1;
        ctxAxes.save();
        ctxAxes.setLineDash([2, 2]);
        ctxAxes.beginPath();
        ctxAxes.moveTo(x, canvas.current.clientWidth / 2);
        ctxAxes.lineTo(x, y);
        ctxAxes.moveTo(canvas.current.clientWidth / 2, y);
        ctxAxes.lineTo(x, y);
        ctxAxes.stroke();
        ctxAxes.fillStyle = hit ? 'green' : 'red';
        ctxAxes.arc(x, y, 2, 0, 2 * Math.PI);
        ctxAxes.fill();
        ctxAxes.restore();
    }

    function redrawPoints() {
        console.log(points);
        points && points.map(point => drawPointByRelativeCoordinates(point.x, point.y, point.hit));
    }

    useEffect(() => {
        drawCanvas(canvas.current)(props.radius);
        redrawPoints();
    })
    return (
        <canvas ref={canvas} width={300} height={300} id={props.id} onClick={event => handleClick(event)}>

        </canvas>
    );
};

export default Graph;