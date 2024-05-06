import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap';
import './style.css'
import { doGET } from '../../utils/HttpUtil';
import CurrentContest from './CurrentContest';
import DashboardBasicInfo from './DashboardBasicInfo'
function Dashboard() {


    return (
        <div className='d-flex w-100'>
            <div className='w-50 me-3'>
                <CurrentContest />
            </div>
            <div>
                <DashboardBasicInfo />
            </div>
        </div>
    )
}

export default Dashboard