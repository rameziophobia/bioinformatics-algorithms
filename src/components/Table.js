import React from 'react';
import './table.css';

export const Table = ({ string1, string2 }) => {
    // const length = string1.length;
    const cells = [];
    for (let i = 0; i < string1.length; i++) {
        const row = [];
        for (let j = 0; j < string2.length; j++) {
            row.push(
                <div className="table_cell">
                    {string1[i]}, {string2[j]}
                </div>
            );
        }
        cells.push(<div className="table_row">{row}</div>);
    }

    return <div className="table_container">{cells}</div>;
};

export default Table;
