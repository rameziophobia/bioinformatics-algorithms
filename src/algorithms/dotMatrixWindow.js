import './algorithms.css';
const getDotMatrixWindowCells = (string1, string2, windowSize, step, threshold) => {
    const cells = [];
    for (let i = 0; i < string1.length; i++) {
        const row = [];
        for (let j = 0; j < string2.length; j++) {
            row.push({ score: ' ' });
        }
        cells.push(row);
    }

    const halfWindowSize = (windowSize - 1) / 2;

    for (let i = 0; i + windowSize - 1 < string1.length; i += step) {
        for (let j = 0; j + windowSize - 1 < string2.length; j += step) {
            let numMatches = 0;
            for (let windowIndex = 0; windowIndex < windowSize; windowIndex++) {
                if (string1[i + windowIndex] === string2[j + windowIndex]) {
                    numMatches++;
                }
            }

            const isMatch = numMatches >= threshold;
            if (isMatch) {
                const matchIndexI = i + halfWindowSize;
                const matchIndexJ = j + halfWindowSize;
                cells[matchIndexI][matchIndexJ] = { score: <div className="dot_font">·</div> };
            }
        }
    }

    return { cells: cells };
};

export default getDotMatrixWindowCells;
