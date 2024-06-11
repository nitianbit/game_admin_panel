import React, { useEffect, useState } from 'react'
import { UserTable } from '../../components'
import { ENDPOINTS } from './Constant';
import { doGET } from '../../utils/HttpUtil';
import FieldTable from '../../components/Table/FieldTable';

const Field = () => {

    const [users, setUsers] = useState()

    const getAllFields = async (e) => {
        try {
            const response = await doGET(ENDPOINTS.getFields);
            setUsers(response)
        } catch (error) { }
    };

    useEffect(() => {
        getAllFields()
    }, [])

    return (
        <div className='d-flex w-100'>
            <FieldTable getAllFields={getAllFields} tableData={users} />
        </div>
    )
}


export default Field