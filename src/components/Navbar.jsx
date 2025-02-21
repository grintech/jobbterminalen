import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../store/authContext';


const Navbar = () => {

    const { user, loading , logout} = useAuthContext();
    const empLogin = import.meta.env.VITE_EMP_URL;

  return (
   <>
     <header>
      <nav className="navbar navbar-expand-lg shadow-sm">
    <div className="container">
        <Link to='/' className="navbar-brand" >
            <img src="/images/job-logo1.png" alt="logo" />
        </Link>

        <div className='ms-auto pe-3 d-block d-lg-none'>
        <div className="d-flex align-items-center">
        <ul className="employer p-0 me-2 m-0">
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        For Employers
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link to={`${empLogin}`} className="dropdown-item" >Employer Login</Link></li>
                    </ul>
                </li>
        </ul>

        {!user ? 
        <form className=" d-flex both_btns " role="search">
            <Link to='/login' className="btn btn-login mx-2" type="submit"><i className="fa-solid fa-user me-1"></i>Login</Link>
            {/* <Link to='/register' className="btn btn-register mx-2 d-none d-sm-block" type="submit"><i className="fa-solid fa-user-pen me-1"></i>Register</Link> */}
        </form>
        :
        <div className="user_dropdown">
        <div className="dropdown">
            <button className="btn border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
         
            <p className='ml-4 mb-0'>{user.name}</p>
            </button>
            <ul className="dropdown-menu">
                <li><Link to='/my-account' className="dropdown-item"><i className="fa-regular fa-user me-2"></i>My Account</Link></li>
                <li><Link className="dropdown-item" onClick={logout}><i className="fa-solid fa-right-from-bracket me-2"></i>Logout</Link></li>
            </ul>
            </div>
        </div>
        }

        </div>


        </div>
        <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse pt-3 pt-lg-0" id="navbarSupportedContent">

        <ul className="navbar-nav mx-auto d-lg-flex mb-2 mb-lg-0">
            <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
                <Link to="/jobs" className="nav-link">Jobs</Link>
            </li>
            
            {/* <li className="nav-item dropdown">
                <Link
                className="nav-link dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                Jobs <i style={{ fontSize: "14px" }} className="fa-solid fa-chevron-down"></i>
                </Link>
                <ul className="dropdown-menu">
                <li><Link to="/jobs" className="dropdown-item">Job Lists</Link></li>
                <li><Link to="#" className="dropdown-item">Student Jobs</Link></li>
                <li><Link to="#" className="dropdown-item">Internship Jobs</Link></li>
                <li><Link to="#" className="dropdown-item">Freelancer Jobs</Link></li>
                <li><Link to="#" className="dropdown-item">Part Time Jobs</Link></li>
                </ul>
            </li> */}
            <li className="nav-item dropdown">
                <Link
                className="nav-link dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                Companies <i style={{ fontSize: "14px" }} className="fa-solid fa-chevron-down"></i>
                </Link>
                <ul className="dropdown-menu">
                <li><Link to="/companies" className="dropdown-item">All Companies</Link></li>
                <li><Link to="/companies/featured" className="dropdown-item">Featured Companies</Link></li>
                </ul>
            </li>
            <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact Us</Link>
            </li>
            </ul>
        { !user ? (
        <>
            <div className='d-none d-lg-block pe-2'>
            <form className="d-flex  both_btns" role="search">
                <Link to='/login' className="btn btn-login me-2" type="submit">Login<i className="fa-solid fa-user ms-1"></i></Link>
                
            </form>
            </div>
        
        </>
        ) : 
        <div className="user_dropdown d-none d-lg-block">
        <div className="dropdown">
            <button className="btn border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {/* <i className="fa-solid fa-user "></i> */}
            {/* <img src="/images/job-logo1.png" className='w-100 h-100 rounded-circle' alt="logo" /> */}
            <p className='ml-4 mb-0'>{user.name}</p>
            </button>
            <ul className="dropdown-menu">
                <li><Link to='/my-account' className="dropdown-item"><i className="fa-regular fa-user me-2"></i>My Account</Link></li>
                <li><Link className="dropdown-item" onClick={logout}><i className="fa-solid fa-right-from-bracket me-2"></i>Logout</Link></li>
            </ul>
            </div>
        </div>
        }

        <ul className="employer p-0 ms-lg-2 m-0">
            <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                For Employers
            </Link>
            <ul className="dropdown-menu">
                <li><Link  to={`${empLogin}`} className="dropdown-item" >Employer Login</Link></li>
            </ul>
            </li>
        </ul>

        </div>
    </div>
      </nav>
    </header>
   </>
  )
}

export default Navbar