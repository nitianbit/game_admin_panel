import React, { useEffect, useState } from 'react'
import { UserTable } from '../../components'
import { ENDPOINTS } from './Constant';
import { doGET } from '../../utils/HttpUtil';
import FieldTable from '../../components/Table/FieldTable';

const Field = () => {

    const [users, setUsers] = useState()

    const getAllForms = async (e) => {
        try {
            const response = await doGET(ENDPOINTS.getForms);
            setUsers(response)
        } catch (error) { }
    };

    useEffect(() => {
        getAllForms()
    }, [])

    return (
        <div className='d-flex w-100'>
            <FieldTable getAllForms={getAllForms} tableData={users} />
        </div>
    )
}


export default Field