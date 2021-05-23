import React from 'react';
import './table.css';

export const Table = ({ string1, string2, cells, hasPadding }) => {
    console.log(cells);

    const modified_string1 = hasPadding ? 'i' + string1 : string1;
    const modified_string2 = hasPadding ? 'j' + string2 : string2;

    const cellsJSX = [];
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
                row.push(<div className="table_cell">{cells[i - 1][j]}</div>);
            }
        }
        cellsJSX.push(<div className="table_row">{row}</div>);
    }

    return <div className="table_container">{cellsJSX}</div>;
};

export default Table;
