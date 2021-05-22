import React from 'react';
import './table.css';
import getDpMatrixCells from '../algorithms/dpMatrix';
import getDotMatrixCells from '../algorithms/dotMatrix';
import getDotMatrixWindowCells from '../algorithms/dotMatrixWindow';

export const Table = ({ string1, string2 }) => {
    // const length = string1.length;
    // const cells = getDotMatrixCells(string1, string2);
    const cells = getDotMatrixWindowCells(string1, string2, 9, 3, 4);
    console.log(cells);
    const cellsJSX = [];
    for (let i = 0; i < string1.length + 1; i++) {
        let row;
        if (i === 0) {
            const stringCells = [];
            for (const chr of string2) {
                stringCells.push(<div className="table_cell table_header">{chr}</div>);
            }
            row = [<div className="table_cell table_header">&nbsp;</div>, ...stringCells];
        } else {
            row = [<div className="table_cell table_header">{string1[i - 1]}</div>];
            for (let j = 0; j < string2.length; j++) {
                row.push(
                    // <div className="table_cell">
                    //     {string1[i - 1]}, {string2[j]}, {cells[i - 1][j]}
                    // </div>
                    <div className="table_cell">{cells[i - 1][j]}</div>
                );
            }
        }
        cellsJSX.push(<div className="table_row">{row}</div>);
    }

    return <div className="table_container">{cellsJSX}</div>;
};

export default Table;
