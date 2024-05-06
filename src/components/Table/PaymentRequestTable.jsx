import React, { useContext, useEffect, useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import { doDELETE, doPOST, doPUT } from '../../utils/HttpUtil';
import Modal from '../Modal/Modal';
import { AppContext } from '../../services/context/AppContext';
import EditPayoutContent from '../Modal/EditPayoutContent';
import { ENDPOINTS } from '../../pages/PaymentRequest/PaymentRequestConstant';

const PaymentRequestTable = ({ tableData, getAllPayouts }) => {

    const { success, error } = useContext(AppContext)

    const [data, setData] = useState(tableData?.rows);
    const [loading, setLoading] = useState(false)
    const [deletePayoutId, setDeletePayoutId] = useState(null)
    const [editState, setEditState] = useState({
        isModalOpen: false,
        selectedPayout: null
    })

    const updateData = (updatedObj) => setEditState(prev => ({
        ...prev,
        selectedPayout: {
            ...prev.selectedPayout,
            ...updatedObj
        }
    }))
    const handleUpdateData = async () => {
        try {
            setLoading(true)
            const updatedData = { ...editState?.selectedPayout, status: editState?.selectedPayout?.status ? 1 : 0 };
            updateData(updatedData)
            await doPUT(ENDPOINTS.updatePayout(editState.selectedPayout?._id), updatedData)
            setEditState({
                isModalOpen: false,
                selectedPayout: null
            })
            getAllPayouts()
            success("Payout Updated Successfully")
        } catch (e) {
            error(e?.message ?? "Server Error")
        } finally {
            setLoading(false)

        }
    }




    const openModal = (selectedPayout) => {
        setEditState(prev => ({
            ...prev,
            isModalOpen: true,
            selectedPayout
        }));
    };


    const closeEditModal = () => {
        setEditState(prev => ({
            ...prev,
            isModalOpen: false,
            selectedPayout: null
        }));
    };

    // const deletePayout = async () => {
    //     try {
    //         setLoading(true)
    //         const response = await doDELETE(ENDPOINTS.deletePayout(deletePayoutId))
    //         setDeletePayoutId(null)
    //         getAllPayouts()
    //         success("Payout deleted Successfully")
    //     } catch (error) {
    //         error("server error")

    //     }
    //     finally {
    //         setLoading(false)
    //     }
    // }

    // const closeDeleteModal = () => {
    //     setDeletePayoutId(null)
    // }

    useEffect(() => {
        setData(tableData?.rows)
    }, [tableData])


    return (
        <>
            <div className="container shadow-sm bg-white p-2">
                <div className="table-wrapper">
                    <table className="table">
                        <thead style={{ fontWeight: 600 }}>
                            <tr>
                                <th className='font-weight-600' scope="col">#</th>
                                <th className='font-weight-600' scope="col">Name</th>
                                <th className='font-weight-600' scope="col">Amount</th>
                                <th className='font-weight-600' scope="col">Status</th>
                                <th className='font-weight-600' scope="col">Upi ID</th>
                                <th className='font-weight-600' scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-grey'>
                            {data?.map((row, index) => (
                                <tr key={row?.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{row.userId?.name}</td>
                                    <td>{row.amount}</td>
                                    <td>{row.status ? "Completed" : "Initiated"}</td>
                                    <td>
                                        {row?.userId?.UPI_ID ?? "--"}
                                    </td>
                                    <td>
                                        {!row.status && <MdEdit onClick={() => {
                                            openModal(row)
                                        }} className='cursor-pointer' color='#8296EE' />}
                                        {/* <MdDelete onClick={() => {
                                            setDeleteUserId(row?._id)
                                        }} className='cursor-pointer' color='red' /> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="hint-text me-2 text-grey">Showing <b>{data?.length ?? 0}</b> out of <b>{tableData?.total ?? 0}</b> entries</div>
                        <ul className="pagination mb-0">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {editState?.isModalOpen &&
                <Modal
                    header="Edit Payout"
                    onSave={handleUpdateData}
                    content={
                        <EditPayoutContent
                            payoutData={editState?.selectedPayout}
                            setPayoutData={updateData}
                        />}
                    isOpen={editState?.isModalOpen}
                    onClose={closeEditModal} />}

            {/* {deletePayoutId && <Modal
                header="Delete Payout"
                onSave={deletePayout}
                content="Are You Sure you want to delete this payout?"
                isOpen={deletePayoutId ? true : false}
                onClose={closeDeleteModal} />
            } */}

        </>
    );
};

export default PaymentRequestTable;
