const getNeedlemanMatrixCells = (string1, string2, matchScore, mismatchScore, penalty) => {
    const cells = [];
    console.log(string1);
    console.log(string2);
    for (let i = 0; i < string1.length + 1; i++) {
        const row = [];
        for (let j = 0; j < string2.length + 1; j++) {
            const isMatch = string1[i - 1] === string2[j - 1];
            let newScore;
            if (i === 0 && j === 0) {
                newScore = 0;
            } else if (j !== 0 && i === 0) {
                newScore = row[j - 1] + penalty;
            } else if (i !== 0 && j === 0) {
                newScore = cells[i - 1][j] + penalty;
            } else {
                const prevData = {
                    row: row[j - 1],
                    col: cells[i - 1][j],
                    diagonal: cells[i - 1][j - 1],
                };
                newScore = Math.max(prevData.row + penalty, prevData.col + penalty);
                if (isMatch) {
                    console.log('true', i, string1[i - 1], j, string2[j - 1]);
                    newScore = Math.max(newScore, prevData.diagonal + matchScore);
                } else {
                    console.log('sad', i, string1[i - 1], j, string2[j - 1]);
                    newScore = Math.max(newScore, prevData.diagonal + mismatchScore);
                }
            }

            row.push(newScore);
        }
        cells.push(row);
    }
    return cells;
};

export default getNeedlemanMatrixCells;
