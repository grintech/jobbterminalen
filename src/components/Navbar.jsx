import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../store/authContext';
import { useTranslation } from 'react-i18next';


const Navbar = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {
      i18n.changeLanguage(language);
    };

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

        <div className='ms-auto pe-2 pe-sm-3 d-block d-lg-none'>
        <div className="d-flex align-items-center">
        <ul className="employer p-0 me-2 m-0">
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                       {t("ForEmployers")}
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link to={`${empLogin}`} className="dropdown-item" >{t("EmpLogin")}</Link></li>
                    </ul>
                </li>
        </ul>

        {!user ? 
        <form className=" d-flex both_btns " role="search">
            <Link to='/login' className="btn btn-login mx-2" type="submit"><i className="fa-solid fa-user me-1"></i>{t("Login")}</Link>
          
        </form>
        :
        <div className="user_dropdown">
        <div className="dropdown">
            <button className="btn border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
         
            <p className='ml-4 mb-0 text-capitalize'>{user.name.split(" ")[0]} <i style={{fontSize:"10px"}} className="fa-solid fa-chevron-down"></i> </p>

            </button>
            <ul className="dropdown-menu">
                <li><Link to='/my-account' className="dropdown-item"><i className="fa-regular fa-user me-2"></i>{t("MyAccount")}</Link></li>
                <li><Link className="dropdown-item" onClick={logout}><i className="fa-solid fa-right-from-bracket me-2"></i>{t("Logout")}</Link></li>
            </ul>
            </div>
        </div>
        }
         <select className='lang_select ms-2' onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
         <option value="en">EN</option>
         <option value="sv">SV</option>
         </select>

        </div>


        </div>
        <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse pt-3 pt-lg-0" id="navbarSupportedContent">

        <ul className="navbar-nav mx-auto d-lg-flex mb-2 mb-lg-0">
            <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page">{t("Home")}</Link>
            </li>
            <li className="nav-item">
                <Link to="/about" className="nav-link">{t("About")}</Link>
            </li>
            <li className="nav-item">
                <Link to="/jobs" className="nav-link">{t("Jobs")}</Link>
            </li>
            <li className="nav-item">
                <Link to="/companies" className="nav-link">{t("Companies")}</Link>
            </li>
            
            {/* <li className="nav-item dropdown">
                <Link
                className="nav-link dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                {t("Companies")} <i style={{ fontSize: "14px" }} className="fa-solid fa-chevron-down"></i>
                </Link>
                <ul className="dropdown-menu">
                <li><Link to="/companies" className="dropdown-item">{t("AllCompanies")}</Link></li>
                <li><Link to="/companies/featured" className="dropdown-item">{t("FeaturedCompanies")}</Link></li>
                </ul>
            </li> */}
            <li className="nav-item">
                <Link to="/contact" className="nav-link">{t("ContactUs")}</Link>
            </li>
            </ul>
        { !user ? (
        <>
            <div className='d-none d-lg-block pe-2'>
            <form className="d-flex  both_btns" role="search">
                <Link to='/login' className="btn btn-login me-2" type="submit">{t("Login")}<i className="fa-solid fa-user ms-1"></i></Link>
                
            </form>
            </div>
        
        </>
        ) : 
        <div className="user_dropdown d-none d-lg-block">
        <div className="dropdown">
            <button className="btn border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          
            <p className='ml-4 mb-0 text-capitalize'>{user.name.split(" ")[0]} <i style={{fontSize:"10px"}} className="fa-solid fa-chevron-down"></i></p>

            </button>
            <ul className="dropdown-menu">
                <li><Link to='/my-account' className="dropdown-item"><i className="fa-regular fa-user me-2"></i>{t("MyAccount")}</Link></li>
                <li><Link className="dropdown-item" onClick={logout}><i className="fa-solid fa-right-from-bracket me-2"></i>{t("Logout")}</Link></li>
            </ul>
            </div>
        </div>
        }

        <ul className="d-none d-lg-block employer p-0 ms-lg-2 m-0">
            <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {t("ForEmployers")}
            </Link>
            <ul className="dropdown-menu">
                <li><Link  to={`${empLogin}`} className="dropdown-item" >{t("EmpLogin")}</Link></li>
            </ul>
            </li>
        </ul>

        <select className='lang_select ms-lg-2 d-none d-lg-block' onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
        <option value="en">EN</option>
        <option value="sv">SV</option>
       </select>


        </div>
    </div>
      </nav>
    </header>
   </>
  )
}

export default Navbar