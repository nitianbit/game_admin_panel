import React from 'react'
import Switch from '../Toggle/Toggle'

const EditPayoutContent = ({ payoutData, setPayoutData }) => {

    const updateData = (key, value) => setPayoutData({ [key]: value })

    return (
        <div>
            <div className="mb-3">
                <label className='mb-1'>Amount</label>
                <input
                    type="text"
                    className="form-control"
                    value={payoutData?.amount ?? ""}
                    onChange={(e) => {
                        updateData("amount", e.target.value)
                    }}
                    placeholder="Enter Amount" />
            </div>
            <div className="mb-3">
                <label className='mb-1'>Status</label>
                <Switch isDisabled={payoutData?.status == 1 ? true : false} onChange={updateData} name="status" />
            </div>
        </div>
    )
}

export default EditPayoutContent