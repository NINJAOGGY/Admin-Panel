import React from 'react'
import css from './Layout.module.css';
import moment from 'moment/moment';
import { BiSearch } from 'react-icons/bi';
import profile from '../../assets/profile.png';
import Sidebar from '../Sidebar/Sidebar';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const Layout = () => {

    const { pathname } = useLocation();


    return (
        <div className={css.container}>
            <Sidebar />

            {/* making a dashboard as the deafult route */}
            {pathname === "/" && <Navigate to="/dashboard" />}


            <div className={css.dashboard}>
                <div className={css.topBaseGradients}>
                    <div className='gradient-red'></div>
                    <div className='gradient-orange'></div>
                    <div className='gradient-blue'></div>
                </div>

                {/* header */}
                <div className={css.header}>
                    {/* for present date */}
                    <span>{moment().format("dddd, Do MMM YYYY")}</span>

                    <div className={css.searchBar}>
                        <BiSearch size={20} />
                        <input type="text" placeholder='Search' />
                    </div>
                    <div className={css.profile}>
                        <img src={profile} alt="" />
                        <div className={css.details}>
                            <span>Aditya raj</span>
                            <span>raj@gmail.com</span>
                        </div>
                    </div>

                </div>
                <div className={css.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout;