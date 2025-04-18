import React, { useState } from 'react';
import { useAuthContext } from '../../store/authContext';
import { NavLink, useNavigate } from 'react-router-dom';

const JobSidebar = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  return (
    <>
      <div className='jobseeker_menu card_sticky'>
        <ul className='d-flex flex-row flex-md-column flex-wrap gap-2 gap-sm-3 gap-lg-4 m-0 p-0'>
          <NavLink to='/my-account' className={({ isActive }) => (isActive ? 'active' : '')}>
            <li><i className="fa-solid fa-gauge me-2"></i>Dashboard</li>
          </NavLink>
          <NavLink to='/saved-jobs' className={({ isActive }) => (isActive ? 'active' : '')}>
            <li><i className="fa-solid fa-bookmark me-2"></i>Saved Jobs</li>
          </NavLink>
          <NavLink to='/applied-jobs' className={({ isActive }) => (isActive ? 'active' : '')}>
            <li><i className="fa-solid fa-book-open-reader me-2"></i>Applied Jobs</li>
          </NavLink>
          <NavLink to='/saved-companies' className={({ isActive }) => (isActive ? 'active' : '')}>
            <li><i className="fa-solid fa-bookmark me-2"></i>Saved Companies</li>
          </NavLink>
          <li
            style={{ cursor: 'pointer' }}
            onClick={() => setShowLogoutModal(true)}
          >
            <i className="fa-solid fa-right-from-bracket me-2"></i>Logout
          </li>
        </ul>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button type="button" className="btn-close" onClick={() => setShowLogoutModal(false)}></button>
              </div>
              <div className="modal-body text-center">
                <h6 className='fs-5'>Are you sure you want to logout?</h6>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button className="btn btn-secondary btn-sm" onClick={() => setShowLogoutModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Optional backdrop */}
      {showLogoutModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default JobSidebar;
