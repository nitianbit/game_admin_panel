import React from 'react';
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import './style.css'
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 text-grey shadow-sm">
            <div className="d-flex flex-column align-items-center align-items-sm-start  pt-2  min-vh-100">
                <Link href="/" className="d-flex w-100 align-items-center px-3 pb-3  shadow-sm  text-decoration-none ">
                    <span className="fs-5 d-none d-sm-inline text-grey">Menu</span>
                </Link>
                <ul className="px-3 nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <Link to="/users" className="nav-link align-middle px-0">
                        <FaUser className='text-grey' /><i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline text-grey">Users</span>
                    </Link>
                    <Link to="/dashboard" className="nav-link px-0 align-middle  text-grey">
                        <MdDashboard className='text-grey' /> <span className="ms-1 d-none d-sm-inline text-grey">Dashboard</span>
                    </Link>
                    <Link to="/fields" className="nav-link align-middle px-0">
                        <FaUser className='text-grey' /><i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline text-grey">Fields</span>
                    </Link>
                </ul>
                <hr />
            </div>
        </div>
    );
}

export default Sidebar;
