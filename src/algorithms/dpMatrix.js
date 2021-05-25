const getDpMatrixCells = (string1, string2) => {
    const cells = [];
    for (let i = 0; i < string1.length; i++) {
        const row = [];
        for (let j = 0; j < string2.length; j++) {
            const isMatch = string1[i] === string2[j];
            if (i === 0 || j === 0) {
                row.push({ score: isMatch ? 1 : 0 });
                continue;
            }

            const prevData = {
                row: 0,
                col: 0,
                diagonal: 0,
            };
            if (j !== 0) {
                prevData.row = row[j - 1].score;
            }
            if (i !== 0) {
                prevData.col = cells[i - 1][j].score;
            }
            if (j !== 0 && i !== 0) {
                prevData.diagonal = cells[i - 1][j - 1].score;
            }

            row.push({ score: isMatch + Math.max(prevData.row, prevData.col, prevData.diagonal) });
        }
        cells.push(row);
    }
    return { cells: cells };
};

export default getDpMatrixCells;
