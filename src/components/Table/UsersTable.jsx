import React, { useContext, useEffect, useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import Modal from '../Modal/Modal';
import EditUserContent from '../Modal/EditUserContent';
import { ENDPOINTS } from '../../pages/Users/UsersConstant';
import { doDELETE, doPOST } from '../../utils/HttpUtil';
import { AppContext } from '../../services/context/AppContext';

const UsersTable = ({ tableData, getAllUsers }) => {

  const { success, error } = useContext(AppContext)

  const [data, setData] = useState(tableData);
  const [loading, setLoading] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState(null)
  const [editState, setEditState] = useState({
    isModalOpen: false,
    selectedUser: null
  })

  const handleUpdateData = async () => {
    try {
      setLoading(true)
      await doPOST(ENDPOINTS.updateUser(editState.selectedUser?._id), editState.selectedUser)
      setEditState({
        isModalOpen: false,
        selectedUser: null
      })
      getAllUsers()
      success("User Updated Successfully")
    } catch (e) {
      error("Server error")
    } finally {
      setLoading(false)

    }
  }

  const updateData = (updatedObj) => setEditState(prev => ({
    ...prev,
    selectedUser: {
      ...prev.selectedUser,
      ...updatedObj
    }
  }))


  const openModal = (selectedUser) => {
    setEditState(prev => ({
      ...prev,
      isModalOpen: true,
      selectedUser
    }));
  };


  const closeEditModal = () => {
    setEditState(prev => ({
      ...prev,
      isModalOpen: false,
      selectedUser: null
    }));
  };

  const deleteUser = async () => {
    try {
      setLoading(true)
      const response = await doDELETE(ENDPOINTS.deleteUser(deleteUserId))
      setDeleteUserId(null)
      getAllUsers()
      success("User deleted Successfully")
    } catch (error) {
      error("server error")

    }
    finally {
      setLoading(false)
    }
  }

  const closeDeleteModal = () => {
    setDeleteUserId(null)
  }

  useEffect(() => {
    setData(tableData)
    console.log(tableData);
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
                <th className='font-weight-600' scope="col">Phone</th>
                <th className='font-weight-600' scope="col">Balance</th>
                <th className='font-weight-600' scope="col">UPI ID</th>
                <th className='font-weight-600' scope="col">Disabled</th>
                <th className='font-weight-600' scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className='text-grey'>
              {data?.map((row, index) => (
                <tr key={row?.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{row.name}</td>
                  <td>{row.phone}</td>
                  <td>{row.balance}</td>
                  <td>{row?.UPI_ID ?? "--"}</td>
                  <td>{!row.disabled ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</td>
                  <td>
                    <MdEdit onClick={() => {
                      openModal(row)
                    }} className='cursor-pointer' color='#8296EE' />
                    <MdDelete onClick={() => {
                      setDeleteUserId(row?._id)
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
          header="Edit User"
          onSave={handleUpdateData}
          content={
            <EditUserContent
              userData={editState?.selectedUser}
              setUserData={updateData}
            />}
          isOpen={editState?.isModalOpen}
          onClose={closeEditModal} />}

      {deleteUserId && <Modal
        header="Delete User"
        onSave={deleteUser}
        content="Are You Sure you want to delete this user?"
        isOpen={deleteUserId ? true : false}
        onClose={closeDeleteModal} />
      }
    </>
  );
};

export default UsersTable;
