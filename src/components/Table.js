import React, { useEffect, useRef, useState } from 'react';
import './table.css';

export const Table = ({ string1, string2, cells, hasPadding, isWindow }) => {
    console.log('cells', cells.cells);
    const { alignments = [] } = cells;
    console.log(alignments);

    const modified_string1 = hasPadding ? 'i' + string1 : string1;
    const modified_string2 = hasPadding ? 'j' + string2 : string2;
    const [maxIters, setMaxIters] = useState(modified_string1.length * modified_string2.length - 1);
    const [stopIter, setStopIter] = useState(0);

    useEffect(() => {
        let numCircles = 0;
        for (const row in cells.cells) {
            for (const cell in row) {
                if (cell.score !== ' ') {
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
    }, [cells.cells, isWindow, stopIter]);

    let currentIter = 0;
    const cellsJSX = [];

    for (let i = 0; i < cells.cells.length + 1; i++) {
        let row;
        if (i === 0) {
            const stringCells = [];
            for (const chr of modified_string2) {
                stringCells.push(<div className="table_cell table_header">{chr}</div>);
            }
            row = [<div className="table_cell table_header">&nbsp;</div>, ...stringCells];
        } else {
            row = [<div className="table_cell table_header">{modified_string1[i - 1]}</div>];
            for (let j = 0; j < cells.cells[0].length; j++) {
                if (cells.cells[i - 1][j].score === ' ' && isWindow) {
                    currentIter--;
                }
                row.push(
                    <div className="table_cell">
                        {currentIter <= stopIter ? cells.cells[i - 1][j].score : ' '}
                    </div>
                );
                currentIter++;
            }
        }
        cellsJSX.push(<div className="table_row">{row}</div>);
    }

    let alignmentsJSX;
    if (alignments.length !== 0) {
        const alignmentsList = [];
        for (const alignment of alignments) {
            alignmentsList.push(
                <div className="alignment_results" key={alignment[0]}>
                    {alignment[0]}
                </div>
            );
            alignmentsList.push(
                <div className="alignment_results" key={alignment[1]}>
                    {alignment[1]}
                </div>
            );
            alignmentsList.push(
                <div key={alignment[0] + alignment[1] + 'score'}>score: {alignment[2]}</div>
            );
            alignmentsList.push(
                <div key={alignment[0] + alignment[1]} className="separator"></div>
            );
        }
        alignmentsList.pop();
        alignmentsJSX = (
            <div className="alignments_container">
                <div className="alignments_title">Alignments matched</div>
                {alignmentsList}
            </div>
        );
    }

    return (
        <>
            {console.log('in table render')}
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
                {alignmentsJSX}
            </div>
        </>
    );
};

export default Table;
