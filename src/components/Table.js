import React from 'react';
import './table.css';
import getDpMatrixCells from '../algorithms/dpMatrix';
import getDotMatrixCells from '../algorithms/dotMatrix';
import getDotMatrixWindowCells from '../algorithms/dotMatrixWindow';
import getNeedlemanMatrixCells from '../algorithms/needleman';

export const Table = ({ string1, string2 }) => {
    // const length = string1.length;
    // const cells = getDotMatrixCells(string1, string2);
    // const cells = getDotMatrixWindowCells(string1, string2, 9, 3, 4);
    const cells = getNeedlemanMatrixCells(string1, string2, 7, -3, -2);
    console.log(cells);

    const string_1 = 'j' + string1;
    const string_2 = 'i' + string2;

    const cellsJSX = [];
    for (let i = 0; i < cells.length + 1; i++) {
        let row;
        if (i === 0) {
            const stringCells = [];
            for (const chr of string_2) {
                stringCells.push(<div className="table_cell table_header">{chr}</div>);
            }
            row = [<div className="table_cell table_header">&nbsp;</div>, ...stringCells];
        } else {
            row = [<div className="table_cell table_header">{string_1[i - 1]}</div>];
            for (let j = 0; j < cells[0].length; j++) {
                row.push(
                    // <div className="table_cell">
                    //     {string1[i - 1]}, {string_2[j]}, {cells[i - 1][j]}
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
