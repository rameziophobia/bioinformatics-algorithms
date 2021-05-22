import logo from './logo.svg';
import './App.css';
import Table from './components/Table';
import Inputs from './components/Inputs';
import { useState } from 'react';

function App() {
    const [stringState1, setString1] = useState('');
    const [stringState2, setString2] = useState('');

    const handleInputsChange = (string1, string2) => {
        setString1(string1);
        setString2(string2);
    };
    return (
        <div className="App">
            <Inputs handleInputsChange={handleInputsChange}></Inputs>
            <Table string1={stringState1} string2={stringState2} algorithm="abd"></Table>
        </div>
    );
}

export default App;
