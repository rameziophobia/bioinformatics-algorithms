import React, { useState } from 'react';
import './inputs.css';

export const Inputs = ({ handleInputsChange }) => {
    const [string1, setString1] = useState('TTCATA');
    const [string2, setString2] = useState('TGCTCGTA');
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('needleman');
    const [matchScore, setMatchScore] = useState(2);
    const [mismatchScore, setMismatchScore] = useState(-1);
    const [penalty, setPenalty] = useState(-1);
    const [windowSize, setWindowSize] = useState(9);
    const [stepSize, setStepSize] = useState(3);
    const [threshold, setThreshold] = useState(4);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleInputsChange(string1, string2, selectedAlgorithm, {
            matchScore: matchScore,
            mismatchScore: mismatchScore,
            penalty: penalty,
            windowSize: windowSize,
            stepSize: stepSize,
            threshold: threshold,
        });
    };

    const getInputJSX = (label, value, setFunction) => {
        return (
            <div className="input_label">
                <label className="input_label">
                    {label}: &nbsp;
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                            if (isNaN(parseInt(e.target.value))) {
                                setFunction(e.target.value);
                            } else {
                                setFunction(parseInt(e.target.value));
                            }
                        }}
                    />
                </label>
            </div>
        );
    };

    let extraOptionsJSX;
    if (selectedAlgorithm === 'needleman' || selectedAlgorithm === 'waterman') {
        extraOptionsJSX = (
            <>
                {getInputJSX('Match score', matchScore, setMatchScore)}
                {getInputJSX('Mismatch score', mismatchScore, setMismatchScore)}
                {getInputJSX('Gap penalty', penalty, setPenalty)}
            </>
        );
    } else if (selectedAlgorithm === 'dotMatrixWindow') {
        extraOptionsJSX = (
            <>
                {getInputJSX('Window size', windowSize, setWindowSize)}
                {getInputJSX('step size', stepSize, setStepSize)}
                {getInputJSX('threshold', threshold, setThreshold)}
            </>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="form_container">
            <div className="input_label">
                <label>Sequence 1: &nbsp;</label>
                <input
                    className="float_right"
                    type="text"
                    value={string1}
                    onChange={(e) => setString1(e.target.value.toUpperCase())}
                />
            </div>
            <div className="input_label">
                <label className="input_label">
                    Sequence 2: &nbsp;
                    <input
                        className="float_right"
                        type="text"
                        value={string2}
                        onChange={(e) => setString2(e.target.value.toUpperCase())}
                    />
                </label>
            </div>
            <div className="input_label">
                <label>
                    Select algorithm: &nbsp;
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
            {extraOptionsJSX}
            <input type="submit" value="GO" className="start_button" />
        </form>
    );
};

export default Inputs;
