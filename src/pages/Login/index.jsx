import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import { doPOST } from '../../utils/HttpUtil';
import { ENDPOINTS } from '../../services/api/constants';
import { AppContext } from '../../services/context/AppContext';
import { STORAGE_KEYS } from '../../services/Storage';

function Login() {
    const navigate = useNavigate();

    const { success, error, setIsLoggedIn, setUserData} = useContext(AppContext)

    const [data, setData] = useState({})

    const isLoggedIn = localStorage.getItem(STORAGE_KEYS.TOKEN)

    const login = async () => {
        if ((!data?.phone || !data?.password)) {
            return error('Please Enter all required Fields');
        }
        try {
            const response = await doPOST(ENDPOINTS.login, data)
            navigate('/dashboard')
            localStorage.setItem(STORAGE_KEYS.TOKEN, response?.data?.token)
            localStorage.setItem('isLoggedIn', true)
            setIsLoggedIn(true)
            setUserData(response?.data?.user)
            success("Login Successfull")
            return
        } catch (error) {

        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard')
        }
    }, [])
    return (
        <section className="bg-light py-3 py-md-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card border border-light-subtle rounded-3 shadow-sm">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="text-center mb-3">
                                    <a href="#!">
                                        <img src={logo} alt="Logo" width="75" height="auto" style={{
                                            borderRadius: "50%",
                                            objectFit: "contain"
                                        }} />
                                        {/* <img src={logo} width="100px"
                style="border-radius: 50%; object-fit:contain; height: auto; width:150px;" /> */}
                                    </a>
                                </div>
                                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
                                <div className="row gy-2 overflow-hidden">
                                    <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input
                                                value={data?.phone}
                                                onChange={(v) => {
                                                    setData(prevData => ({
                                                        ...prevData,
                                                        phone: v.target.value
                                                    }))
                                                }}
                                                type="number"
                                                className="form-control"
                                                name="Phone"
                                                // id="phone"
                                                placeholder='Phone'
                                                required />
                                            <label className="form-label">Phone</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating mb-3">
                                            <input
                                                onChange={(v) => {
                                                    setData(prevData => ({
                                                        ...prevData,
                                                        password: v.target.value
                                                    }))
                                                }}
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                // id="password"
                                                value={data?.password}
                                                placeholder="Password"
                                                required />
                                            <label htmlFor="password" className="form-label">Password</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex gap-2 justify-content-between">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" name="rememberMe" id="rememberMe" />
                                                <label className="form-check-label text-secondary" htmlFor="rememberMe">
                                                    Keep me logged in
                                                </label>
                                            </div>
                                            <a href="#!" className="link-primary text-decoration-none">Forgot password?</a>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-grid my-3">
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                login();
                                            }} className="btn btn-primary btn-lg" type="submit">Log in</button>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <p className="m-0 text-secondary text-center">Don't have an account? <span onClick={() => {
                                            navigate("/signup")
                                        }} className="link-primary text-decoration-none cursor-pointer">Sign up</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
