const findAlignmentPaths = (maxScoreCells) => {
    const paths = [];
    let currentPathIndex = 0;
    for (const cell of maxScoreCells) {
        paths.push([cell]);
    }
    while (!allPathsFinished(paths)) {
        const currentPath = paths[currentPathIndex];
        const node = currentPath[currentPath.length - 1];
        if (node.parents.length === 0) {
            currentPathIndex = (currentPathIndex + 1) % paths.length;
        } else if (node.parents.length === 1) {
            paths[currentPathIndex].push(node.parents[0]);
        } else {
            for (let i = 0; i < node.parents.length; i++) {
                const newPath = [...paths[currentPathIndex]];
                newPath.push(node.parents[i]);
                paths.push(newPath);
            }
            paths.splice(currentPathIndex, 1);
        }
    }
    return paths;
};

const findAlignments = (paths, string1, string2) => {
    const alignments = [];
    for (const reveresedPath of paths) {
        const path = reveresedPath.reverse();
        let alignedString1 = '';
        let alignedString2 = '';
        let string1Index = 0;
        let string2Index = 0;
        for (let i = 0; i < path.length - 1; i++) {
            const node = path[i];
            const nextNode = path[i + 1];
            if (node.rowIndex === nextNode.rowIndex) {
                alignedString1 = alignedString1 + '_';
                alignedString2 = alignedString2 + string2[string2Index];
                string2Index++;
            } else if (node.colIndex === nextNode.colIndex) {
                alignedString1 = alignedString1 + string1[string1Index];
                string1Index++;
                alignedString2 = alignedString2 + '_';
            } else {
                alignedString1 = alignedString1 + string1[string1Index];
                alignedString2 = alignedString2 + string2[string2Index];
                string1Index++;
                string2Index++;
            }
        }
        console.log(path);
        console.log([alignedString1, alignedString2]);
        alignments.push([alignedString1, alignedString2]);
        return alignments;
    }
    return alignments;
};

const findTableCellsAndMaxScoreCells = (string1, string2, matchScore, mismatchScore, penalty) => {
    console.log('penalty', penalty);
    const cells = [];
    const maxScoreCells = [];
    let maxScore = 0;
    for (let i = 0; i < string1.length + 1; i++) {
        const row = [];
        for (let j = 0; j < string2.length + 1; j++) {
            const isMatch = string1[i] === string2[j];
            let newScore;
            const parents = [];
            if (i === 0 && j === 0) {
                newScore = 0;
            } else if (j !== 0 && i === 0) {
                newScore = 0;
            } else if (i !== 0 && j === 0) {
                newScore = 0;
            } else {
                const prevData = {
                    row: row[j - 1].score,
                    col: cells[i - 1][j].score,
                    diagonal: cells[i - 1][j - 1].score,
                };
                const rowParentScore = prevData.row + penalty;
                const colParentScore = prevData.col + penalty;
                newScore = Math.max(rowParentScore, colParentScore);
                let diagParentScore;
                if (isMatch) {
                    diagParentScore = prevData.diagonal + matchScore;
                } else {
                    diagParentScore = prevData.diagonal + matchScore + mismatchScore;
                }
                newScore = Math.max(newScore, diagParentScore);

                if (newScore === rowParentScore) {
                    parents.push(row[j - 1]);
                }
                if (newScore === colParentScore) {
                    parents.push(cells[i - 1][j]);
                }
                if (newScore === diagParentScore) {
                    parents.push(cells[i - 1][j - 1]);
                }
            }

            if (newScore <= 0) {
                newScore = 0;
                parents.length = 0; // clears the array
            }

            const newCell = { score: newScore, parents: parents, rowIndex: i, colIndex: j };
            if (newScore === maxScore) {
                maxScoreCells.push(newCell);
            } else if (newScore > maxScore) {
                maxScore = newScore;
                maxScoreCells.length = 0;
                maxScoreCells.push(newCell);
            }
            row.push(newCell);
        }
        cells.push(row);
    }
    return { cells: cells, maxScoreCells: maxScoreCells };
};

const allPathsFinished = (paths) => {
    let allFinished = true;
    for (const path of paths) {
        if (path[path.length - 1].parents.length !== 0) {
            allFinished = false;
        }
    }
    return allFinished;
};

const getWatermanMatrixCells = (string1, string2, matchScore, mismatchScore, penalty) => {
    const { cells, maxScoreCells } = findTableCellsAndMaxScoreCells(
        string1,
        string2,
        matchScore,
        mismatchScore,
        penalty
    );
    console.log('cells', cells);
    const paths = findAlignmentPaths(maxScoreCells);
    const alignments = findAlignments(paths, string1, string2);

    return { cells: cells, alignments: alignments };
};

export default getWatermanMatrixCells;
