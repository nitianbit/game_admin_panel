import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader } from 'react-bootstrap'
import { doGET, doPUT } from '../../utils/HttpUtil';
import { ENDPOINTS } from './DashboardConstant';
import { AppContext } from '../../services/context/AppContext';

const DashboardBasicInfo = () => {
    const [prevContest, setPrevContest] = useState(null)
    const { success, error } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [editState, setEditState] = useState({
        isModalOpen: false,
        currentWinner: null
    })



    const getPrevContest = async (e) => {
        try {
            const response = await doGET(ENDPOINTS.getAllContest(1, 1, '&status=2'));
            if (response.data?.rows?.length) {
                setPrevContest(response?.data?.rows[0]);
            }
        } catch (error) { }
    };

    const modifyCurrentContestWinner = async () => {
        try {
            setLoading(true)
            await doPUT(ENDPOINTS.modifyCurrentContest, editState?.currentWinner)
            setEditState({
                isModalOpen: false,
                currentWinner: null
            })
            success("Winner Updated Successfully")
        } catch (e) {
            error("Server error")
        } finally {
            setLoading(false)

        }
    }

    useEffect(() => {
        getPrevContest()
    }, [])
    return (
        <>
            <Card>
                <CardHeader>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>Last Contest Stats</div>
                    </div>
                </CardHeader>
                <CardBody>
                    <div>
                        <div>Winning Amount: {prevContest?.winningAmount}</div>
                        <div>Winning Number: {prevContest?.winningNumber}</div>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default DashboardBasicInfo