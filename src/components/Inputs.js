import React, { useState } from 'react';
import './inputs.css';

export const Inputs = ({ handleInputsChange }) => {
    const [string1, setString1] = useState('');
    const [string2, setString2] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        handleInputsChange(string1, string2);
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
            <input type="submit" value="Submit" className="start_button" />
        </form>
    );
};

export default Inputs;
