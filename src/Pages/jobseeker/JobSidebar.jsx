import React from 'react';
import { useAuthContext } from '../../store/authContext';
import { NavLink } from 'react-router-dom';

const JobSidebar = () => {
    const { logout } = useAuthContext();

    return (
        <div className='jobseeker_menu card_sticky'>
            <ul className='d-flex flex-row flex-md-column flex-wrap gap-2 gap-sm-3 gap-lg-4 m-0 p-0'>
                <NavLink 
                    to='/my-account' 
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <li><i className="fa-solid fa-gauge me-2"></i>Dashboard</li>
                </NavLink>
                <NavLink 
                    to='/saved-jobs' 
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <li><i className="fa-solid fa-bookmark me-2"></i>Saved Jobs</li>
                </NavLink>
                <NavLink 
                    to='/applied-jobs' 
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <li><i className="fa-solid fa-book-open-reader me-2"></i>Applied Jobs</li>
                </NavLink>
                <NavLink 
                    to='/saved-companies' 
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <li><i className="fa-solid fa-bookmark me-2"></i>Saved Companies</li>
                </NavLink>
                <NavLink 
                to='/login'
                    onClick={logout} 
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <li><i className="fa-solid fa-right-from-bracket me-2"></i>Logout</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default JobSidebar;
