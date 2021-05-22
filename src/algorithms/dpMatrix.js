const getDpMatrixCells = (string1, string2) => {
    const cells = [];
    for (let i = 0; i < string1.length; i++) {
        const row = [];
        for (let j = 0; j < string2.length; j++) {
            const isMatch = string1[i] === string2[j];
            const prevData = {
                row: 0,
                col: 0,
                diagonal: 0,
            };
            if (j !== 0) {
                prevData.row = row[j - 1];
            }
            if (i !== 0) {
                prevData.col = cells[i - 1][j];
            }

            if (j !== 0 && i !== 0) {
                prevData.diagonal = cells[i - 1][j - 1];
            }

            row.push(isMatch + Math.max(prevData.row, prevData.col, prevData.diagonal));
        }
        cells.push(row);
    }
    return cells;
};

export default getDpMatrixCells;
