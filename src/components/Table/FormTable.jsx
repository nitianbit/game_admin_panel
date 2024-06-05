import React, { useContext, useEffect, useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import Modal from '../Modal/Modal';
import EditUserContent from '../Modal/EditUserContent';
import { ENDPOINTS } from '../../pages/FieldPage/Constant';
import { doDELETE, doPOST, doPUT } from '../../utils/HttpUtil';
import { AppContext } from '../../services/context/AppContext';
import EditFieldContent from '../Modal/FieldsModal';

const FieldTable = ({ tableData, getAllFields }) => {

    const { success, error } = useContext(AppContext)

    const [data, setData] = useState(tableData?.rows);
    const [loading, setLoading] = useState(false)
    const [addField, setAddField] = useState(false)
    const [deleteFieldId, setDeleteFieldId] = useState(null)
    const [editState, setEditState] = useState({
        isModalOpen: false,
        selectedField: null
    })

    const handleUpdateData = async () => {
        try {
            setLoading(true)
            if (!editState.selectedField?._id) {
                await doPOST(ENDPOINTS.addField, editState.selectedField)
            } else {
                await doPUT(ENDPOINTS.updateField(editState.selectedField?._id), editState.selectedField)
            }
            setEditState({
                isModalOpen: false,
                selectedField: null
            })
            getAllFields()
            success("Field Updated Successfully")
        } catch (e) {
            error("Server error")
        } finally {
            setLoading(false)

        }
    }

    const updateData = (updatedObj) => setEditState(prev => ({
        ...prev,
        selectedField: {
            ...prev.selectedField,
            ...updatedObj
        }
    }))


    const openModal = (selectedField) => {
        setEditState(prev => ({
            ...prev,
            isModalOpen: true,
            selectedField
        }));
    };


    const closeEditModal = () => {
        setEditState(prev => ({
            ...prev,
            isModalOpen: false,
            selectedField: null
        }));
    };

    const deleteField = async () => {
        try {
            setLoading(true)
            const response = await doDELETE(ENDPOINTS.deleteField(deleteFieldId))
            setDeleteFieldId(null)
            getAllFields()
            success("Field deleted Successfully")
        } catch (error) {
            error("server error")

        }
        finally {
            setLoading(false)
        }
    }

    const closeDeleteModal = () => {
        setDeleteFieldId(null)
    }

    useEffect(() => {
        setData(tableData)
    }, [tableData])

    return (
        <div >
            <button onClick={(e) => {
                openModal(true);
            }} className="btn btn-primary" type="submit">Add field</button>
            <div className="container shadow-sm bg-white p-2 w-100">
                <div className="table-wrapper">
                    <table className="table">
                        <thead style={{ fontWeight: 600 }}>
                            <tr>
                                <th className='font-weight-600' scope="col">#</th>
                                <th className='font-weight-600' scope="col">Name</th>
                                <th className='font-weight-600' scope="col">Type</th>
                                <th className='font-weight-600' scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-grey'>
                            {data?.map((row, index) => (
                                <tr key={row?.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{row.label}</td>
                                    <td>{row.type}</td>
                                    <td>
                                        <MdEdit onClick={() => {
                                            openModal(row)
                                        }} className='cursor-pointer' color='#8296EE' />
                                        <MdDelete onClick={() => {
                                            setDeleteFieldId(row?._id)
                                        }} className='cursor-pointer' color='red' />
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
                    header="Edit Field"
                    onSave={handleUpdateData}
                    content={
                        <EditFieldContent
                            userData={editState?.selectedField}
                            setUserData={updateData}
                        />}
                    isOpen={editState?.isModalOpen}
                    onClose={closeEditModal} />}
            {/* {addField && <Modal
                header="Edit Field"
                onSave={handleUpdateData}
                content={
                    <EditFieldContent
                        userData={editState?.selectedField}
                        setUserData={updateData}
                    />}
                isOpen={editState?.isModalOpen}
                onClose={closeEditModal} />} */}

            {deleteFieldId && <Modal
                header="Delete Field"
                onSave={deleteField}
                content="Are You Sure you want to delete this Field?"
                isOpen={deleteFieldId ? true : false}
                onClose={closeDeleteModal} />
            }
        </div>
    );
};

export default FieldTable;
