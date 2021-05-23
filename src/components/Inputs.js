import React, { useState } from 'react';
import './inputs.css';

export const Inputs = ({ handleInputsChange }) => {
    const [string1, setString1] = useState('ATT');
    const [string2, setString2] = useState('ATG');
    const [selectedAlgorithm, setSelectedAlgorithm] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        handleInputsChange(string1, string2, selectedAlgorithm, []);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input_label">
                <label>
                    Sequence 1: &nbsp;
                    <input
                        type="text"
                        value={string1}
                        onChange={(e) => setString1(e.target.value.toUpperCase())}
                    />
                </label>
            </div>
            <div className="input_label">
                <label className="input_label">
                    Sequence 2: &nbsp;
                    <input
                        type="text"
                        value={string2}
                        onChange={(e) => setString2(e.target.value.toUpperCase())}
                    />
                </label>
            </div>
            <div className="input_label">
                <label>
                    Select algorithm
                    <select
                        value={selectedAlgorithm}
                        onChange={(e) => setSelectedAlgorithm(e.target.value)}>
                        <option value="needleman">Needleman Wunsch</option>
                        <option value="waterman">Smith &amp; Waterman</option>
                        <option value="dotMatrix">Dot plot Matrix</option>
                        <option value="dotMatrixWindow">Dot plot Matrix with window</option>
                        <option value="dp">Maximum Score Matrix</option>
                    </select>
                </label>
            </div>
            <input type="submit" value="Go" className="start_button" />
        </form>
    );
};

export default Inputs;
