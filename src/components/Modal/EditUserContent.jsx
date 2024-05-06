import React, { useEffect, useState } from 'react'
import Switch from '../Toggle/Toggle'

const EditUserContent = ({ userData, setUserData }) => {

    const updateData = (key, value) => setUserData({ [key]: value })

    return (
        <div>
            <div className="mb-3">
                <label className='mb-1'>Name</label>
                <input
                    type="text"
                    class="form-control"
                    value={userData?.name ?? ""}
                    onChange={(e) => {
                        updateData("name", e.target.value)
                    }}
                    placeholder="Enter Name" />
            </div>
            <div className="mb-3">
                <label className='mb-1'>Phone</label>
                <input
                    type="number"
                    class="form-control"
                    value={userData?.phone ?? ""}
                    onChange={(e) => {
                        updateData("phone", e.target.value)
                    }}
                    placeholder="Enter phone" />
            </div>
            <div className="mb-3">
                <label className='mb-1'>Balance</label>
                <input
                    type="number"
                    class="form-control"
                    value={userData?.balance ?? ""}
                    onChange={(e) => {
                        updateData("balance", e.target.value)
                    }}
                    placeholder="Enter Balance" />
            </div>
            <div className="mb-3">
                <label className='mb-1'>UPI Id</label>
                <input
                    type="text"
                    class="form-control"
                    value={userData?.UPI_ID ?? ""}
                    onChange={(e) => {
                        updateData("UPI_ID", e.target.value)

                    }}
                    placeholder="Enter Upi" />
            </div>
            <div className="mb-3">
                <label className='mb-1'>Disable</label>
                <Switch isDisabled={userData?.disabled} onChange={updateData} name="disabled" />
            </div>
        </div>
    )
}

export default EditUserContent