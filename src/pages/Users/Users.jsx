import React, { useEffect, useState } from 'react'
import { UserTable } from '../../components'
import { ENDPOINTS } from './UsersConstant';
import { doGET } from '../../utils/HttpUtil';

const Users = () => {

    const [users, setUsers] = useState()

    const getAllUsers = async (e) => {
        try {
            const response = await doGET(ENDPOINTS.allUsers);
            setUsers(response?.data)
        } catch (error) { }
    };

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div className='d-flex w-100'>
            <UserTable getAllUsers={getAllUsers} tableData={users} />
        </div>
    )
}


export default Users