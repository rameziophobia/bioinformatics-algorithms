import React, { useEffect, useRef, useState } from 'react';
import './table.css';

export const Table = ({ string1, string2, cells, hasPadding, isWindow }) => {
    console.log(cells);

    const modified_string1 = hasPadding ? 'i' + string1 : string1;
    const modified_string2 = hasPadding ? 'j' + string2 : string2;
    const [maxIters, setMaxIters] = useState(modified_string1.length * modified_string2.length - 1);
    const [stopIter, setStopIter] = useState(0);

    useEffect(() => {
        let numCircles = 0;
        for (const row in cells) {
            for (const cell in row) {
                if (cell !== ' ') {
                    numCircles++;
                }
            }
        }

        let newMaxIter;
        if (isWindow) {
            newMaxIter = numCircles;
        } else {
            newMaxIter = modified_string1.length * modified_string2.length - 1;
        }

        console.log(stopIter);
        setMaxIters(newMaxIter);
        setStopIter(Math.min(newMaxIter, stopIter));
    }, [cells, isWindow, stopIter]);

    let currentIter = 0;
    const cellsJSX = [];

    // todo: animation
    // const timerRef = useRef();
    // useEffect(() => {
    //     clearTimeout(timerRef.current);
    //     setStopIter(0);
    // }, [cells]);

    // useEffect(() => {
    //     timerRef.current = setTimeout(() => {
    //         setStopIter(() => Math.min(stopIter + 1, maxIters));
    //     }, 1000);
    // }, [stopIter, maxIters]);

    for (let i = 0; i < cells.length + 1; i++) {
        let row;
        if (i === 0) {
            const stringCells = [];
            for (const chr of modified_string2) {
                stringCells.push(<div className="table_cell table_header">{chr}</div>);
            }
            row = [<div className="table_cell table_header">&nbsp;</div>, ...stringCells];
        } else {
            row = [<div className="table_cell table_header">{modified_string1[i - 1]}</div>];
            for (let j = 0; j < cells[0].length; j++) {
                if (cells[i - 1][j] === ' ' && isWindow) {
                    currentIter--;
                }
                row.push(
                    <div className="table_cell">
                        {currentIter <= stopIter ? cells[i - 1][j] : ' '}
                    </div>
                );
                currentIter++;
            }
        }
        cellsJSX.push(<div className="table_row">{row}</div>);
    }

    return (
        <>
            <div className="table_container">
                <div className="horizontal_flex">
                    <div className="table_nav_buttons" onClick={() => setStopIter(0)}>
                        Start
                    </div>
                    <div
                        className="table_nav_buttons"
                        onClick={() => setStopIter(Math.max(stopIter - 1, 0))}>
                        Previous
                    </div>
                    <div
                        className="table_nav_buttons"
                        onClick={() => setStopIter(Math.min(stopIter + 1, maxIters))}>
                        Next
                    </div>
                    <div className="table_nav_buttons" onClick={() => setStopIter(maxIters)}>
                        End
                    </div>
                </div>
                {cellsJSX}
            </div>
        </>
    );
};

export default Table;
