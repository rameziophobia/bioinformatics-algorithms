import logo from './logo.svg';
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

    const handleSelectChanged = (string1, string2, newAlgorithm, extraDetails) => {
        switch (newAlgorithm) {
            case 'waterman':
                setHasPadding(true);
                setCells(getWatermanMatrixCells(string1, string2, 5, -2, -6));
                break;

            case 'dotMatrix':
                setHasPadding(false);
                setCells(getDotMatrixCells(string1, string2));

                break;
            case 'dotMatrixWindow':
                setHasPadding(false);
                setCells(getDotMatrixWindowCells(string1, string2, 9, 3, 4));
                break;
            case 'dp':
                setHasPadding(false);
                setCells(getDpMatrixCells(string1, string2));
                break;
            case 'needleman':
            default:
                setHasPadding(true);
                setCells(getNeedlemanMatrixCells(string1, string2, 7, -3, -2));
                break;
        }
    };

    const handleInputsChange = (string1, string2, newAlgorithm, extraDetails) => {
        setString1(string1);
        setString2(string2);
        handleSelectChanged(string1, string2, newAlgorithm, extraDetails);
    };

    return (
        <div className="App">
            <Inputs handleInputsChange={handleInputsChange}></Inputs>
            <Table
                string1={stringState1}
                string2={stringState2}
                cells={cells}
                hasPadding={hasPadding}></Table>
        </div>
    );
}

export default App;
