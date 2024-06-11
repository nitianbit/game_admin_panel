import React, { useState, useEffect } from 'react';
import { FieldTypeConstants } from './Constant';

const EditFieldContent = ({ userData, setUserData }) => {
    const [options, setOptions] = useState(userData?.options || []);

    useEffect(() => {
        // Update userData when options change
        // console.log(userData);
        // setUserData(prevData => ({ ...prevData, options }));
        const updatedData = { ...userData, options }
        setUserData(updatedData);
    }, [options]);

    const updateData = (key, value) => setUserData({ [key]: value })

    const addOptionField = () => {
        setOptions([...options, ""]);
    };

    const updateOption = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const deleteOption = (index) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
    };

    return (
        <div>
            <div className="mb-3">
                <label className="mb-1">Label</label>
                <input
                    type="text"
                    className="form-control"
                    value={userData?.label ?? ""}
                    onChange={(e) => {
                        updateData("label", e.target.value)
                    }}
                    placeholder="Enter Name"
                />
            </div>
            <div className="mb-3">
                <label className="mb-1">Type</label>
                <select
                    className="form-select"
                    value={userData?.type}
                    onChange={(e) => updateData("type", e.target.value)}
                >
                    <option selected disabled>Open this select menu</option>
                    {FieldTypeConstants?.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>
            {userData?.type === "select" && (
                <div className="mb-3">
                    <button type="button" className="btn btn-secondary mb-2" onClick={addOptionField}>Add Option</button>
                    {options.map((option, index) => (
                        <div key={index} className="input-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                value={option}
                                onChange={(e) => updateOption(index, e.target.value)}
                                placeholder="Enter option"
                            />
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => deleteOption(index)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EditFieldContent;
