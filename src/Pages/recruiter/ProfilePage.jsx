import {React, useState} from 'react'
import { Link } from 'react-router-dom'


const ProfilePage = () => {
    const [profileImage, setProfileImage] = useState(''); // Replace with your default image path
    const [logoImage, setLogoImage] = useState(''); // Replace with your default image path

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

  return (
    <>
    <div className="recruiter_signup_page">
    <div className=" new_navbar ">
      <div className="container-fluid px-5 d-flex justify-content-between align-items-center">
        <Link className="navbar-brand p-0">
          <img src="/images/logo1.png" alt="" />
        </Link>
        <Link to='/rec-login' className="btn btn-login mx-2" type="submit">
          <i className="fa-solid fa-user me-1"></i>Login
        </Link>
      </div>
    </div>

    <div className="recruiter_signup_form py-5">
    <div className="container ">
        <div className="d-flex align-items-center justify-content-between mb-3">
            <h4>Create Recruiter Profile</h4>
            <small>Existing Employers/Recruiters? <Link to='/rec-login' className='text-primary'>Login</Link></small>
        </div>
        <form id="signup_form">
            <div className="row">
                <div className="col-lg-4">
                    <div className="card shadow personal_detail_card">
                        <div className="card-body">
                            <h6 className='fw-bold'>Personal Details</h6>
                            <div className="d-flex mb-4">
                                <div className="col-3">
                                <div className="border rounded-2 position-relative profile_div">
                                        <img 
                                            src={profileImage} 
                                            className="profile_img w-100 h-100 rounded-2" 
                                            alt="Profile" 
                                            style={{ objectFit: "cover" }} 
                                        />
                                        <label htmlFor="profile_input">
                                            <i 
                                                className="fa-solid fa-pen-to-square" 
                                                style={{ cursor: 'pointer' }}
                                            ></i>
                                        </label>
                                        <input 
                                            type="file" 
                                            style={{ display: "none", visibility: "hidden" }} 
                                            id="profile_input" 
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                </div>
                               
                            </div>
                            <div className="mb-4">
                            <div className="col-12 ">
                                <label htmlFor="">Full Name <span>*</span></label>
                                <input type="text" className='w-100 form-control' placeholder='Full Name' />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="">Mobile Number <span>*</span></label>
                                <input type="text" className='form-control' name="mobile_number" placeholder="Enter mobile number " required=""></input>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="">Current Location <span>*</span></label>
                                <select className="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                </select>
                            </div>
                            <hr />
                            <h6 className='fw-bold'>Achievements</h6>
                           <div className="mb-4">
                           <label htmlFor="">Description</label>
                           <textarea name="" className="form-control" rows={3} placeholder='Description' id=""></textarea>
                           </div>
                            <div className="mb-4">
                                <label htmlFor="">Year of Achievement</label>
                                <select className="form-select" aria-label="Default select example">
                                <option selected>Select</option>
                                <option value="1">2024</option>
                                <option value="2">2023</option>
                                <option value="3">2022</option>
                                <option value="4">2021</option>
                                <option value="5">2020</option>
                                <option value="6">2019</option>
                                </select>
                            </div>
                            <Link className='text_blue fw-bold' ><small>+ Add more</small></Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card company_full_details shadow ">
                        <div className="card-body py-4 px-4">
                        <div className="d-flex flex-column w-100 align-items-end  justify-content-end mb-4">
                             <h6>Upload Logo</h6>
                                <div className="border rounded-2 position-relative profile_div">
                                        <img 
                                            src={logoImage} 
                                            className="profile_img w-100 h-100 rounded-2" 
                                            alt="logo" 
                                            style={{ objectFit: "cover" }} 
                                        />
                                        <label htmlFor="logo_input">
                                            <i 
                                                className="fa-solid fa-pen-to-square" 
                                                style={{ cursor: 'pointer' }}
                                            ></i>
                                        </label>
                                        <input 
                                            type="file" 
                                            style={{ display: "none", visibility: "hidden" }} 
                                            id="logo_input" 
                                            onChange={handleLogoUpload}
                                        />
                                </div>
                               
                            </div>

                        <h6 className='fw-bold'>Company Details </h6>
                        <div className="mb-4">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="">Current Company Name <span>*</span></label>
                                    <input type="text" className='form-control' placeholder='Current Company Name' />
                                </div>
                                <div className="col-md-6 mb-3">
                                <label htmlFor="">Current Designation <span>*</span></label>
                                <input type="text" className='form-control' placeholder='Current Designation' />
                                </div>
                                <div className="col-md-6 mb-3">
                                        <label htmlFor="">Company Type <span>*</span></label>
                                        <select className="form-select" aria-label="Default select example">
                                        <option selected>Select</option>
                                        <option value="1">2024</option>
                                        <option value="2">2023</option>
                                        <option value="3">2022</option>
                                        <option value="4">2021</option>
                                        </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="">Company Website <span>*</span></label>
                                    <input type="url" className='form-control' placeholder='Company website' />
                                </div>
                            </div>
                        </div>
                        <h6 className='fw-bold'>Company Address</h6>
                        <div className="mb-4">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label htmlFor="">Address 1 <span>*</span></label>
                                    <input type="text" className='form-control' placeholder='Address Line One' />
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="">Address 2 </label>
                                    <input type="text" className='form-control' placeholder='Address Line Two' />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 mb-2">
                                    <label htmlFor="">City <span>*</span></label>
                                    <input type="text" className='form-control' placeholder='City' />
                                </div>
                                <div className="col-lg-3 col-md-6 mb-2">
                                    <label htmlFor="">State/Province/Region <span>*</span></label>
                                    <input type="text" className='form-control' placeholder='State' />
                                </div>
                                <div className="col-lg-3 col-md-6 mb-2">
                                    <label htmlFor="">Country <span>*</span></label>
                                    <input type="text" className='form-control' placeholder='Country' />
                                </div>
                                <div className="col-lg-3 col-md-6 mb-2">
                                    <label htmlFor="">Zip Code<span>*</span></label>
                                    <input type="text" className='form-control' placeholder='Zip Code' />
                                </div>
                                
                            </div>
                        </div>

                        </div>
                        <div className='previous_company bg-light py-3 px-3 d-none'>
                            <div className="d-flex justify-content-between">
                                <h6 className='fw-bold'>Previous Company</h6>
                                <Link className='text_blue'>Cancel</Link>
                            </div>
                            <div className="py-3">
                            <div className="row">
                                <div className="col-md-4">
                                    <label htmlFor="">Current Company Name <span>*</span></label>
                                    <input type="text" className='form-control' placeholder='Current Company Name' />
                                </div>
                                <div className="col-md-3">
                                <label htmlFor="">Current Designation <span>*</span></label>
                                <input type="text" className='form-control' placeholder='Current Designation' />
                                </div>
                                <div className="col-md-5">
                                    <div className="row">
                                        <div className="col-6">
                                        <label htmlFor="">From <span>*</span></label>
                                        <select className="form-select" aria-label="Default select example">
                                        <option selected>Select</option>
                                        <option value="1">2024</option>
                                        <option value="2">2023</option>
                                        <option value="3">2022</option>
                                        <option value="4">2021</option>
                                        </select>
                                        </div>
                                        <div className="col-6">
                                        <label htmlFor="">To <span>*</span></label>
                                        <select className="form-select" aria-label="Default select example">
                                        <option selected>Select</option>
                                        <option value="1">Present</option>
                                        <option value="2">2024</option>
                                        <option value="3">2023</option>
                                        <option value="4">2022</option>
                                        <option value="5">2021</option>
                                        </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>  
                       <div className="card-body">
                       {/* <div className="text-end"><Link className='text_blue fw-bold'><small>+ Add Previous Company</small></Link></div> */}
                       <hr />
                       <h6 className='fw-bold'>Hiring Preferences</h6>
                       <div className="">
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <label htmlFor="">Total Experience in hiring <span>*</span></label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Select</option>
                                    <option value="1">Less than one year</option>
                                    <option value="2">1+ year</option>
                                    <option value="3">2+ year</option>
                                    <option value="4">3+ year</option>
                                    <option value="5">4+ year</option>
                                    <option value="6">5+ year</option>
                                    </select>
                            </div>
                            <div className="col-md-6 mb-4">
                                <label htmlFor="">Level I hire for <span>*</span></label>
                                <select className="form-select" aria-label="Default select example" >
                                    <option selected>Select</option>
                                    <option value="1">Junior Level</option>
                                    <option value="2">Mid Level</option>
                                    <option value="3">High Level</option>
                                    <option value="4">Top Management</option>
                                    
                                    </select>
                            </div>
                            {/* <div className="col-md-3 mb-4">
                                <label htmlFor="">Referral Code</label>
                                <input type="text" className='form-control' placeholder='' name="" id="" />
                            </div> */}

                            {/* <div className="col-md-6 mb-4">
                                <label htmlFor="">Industry (Max 4) <span>*</span></label>
                                <select className="form-select" aria-label="Default select example" >
                                    <option selected>Select</option>
                                    <option value="1">one</option>
                                    <option value="2">two</option>
                                    <option value="3">three</option>
                                    <option value="4">four</option>
                                    
                                    </select>
                            </div>
                            <div className="col-md-6 mb-4">
                                <label htmlFor="">Function (Max 4) <span>*</span></label>
                                <select className="form-select" aria-label="Default select example" >
                                    <option selected>Select</option>
                                    <option value="1">one</option>
                                    <option value="2">two</option>
                                    <option value="3">three</option>
                                    <option value="4">four</option>
                                    
                                    </select>
                            </div> */}
                            <div className="col-12 mb-4">
                                <label htmlFor="">Skills I hire for<span>*</span></label>
                                <input type="text" className='form-control' placeholder='Skills I hire for' name="" id="" />
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <input type="checkbox" className='me-2' name="" id="" />
                                <label htmlFor="">I agree to create my Recruiter Profile  and also agree to be bound by the Terms and conditions.</label>
                            </div>
                        </div>
                       </div>
                       <div className="d-flex justify-content-end"><button type='submit' className='btn btn-register px-5 py-3 fs-6'>Submit</button></div>
                       </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    </div>
    
    </div>
</>
  )
}

export default ProfilePage