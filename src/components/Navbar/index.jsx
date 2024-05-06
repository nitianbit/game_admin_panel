import React, { useContext } from 'react';
import { TfiMenuAlt } from "react-icons/tfi";
import { FaUser } from "react-icons/fa";
import { AppContext } from '../../services/context/AppContext';

const CustomNavbar = ({ toggleSidebar }) => {
    const { logout, userData } = useContext(AppContext)
    return (
        <nav className="navbar navbar-dark navbar-expand bg-white justify-content-between text-grey shadow-sm">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item text-center">
                        <a href="#" className="nav-link" data-toggle="modal" data-target="#"><span className="fa fa-map"></span><span className="d-none d-sm-inline d-xl-block px-1 text-grey">Map</span></a>
                    </li>
                </ul>
                <ul className="nav navbar-nav">
                    <li className="nav-item dropdown text-center dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" id="dropdownUser1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <TfiMenuAlt className='text-grey' /><span className="d-none d-sm-inline px-1 text-grey">{userData?.name??"Admin"}</span> </a>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow text-grey" aria-labelledby="dropdownUser1">
                            <li><a className="dropdown-item" >Settings</a></li>
                            <li><a className="dropdown-item">Profile</a></li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li><a className="dropdown-item text-grey cursor-pointer" onClick={(e) => {
                                e.preventDefault();
                                logout();
                            }}>Sign out</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default CustomNavbar;
