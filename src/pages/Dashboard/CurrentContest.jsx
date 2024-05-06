import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader } from 'react-bootstrap'
import { doGET, doPUT } from '../../utils/HttpUtil';
import { ENDPOINTS } from './DashboardConstant';
import Timer from '../../components/Timer/Timer';
import { MdEdit } from 'react-icons/md';
import Modal from '../../components/Modal/Modal';
import EditContestWinner from '../../components/Modal/EditContestWinner';
import { AppContext } from '../../services/context/AppContext';

const CurrentContest = () => {
    const [currentContest, setCurrentContest] = useState(null)

    const { success, error } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [editState, setEditState] = useState({
        isModalOpen: false,
        currentWinner: null
    })

    const updateData = (updatedObj) => setEditState(prev => ({
        ...prev,
        currentWinner: {
            ...prev.currentWinner,
            ...updatedObj
        }
    }))

    const openModal = () => {
        setEditState(prev => ({
            ...prev,
            isModalOpen: true,
        }));
    };

    const closeEditModal = () => {
        setEditState(prev => ({
            ...prev,
            isModalOpen: false,
            currentWinner: null
        }));
    };


    const getCurrentContest = async (e) => {
        try {
            const response = await doGET(ENDPOINTS.currentContest);
            setCurrentContest(response?.data)
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
        getCurrentContest()
    }, [])
    return (
        <>
            <Card>
                <CardHeader>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div> Current Contest</div>
                        <div className='d-flex align-items-center'>
                            <MdEdit onClick={() => {
                                openModal()
                            }} className="me-3 cursor-pointer" />
                            <Timer startTime={currentContest?.contest?.startTime} />
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <div>
                        <div>
                            Bets
                        </div>

                        <div className='d-flex'>
                            <div className='dot'>1</div>
                            <div className='dot'>2</div>
                            <div className='dot'>3</div>
                            <div className='dot'>4</div>
                            <div className='dot'>5</div>
                            <div className='dot'>6</div>
                            <div className='dot'>7</div>
                            <div className='dot'>8</div>
                            <div className='dot'>9</div>
                            <div className='dot'>10</div>
                        </div>
                    </div>

                    <div>
                        <div>
                            No of Bets
                        </div>

                        <div className='d-flex w-100'>
                            {currentContest?.betSummary ?
                                Object.keys(currentContest?.betSummary)?.map((key) => (
                                    <div key={key} className='dot'>{currentContest?.betSummary?.[key]?.totalCount}</div>
                                ))
                                : null
                            }
                        </div>
                    </div>
                    <div>
                        <div>
                            Amount
                        </div>

                        <div className='d-flex'>
                            <div className='d-flex'>
                                {currentContest?.betSummary ?
                                    Object.keys(currentContest?.betSummary)?.map((key) => (
                                        <div key={key} className='dot'>{currentContest?.betSummary?.[key]?.totalAmount}</div>
                                    ))
                                    : null
                                }

                            </div>
                        </div>
                    </div>


                </CardBody>
            </Card>
            {editState?.isModalOpen &&
                <Modal
                    header="Modify Winner"
                    onSave={modifyCurrentContestWinner}
                    content={
                        <EditContestWinner
                            userData={editState?.currentWinner}
                            setUserData={updateData}
                        />}
                    isOpen={editState?.isModalOpen}
                    onClose={closeEditModal} />}
        </>
    )
}

export default CurrentContest