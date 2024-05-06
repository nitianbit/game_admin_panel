import React, { useEffect, useState } from 'react'
import { ContestNumber } from '../../pages/Dashboard/DashboardConstant'

const EditContestWinner = ({ userData, setUserData }) => {

    const updateData = (key, value) => setUserData({ [key]: value })

    return (
        <div>
            <div className="mb-3">
                <label className='mb-1'>Modify Winner</label>
                <select class="form-select"
                    value={userData?.winningNumber}
                    onChange={(e) => {
                        updateData("winningNumber", e.target.value)
                    }}
                >
                    <option selected>Open this select menu</option>
                    {ContestNumber?.map((item, index) => {
                        return <option value={item}>{item}</option>
                    })}
                </select>
            </div>
        </div>
    )
}

export default EditContestWinner