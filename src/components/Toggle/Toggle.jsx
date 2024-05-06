import React from 'react';
import './style.css'

const Switch = ({ isDisabled, onChange, name }) => {

    const toggleSwitch = () => {
        onChange(name, !isDisabled)
    };

    return (
        <div className="container">
            <label className="switch" htmlFor="checkbox">
                <input
                    type="checkbox"
                    id="checkbox"
                    checked={isDisabled}
                    onChange={toggleSwitch}
                />
                <div className="slider round"></div>
            </label>
        </div>
    );
};

export default Switch;
