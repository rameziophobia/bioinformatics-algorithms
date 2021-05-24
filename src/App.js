import './App.css';
import Table from './components/Table';
import Inputs from './components/Inputs';
import { useState } from 'react';
import getDpMatrixCells from './algorithms/dpMatrix';
import getDotMatrixCells from './algorithms/dotMatrix';
import getDotMatrixWindowCells from './algorithms/dotMatrixWindow';
import getNeedlemanMatrixCells from './algorithms/needleman';
import getWatermanMatrixCells from './algorithms/waterman';

function App() {
    const [stringState1, setString1] = useState('');
    const [stringState2, setString2] = useState('');
    const [cells, setCells] = useState([]);
    const [hasPadding, setHasPadding] = useState(true);
    const [isWindow, setIsWindow] = useState(false);

    const handleSelectChanged = (string1, string2, newAlgorithm, extraDetails) => {
        const {
            matchScore = 0,
            mismatchScore = 0,
            penalty = 0,
            windowSize = 0,
            stepSize = 0,
            threshold = 0,
        } = extraDetails;
        setIsWindow(false);
        switch (newAlgorithm) {
            case 'waterman':
                setHasPadding(true);
                setCells(
                    getWatermanMatrixCells(string1, string2, matchScore, mismatchScore, penalty)
                );
                break;

            case 'dotMatrix':
                setHasPadding(false);
                setCells(getDotMatrixCells(string1, string2));

                break;
            case 'dotMatrixWindow':
                if (windowSize % stepSize !== 0) {
                    // alert('window size should be divisible by the step size');
                    // return true;
                } else if (windowSize % 2 === 0) {
                    alert('window size should be odd');
                    return true;
                }
                setHasPadding(false);
                setCells(
                    getDotMatrixWindowCells(string1, string2, windowSize, stepSize, threshold)
                );
                setIsWindow(true);
                break;
            case 'dp':
                setHasPadding(false);
                setCells(getDpMatrixCells(string1, string2));
                break;
            case 'needleman':
            default:
                setHasPadding(true);
                setCells(
                    getNeedlemanMatrixCells(string1, string2, matchScore, mismatchScore, penalty)
                );
                break;
        }
        return false;
    };

    const handleInputsChange = (string1, string2, newAlgorithm, extraDetails) => {
        const hasError = handleSelectChanged(string1, string2, newAlgorithm, extraDetails);
        if (!hasError) {
            setString1(string1);
            setString2(string2);
        }
    };

    return (
        <div className="App" style={{ backgroundImage: 'url(/dna_background.jpg)' }}>
            <Inputs handleInputsChange={handleInputsChange}></Inputs>
            <Table
                string1={stringState1}
                string2={stringState2}
                cells={cells}
                hasPadding={hasPadding}
                isWindow={isWindow}></Table>
        </div>
    );
}

export default App;
