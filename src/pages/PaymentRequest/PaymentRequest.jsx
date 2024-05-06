import React, { useEffect, useState } from 'react'
import { PaymentRequestTable } from '../../components'
import { doGET } from '../../utils/HttpUtil';
import { ENDPOINTS } from './PaymentRequestConstant';

const PaymentRequest = () => {

    const [paymentRequest, setPaymentRequest] = useState([])

    const getAllPayouts = async () => {
        try {
            const response = await doGET(ENDPOINTS.allPayouts);
            setPaymentRequest(response?.data)
        } catch (error) { }
    };

    useEffect(() => {
        getAllPayouts()
    }, [])
    return (
        <div className='d-flex w-100'>

            <PaymentRequestTable tableData={paymentRequest} getAllPayouts={getAllPayouts} />
        </div>
    )
}


export default PaymentRequest