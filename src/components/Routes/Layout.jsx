
import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AppContext } from '../../services/context/AppContext'
import { Navbar, SideBar } from '..';
import './style.css'

const Layout = () => {
    const { isLoggedIn } = useContext(AppContext);


    return isLoggedIn ?
        <div className='d-flex '>
            <SideBar />
            <div className="flex-1">
                <Navbar />
                <div className='bg-light p-3'>
                <Outlet />
                </div>
            </div>
        </div>
        : <Navigate to="/" />

}

export default Layout
