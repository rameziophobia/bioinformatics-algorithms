import './algorithms.css';
const getDotMatrixCells = (string1, string2) => {
    const cells = [];
    for (let i = 0; i < string1.length; i++) {
        const row = [];
        for (let j = 0; j < string2.length; j++) {
            const isMatch = string1[i] === string2[j];
            if (isMatch) {
                row.push(<div className="dot_font">·</div>);
            } else {
                row.push(' ');
            }
        }
        cells.push(row);
    }
    return cells;
};

export default getDotMatrixCells;
