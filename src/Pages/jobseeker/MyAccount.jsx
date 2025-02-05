import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useAuthContext } from '../../store/authContext';
import Footer from '../../components/Footer';
import JobSidebar from './JobSidebar';
import { Link } from 'react-router-dom';

const MyAccount = () => {
  const { user } = useAuthContext();
  const [profileImage, setProfileImage] = useState('/images/blank_user.png');
  const [resume, setResume] = useState(null);
  const [resumeError, setResumeError] = useState('');

  const [isExperienced, setIsExperienced] = useState(false);
  const [isLocation, setIsLocation] = useState(false);

  const [isCurrentEmployment, setIsCurrentEmployment] = useState(true); 

  const [isDifferentlyAbled, setIsDifferentlyAbled] = useState(null); 
  const [abledType, setAbledType] = useState("");


  const handleRadioChange = (event) => {
    setIsExperienced(event.target.id === 'flexRadioDefault2');
  };
  const handleRadioLocation = (event) => {
    setIsLocation(event.target.id === 'RadioLocation2');
  };

  const handleRadioEmpChange = (event) => {
    const value = event.target.value === 'yes';
    setIsCurrentEmployment(value);
  };

 
  
  // Cover Letter state and error handling
  const [coverLetter, setCoverLetter] = useState(null);
  const [coverLetterError, setCoverLetterError] = useState('');

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile image removal
  const handleRemoveImage = () => {
    setProfileImage('/images/blank_user.png');
  };

  // Handle resume upload with validation
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/rtf',
    ];
    const maxSize = 2 * 1024 * 1024; // 2 MB in bytes

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setResumeError('Invalid file type. Supported formats are PDF, DOC, DOCX, and RTF.');
        return;
      }

      if (file.size > maxSize) {
        setResumeError('File size exceeds 2 MB.');
        return;
      }

      setResumeError('');
      const fileName = file.name;
      setResume({ file, fileName });
    }
  };

  // Handle resume download
  const handleResumeDownload = () => {
    const url = URL.createObjectURL(resume.file);
    const link = document.createElement('a');
    link.href = url;
    link.download = resume.fileName;
    link.click();
  };

  // Handle resume removal
  const handleRemoveResume = () => {
    setResume(null);
  };

  // Handle cover letter upload with validation
  const handleCoverLetterUpload = (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const maxSize = 2 * 1024 * 1024; // 2 MB in bytes

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setCoverLetterError('Invalid file type. Supported formats are PDF, DOC, DOCX.');
        return;
      }

      if (file.size > maxSize) {
        setCoverLetterError('File size exceeds 2 MB.');
        return;
      }

      setCoverLetterError('');
      const fileName = file.name;
      setCoverLetter({ file, fileName });
    }
  };

  // Handle cover letter download
  const handleCoverLetterDownload = () => {
    const url = URL.createObjectURL(coverLetter.file);
    const link = document.createElement('a');
    link.href = url;
    link.download = coverLetter.fileName;
    link.click();
  };

  // Handle cover letter removal
  const handleRemoveCoverLetter = () => {
    setCoverLetter(null);
  };


  const [skills, setSkills] = useState([]); // Track added skills
  const [input, setInput] = useState(''); // Track input value

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setInput(''); // Clear input after adding skill
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addSkill(input); 
    }
  };

  /*------------Language-------------------*/
  const [languages, setLanguages] = useState([
    { language: "", proficiency: "Beginner" },
  ]);

  // Add a new row
  const addLanguageRow = () => {
    setLanguages([...languages, { language: "", proficiency: "Beginner" }]);
  };

  // Delete a specific row
  const deleteLanguageRow = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  // Handle changes in language input
  const handleLanguageChange = (index, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].language = value;
    setLanguages(updatedLanguages);
  };

  // Handle changes in proficiency dropdown
  const handleProficiencyChange = (index, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].proficiency = value;
    setLanguages(updatedLanguages);
  };



  return (
    <>
      <Navbar />

      <div className='top_pad'>
        <div className="container py-5">
          <div className="row my_account_page mt-4">
            <div className="col-md-3 mb-4 mb-md-0">
              <JobSidebar />
            </div>
            <div className="col-md-9 profile_details ">
              <div className="card border-0 shadow bg_lblue">
                <div className="card-body ">
                <h1 className='job_head'>
                    Welcome
                     <span className='text-green text-capitalize'> "{user.name}" </span> 
                     to your account
                  </h1>
                  <h6>From your account dashboard you can see your saved jobs, applied jobs, and can see your profile and edit as well.</h6>
                </div>
           </div>

              {/* Profile Image Section */}
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3 col-lg-2">
                      <div className="job_profile_icon position-relative">
                        <img src={profileImage} className='profile_image' alt="Profile" />
                        {!profileImage || profileImage === '/images/blank_user.png' ? (
                          <>
                            <input 
                              type="file" 
                              id='profile_img' 
                              onChange={handleImageUpload}
                            />
                            <label className='profile_img_label' htmlFor="profile_img">
                              <span>Upload <i className="fa-solid fa-plus"></i></span>
                            </label>
                          </>
                        ) : (
                          <i 
                            className="fa-solid fa-xmark"
                            onClick={handleRemoveImage}
                          ></i>
                        )}
                      </div>
                    </div>
                    <div className="col-md-9 col-lg-10">
                      <div className="border-bottom pb-3">
                       <div className="d-flex align-items-center mb-2">
                         <h4 className='m-0 text-capitalize'>{user.name}</h4>
                          <Link><i className="fa-solid fa-pencil ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></Link>
                       </div>
                        <h6 className='text-secondary m-0 fw-light'>Profile last updated - Yesterday</h6>
                      </div>
                      {/* User Info */}
                      <div className='row py-3 jobseeker_details'>
                        <div className="col-md-6">
                          <ul className='p-0 '>
                            <li><i className="fa-solid fa-location-dot"></i> <span>Chandigarh India</span></li>
                            <li><i className="fa-solid fa-briefcase"></i> <span>Fresher</span></li>
                            <li><i className="fa-regular fa-calendar"></i> <span>Add availability to join</span></li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <ul className='p-0'>
                            <li><i className="fa-solid fa-phone"></i> <span>85288522221</span></li>
                            <li><i className="fa-regular fa-envelope"></i> <span>jobseekernew@yopmail.com</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                
            <div className="modal fade basicModal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content p-3 p-sm-4">
                  <div className="modal-header border-0">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Basic Details</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body ">
                    <form action="" className=''>
                      <div className='mb-4'>
                        <label htmlFor="">Name</label>
                        <input type="text" className='form-control' />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Front End Developer at XYZ Company</label>
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Work Status</label>
                        <div className="d-flex ">
                          <div className="form-check me-4">
                          <input className="form-check-input" type="radio" name="flexRadioDefault"
                           id="flexRadioDefault1"
                           checked={!isExperienced}
                           onChange={handleRadioChange}
                           />
                          <label className="form-check-label"htmlFor="flexRadioDefault1">
                           Fresher
                          </label>
                        </div>
                        <div className="form-check experience_radio" >
                          <input className="form-check-input " type="radio" name="flexRadioDefault"
                           id="flexRadioDefault2" 
                           checked={isExperienced}
                           onChange={handleRadioChange}
                           />
                          <label className="form-check-label "htmlFor="flexRadioDefault2">
                           Experienced
                          </label>
                        </div>
                        </div>

                        {isExperienced && (
                        <div className="row mt-4 experience">
                        <label htmlFor="">Total experience</label>
                            <div className="col-md-6 mb-2 mb-md-0">
                              <input type="text" className='form-control' placeholder='Enter Years' maxLength={2} name="" id="" />
                            </div>
                            <div className="col-md-6 mb-2 mb-md-0">
                              <input type="text" className='form-control' placeholder='Enter Months' maxLength={2} name="" id="" />
                            </div>
                        </div>
                        )}

                      </div>
                      <div className='mb-4'>
                      <label htmlFor="">Current Salary</label>
                      <p><small>Salary information helps us find relevant jobs for you</small></p>
                      <div className="row">
                        <div className="col-4 col-md-3 col-lg-2">
                            <select className="form-select" aria-label="Default select example">
                              <option value="rupees">kr</option>
                              <option value="dollar">$</option>
                            </select>
                        </div>
                        <div className="col-8 col-md-9 col-lg-10">
                        <input type="text" className='form-control' placeholder='Eg. 4,50,000' />
                        </div>
                      </div>
                      </div>

                       <div className='mb-4'>
                         <div className="row mt-4">
                        <label htmlFor="">Current Location</label>
                           <div className="d-flex">
                             <div className="form-check me-4">
                              <input className="form-check-input" type="radio" name="RadioLocation" id="RadioLocation1"
                              checked={!isLocation}
                              onChange={handleRadioLocation}/>
                              <label className="form-check-label" htmlFor="RadioLocation1"> Sweden </label>
                            </div>
                            <div className="form-check locationRadio">
                              <input className="form-check-input" type="radio" name="RadioLocation" id="RadioLocation2" 
                               checked={isLocation}
                               onChange={handleRadioLocation}
                              />
                              <label className="form-check-label" htmlFor="RadioLocation2"> Outside Sweden </label>
                            </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-6 mb-2 mb-md-0">
                            <input type="text" className='form-control' placeholder='Enter current location' />
                          </div>

                          {isLocation && (
                            <div className="col-md-6 mb-2 mb-md-0 country_input">
                            <input type="text" className='form-control' placeholder='Enter country name' />
                          </div>
                          )}
                        </div>
                            
                        </div>
                       </div>

                       <div className="mb-4">
                        <label htmlFor="">Notice Period</label>
                        <p><small>Lets recruiters know your availability to join</small></p>
                        <div className="mt-3">
                          <select className="form-select" aria-label="Default select example">
                            <option value="15 Days or less">15 Days or less</option>
                            <option value="1 Month">1 Month</option>
                            <option value="2 Months">2 Months</option>
                            <option value="3 Months">3 Months</option>
                            <option value="More than 3 months">More than 3 months</option>
                            <option value="Serving notice period">Serving notice period</option>
                          </select>
                       </div>
                      </div>
                    </form>
                
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary rounded-pill">Save</button>
                  </div>
                </div>
              </div>
            </div>


              {/* Resume Upload Section */}
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                  <h5>Resume</h5>
                  <p>75% of recruiters discover candidates through their resume</p>
                  <div className="upload_resume ">
                    {resume ? (
                      <div className="uploaded_file_details d-flex justify-content-between align-items-baseline">
                        <div>
                          <h6 className='file_name m-0'>{resume.fileName}</h6>
                          <p><small>Uploaded on Jan 07 2025</small></p>
                        </div>
                        <div className='d-flex position-relative'>
                          <i className="fa-solid fa-download me-3" onClick={handleResumeDownload}></i>
                          <i className="fa-solid fa-trash" onClick={handleRemoveResume}></i>
                        </div>
                      </div>
                    ) : (
                      <div className='d-flex flex-column align-items-center justify-content-center'>
                        <input type="file" id='upload_resume_input' onChange={handleResumeUpload} />
                        <label htmlFor="upload_resume_input">Upload resume</label>
                        <p className='m-0'><small>Supported Formats: doc, docx, rtf, pdf, upto 2 MB</small></p>
                      </div>
                    )}
                    {resumeError && <p className="text-danger">{resumeError}</p>}
                  </div>
                </div>
              </div>

              {/* Cover Letter Upload Section */}
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                  <h5>Cover Letter</h5>
                  <div className="upload_resume ">
                    {coverLetter ? (
                      <div className="uploaded_file_details d-flex justify-content-between align-items-baseline">
                        <div>
                          <h6 className='file_name m-0'>{coverLetter.fileName}</h6>
                          <p><small>Uploaded on Jan 07 2025</small></p>
                        </div>
                        <div className='d-flex position-relative'>
                          <i className="fa-solid fa-download me-3" onClick={handleCoverLetterDownload}></i>
                          <i className="fa-solid fa-trash" onClick={handleRemoveCoverLetter}></i>
                        </div>
                      </div>
                    ) : (
                      <div className='d-flex flex-column align-items-center justify-content-center'>
                        <input type="file" id='upload_cover_input' onChange={handleCoverLetterUpload} />
                        <label htmlFor="upload_cover_input">Upload Cover Letter</label>
                        <p className='m-0'><small>Supported Formats: doc, docx, pdf, upto 2 MB</small></p>
                      </div>
                    )}
                    {coverLetterError && <p className="text-danger">{coverLetterError}</p>}
                  </div>
                </div>
              </div>

               {/* Skills Section */}     
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <h5 className='m-0 me-3'>Key Skills </h5>
                    <Link data-bs-toggle="modal" data-bs-target="#skillModal"><i className="fa-solid fa-pencil"></i></Link>
                  </div>
                  <div className="mt-4 job_skills">
                    <ul className='d-flex flex-wrap p-0'>
                      <li className='rounded-pill border px-3 py-1 me-2 mb-2'>React Js</li>
                      <li className='rounded-pill border px-3 py-1 me-2 mb-2'>Html</li>
                      <li className='rounded-pill border px-3 py-1 me-2 mb-2'>Javascript</li>
                      <li className='rounded-pill border px-3 py-1 me-2 mb-2'>Wordpress</li>
                    </ul>
                  </div>
                </div>
              </div>


              <div className="modal fade skillModal" id="skillModal" tabIndex="-1" aria-labelledby="skillModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content p-3 p-sm-4">
                  <div className="modal-header border-0">
                    <h1 className="modal-title fs-5" id="skillModalLabel">Key Skills</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body ">
                    <form action="" className=''>
                      <div className='mb-4'>
                        <label htmlFor="">Skills</label>

                      {skills && skills.length >=1 && (
                        <div className="all_added_skills py-2">
                        <ul className="p-0 d-flex flex-wrap m-0">
                          {skills.map((skill, index) => (
                            <li key={index} className="rounded-pill border me-2 mb-2 py-1 ps-3 pe-4 position-relative">
                              {skill}
                              <i
                                className="fa-solid fa-xmark "
                                onClick={() => removeSkill(index)} 
                              />
                            </li>
                          ))}
                        </ul>
                        </div>
                      )
                      }  

                        <input type="text" placeholder='Add skills' className='add_Skill_input form-control' 
                           value={input}
                           onChange={(e) => setInput(e.target.value)}
                           onKeyPress={handleKeyPress}
                        
                        />
                      </div>
                     
                    </form>
                
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary rounded-pill">Save</button>
                  </div>
                </div>
              </div>
            </div>


              {/* Employment Section */}
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                   <h5>Employment</h5>
                   <Link className="text-green">Add employment</Link>
                 </div>

                 <div className="mt-4 educational_details">
                    <div>
                      <div className="d-flex align-items-center">
                       <h6 className='m-0 '>Front End Developer  <Link data-bs-toggle="modal" data-bs-target="#employModal" > <i className="fa-solid fa-pencil ms-2"></i></Link></h6> 
                      </div>
                      <h6>XYZ Company</h6>
                      <p className='m-0'><small>Full Time | Jan 2024 - Present </small></p>
                    </div>
                 </div>
                </div>
              </div>

              <div className="modal fade employModal" id="employModal" tabIndex="-1" aria-labelledby="employModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content p-3 p-sm-4">
                  <div className="modal-header border-0 p-0">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body ">
                    <div className="d-flex justify-content-between">
                    <h1 className="modal-title fs-5" id="employModalLabel">Employment</h1>
                    <Link className='text-green'>Delete</Link>
                    </div>
                    <form action="" className="mt-3">
                      <div className="mb-4">
                        <label htmlFor="">Is this your current employment?</label>
                        <div className="d-flex mt-3">
                          <div className="form-check me-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="RadioYesNo"
                              id="RadioYes"
                              value="yes"
                              checked={isCurrentEmployment}
                              onChange={handleRadioEmpChange}
                            />
                            <label className="form-check-label" htmlFor="RadioYes">
                              Yes
                            </label>
                          </div>
                          <div className="form-check locationRadio">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="RadioYesNo"
                              id="RadioNo"
                              value="no"
                              checked={!isCurrentEmployment}
                              onChange={handleRadioEmpChange}
                            />
                            <label className="form-check-label" htmlFor="RadioNo">
                              No
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="">Employment Type</label>
                        <select className="form-select" aria-label="Default select example">
                          <option value="1">Full Time</option>
                          <option value="2">Part Time</option>
                          <option value="3">Fixed</option>
                          <option value="4">Hourly</option>
                        </select>
                      </div>

                      <div className="row mt-4">
                        <label htmlFor="">Total experience</label>
                        <div className="col-md-6 mb-2 mb-md-0">
                          <input type="text" className="form-control" placeholder="Enter Years" maxLength={2} />
                        </div>
                        <div className="col-md-6 mb-2 mb-md-0">
                          <input type="text" className="form-control" placeholder="Enter Months" maxLength={2} />
                        </div>
                      </div>

                      {/* Change label dynamically based on isCurrentEmployment state */}
                      <div className="mt-4">
                        <label htmlFor="">{isCurrentEmployment ? 'Current company name' : 'Previous company name'}</label>
                        <div className="col-12">
                          <input
                            type="text"
                            className="form-control"
                            placeholder='XYZ Company'
                          
                          />
                        </div>
                      </div>

                      {/* Change label dynamically based on isCurrentEmployment state */}
                      <div className="mt-4">
                        <label htmlFor="">{isCurrentEmployment ? 'Current job title' : 'Previous job title'}</label>
                        <div className="col-12">
                          <input
                            type="text"
                            className="form-control"
                          placeholder='XYZ Company'
                          />
                        </div>
                      </div>

                      <div className="row mt-4">
                        <label htmlFor="">Joining Date</label>
                        <div className="col-md-6 mb-2 mb-md-0">
                          <input type="text" className="form-control" placeholder="Year Eg. 2025" maxLength={4} />
                        </div>
                        <div className="col-md-6 mb-2 mb-md-0">
                          <input type="text" className="form-control" placeholder="Month Eg. Jan" maxLength={8} />
                        </div>
                      </div>

                      {/* Conditionally render the worked_till section if "No" is selected */}
                      {!isCurrentEmployment && (
                        <div className="row mt-4 worked_till">
                          <label htmlFor="">Worked Till</label>
                          <div className="col-md-6 mb-2 mb-md-0">
                            <input type="text" className="form-control" placeholder="Year Eg. 2025" maxLength={4} />
                          </div>
                          <div className="col-md-6 mb-2 mb-md-0">
                            <input type="text" className="form-control" placeholder="Month Eg. Jan" maxLength={8} />
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <label htmlFor="">Current Salary</label>
                        <div className="row">
                          <div className="col-4 col-md-3 col-lg-2">
                            <select className="form-select" aria-label="Default select example">
                              <option value="rupees">kr</option>
                              <option value="dollar">$</option>
                            </select>
                          </div>
                          <div className="col-8 col-md-9 col-lg-10">
                            <input type="text" className="form-control" placeholder="Eg. 4,50,000" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label htmlFor="">Job Profile</label>
                        <div className="col-12">
                          <textarea name="" className="form-control"></textarea>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label htmlFor="">Notice Period</label>
                        <select className="form-select" aria-label="Default select example">
                          <option value="15 Days or less">15 Days or less</option>
                          <option value="1 Month">1 Month</option>
                          <option value="2 Months">2 Months</option>
                          <option value="3 Months">3 Months</option>
                          <option value="More than 3 months">More than 3 months</option>
                          <option value="Serving notice period">Serving notice period</option>
                        </select>
                      </div>
                    </form>
                
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary rounded-pill">Save</button>
                  </div>
                </div>
              </div>
            </div>
              
              {/* Education Section */}
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                   <h5>Education</h5>
                   <Link className="text-green" data-bs-toggle="modal" data-bs-target="#AddEducation">Add education</Link>
                 </div>

                 <div className="mt-4 employment_details">
                    <div className='mb-3'>
                      <div className="d-flex align-items-center">
                       <h6 className='m-0 '>BCA Computers  <Link data-bs-toggle="modal" data-bs-target="#EditEducation"> <i className="fa-solid fa-pencil ms-2"></i></Link></h6> 
                      </div>
                      <h6 className='m-0'>XYZ University</h6>
                      <p className='m-0'><small>Full Time | 2021-2024 </small></p>
                    </div>

                    <div>
                      <div className="d-flex align-items-center">
                       <h6 className='m-0 '>Class XII  <Link> <i className="fa-solid fa-pencil ms-2"></i></Link></h6> 
                      </div>
                      <h6 className='m-0'>CBSE</h6>
                      <p className='m-0'><small>Full Time | 2021 </small></p>
                    </div>

                 </div>
                </div>
              </div>

              <div className="modal AddEducationModal" id="AddEducation" tabIndex="-1" aria-labelledby="AddEducationLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content p-3 p-sm-4">
                  <div className="modal-header border-0 pb-0">
                    <h1 className="modal-title fs-5" id="AddEducationLabel">Education</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body ">
                    <h6 className='text-muted'>Details of course,university and more, help recruiter to identify your background</h6>
                    <form action="" className=''>
                      <div className='mt-4 mb-4'>
                        <label htmlFor="">Education</label>
                        <select className="form-select" aria-label="Default select example">
                          <option selected>Select education</option>
                          <option value="1">Doctrate/PHP</option>
                          <option value="2">Masters/Post Graduation</option>
                          <option value="3">Graduation/Diploma</option>
                          <option value="4">12th</option>
                          <option value="5">10th</option>
                        </select>
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">University/Institute</label>
                        <input type="text" className='form-control' placeholder='Enter institute name' />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Course</label>
                        <input type="text" className='form-control' placeholder='Enter course name' />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Specialization</label>
                        <input type="text" className='form-control' placeholder='Enter your specialization' />
                      </div>
                      <div className='mb-4'>
                      <label htmlFor="">Course Type</label>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="courseType" id="fullTime"  />
                        <label class="form-check-label" for="fullTime">
                          Full Time
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="courseType" id="partTime" />
                        <label class="form-check-label" for="partTime">
                          Part Time
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="courseType" id="corespondence" />
                        <label class="form-check-label" for="corespondence">
                         Correspondence
                        </label>
                      </div>
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Course Duration</label>
                       <div className="row flex-column flex-md-row align-items-center">
                        <div className="col">
                          <input type="text" className='form-control' placeholder='Starting Year' />
                        </div>
                        <div className="col-1 text-center"> <span>To</span></div>
                        <div className="col">
                          <input type="text" className='form-control' placeholder='Ending Year' />
                        </div>
                       </div>
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Grading System</label>
                        <select className="form-select" aria-label="Default select example">
                          <option value="Percentage">% Marks of 100 Maximum</option>
                          <option value="Cgpa">CGPA</option>
                          <option value="Pass">Course Require a Pass</option>
                        </select>
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Marks</label>
                        <input type="text" className='form-control' maxLength={3} placeholder='Enter marks' />
                      </div>
                     
                    </form>
                
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary rounded-pill">Save</button>
                  </div>
                </div>
              </div>
             </div>       

              <div className="modal EditEducationModal" id="EditEducation" tabIndex="-1" aria-labelledby="EditEducationLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content p-3 p-sm-4">
                  <div className="modal-header border-0 pb-0">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body ">
                    <div className="d-flex justify-content-between">
                     <h1 className="modal-title fs-5 m-0" id="EditEducationLabel">Education</h1>
                     <Link className='text-green'>Delete</Link>
                    </div>
                    <h6 className='text-muted'>Details of course,university and more, help recruiter to identify your background</h6>
                    <form action="" className=''>
                      <div className='mt-4 mb-4'>
                        <label htmlFor="">Education</label>
                        <select className="form-select" aria-label="Default select example">
                          <option selected>Select education</option>
                          <option value="1">Doctrate/PHP</option>
                          <option value="2">Masters/Post Graduation</option>
                          <option value="3">Graduation/Diploma</option>
                          <option value="4">12th</option>
                          <option value="5">10th</option>
                        </select>
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">University/Institute</label>
                        <input type="text" className='form-control' placeholder='Enter institute name' />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Course</label>
                        <input type="text" className='form-control' placeholder='Enter course name' />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Specialization</label>
                        <input type="text" className='form-control' placeholder='Enter your specialization' />
                      </div>
                      <div className='mb-4'>
                      <label htmlFor="">Course Type</label>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="courseType" id="fullTime"  />
                        <label class="form-check-label" for="fullTime">
                          Full Time
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="courseType" id="partTime" />
                        <label class="form-check-label" for="partTime">
                          Part Time
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="courseType" id="corespondence" />
                        <label class="form-check-label" for="corespondence">
                         Correspondence
                        </label>
                      </div>
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Course Duration</label>
                       <div className="row flex-column flex-md-row align-items-center">
                        <div className="col">
                          <input type="text" className='form-control' placeholder='Starting Year' />
                        </div>
                        <div className="col-1 text-center"> <span>To</span></div>
                        <div className="col">
                          <input type="text" className='form-control' placeholder='Ending Year' />
                        </div>
                       </div>
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Grading System</label>
                        <select className="form-select" aria-label="Default select example">
                          <option value="Percentage">% Marks of 100 Maximum</option>
                          <option value="Cgpa">CGPA</option>
                          <option value="Pass">Course Require a Pass</option>
                        </select>
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Marks</label>
                        <input type="text" className='form-control' maxLength={3} placeholder='Enter marks' />
                      </div>
                     
                    </form>
                
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary rounded-pill">Save</button>
                  </div>
                </div>
              </div>
             </div>     


              {/* Online Profile Section */}
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <div>
                  <h5 className='m-0'>Online Profile</h5>
                  <p><small>Add link to online professional profiles (e.g. LinkedIn, etc.)</small></p>
                  </div>
                   <Link className="text-green" data-bs-toggle="modal" data-bs-target="#ProfileModal" >Add </Link>
                 </div>

                 <div className="mt-4 online_profile">
                    <div className='mb-3'>
                      <div className="d-flex align-items-center">
                       <h6 className='m-0 '>Instagram <Link data-bs-toggle="modal" data-bs-target="#EditProfileModal"> <i className="fa-solid fa-pencil ms-2"></i></Link></h6> 
                      </div>
                      <p className='m-0 text-green'>https://www.instagram.com/_user1099?igsh=d3dVtM200dGJ6</p>
                    </div>
                    <div className='mb-3'>
                      <div className="d-flex align-items-center">
                       <h6 className='m-0 '>Linkedin <Link> <i className="fa-solid fa-pencil ms-2"></i></Link></h6> 
                      </div>
                      <p className='m-0 text-green'>https://www.linkedin.com/_user1099?igsh=d3dVtM200dGJ6</p>
                    </div>

                 </div>
                </div>
              </div>

              <div className="modal ProfileModal" id="ProfileModal" tabIndex="-1" aria-labelledby="ProfileModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content p-3 p-sm-4">
                <div className="modal-header border-0 pb-0">
                    <h1 className="modal-title fs-5" id="AddEducationLabel">Online Profiles</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body ">
                    <h6 className='text-muted'>Add link to online professional profiles (e.g. LinkedIn, etc.)</h6>
                    <form action="" className=''>
                    
                      <div className=' mt-4 mb-4'>
                        <label htmlFor="">Social profile</label>
                        <input type="text" className='form-control' placeholder='Enter Social Profile Name' />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">URL</label>
                        <input type="url" className='form-control' placeholder='Enter Social Profile URL' />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Description</label>
                       <textarea name="" className='form-control' rows={3} placeholder='Type here...' id=""></textarea>
                      </div>
                   
                     
                    </form>
                
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary rounded-pill">Save</button>
                  </div>
                </div>
              </div>
             </div>

              <div className="modal EditProfileModal" id="EditProfileModal" tabIndex="-1" aria-labelledby="EditProfileModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content p-3 p-sm-4">
                  <div className="modal-header border-0 pb-0">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body ">
                    <div className="d-flex justify-content-between">
                     <h1 className="modal-title fs-5 m-0" id="EditProfileModalLabel">Online Profiles</h1>
                     <Link className='text-green'>Delete</Link>
                    </div>
                    <h6 className='text-muted'>Add link to online professional profiles (e.g. LinkedIn, etc.)</h6>
                    <form action="" className=''>
                    
                      <div className=' mt-4 mb-4'>
                        <label htmlFor="">Social profile</label>
                        <input type="text" className='form-control' placeholder='Enter Social Profile Name' />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">URL</label>
                        <input type="url" className='form-control' placeholder='Enter Social Profile URL' />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Description</label>
                       <textarea name="" className='form-control' rows={3} placeholder='Type here...' id=""></textarea>
                      </div>
                   
                     
                    </form>
                
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary rounded-pill">Save</button>
                  </div>
                </div>
              </div>
             </div>

               {/* Personal details Section */}     
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                 <div className="d-flex align-items-center">
                    <h5 className='m-0 '>Personal Details  
                      <Link data-bs-toggle="modal" data-bs-target="#PersonalDetailModal" > <i className="fa-solid fa-pencil ms-2"></i></Link>
                      </h5> 
                  </div>

                 <div className="mt-4 personal_details">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="">Personal</label>
                        <p>Male, Married</p>
                      </div>
                     
                      <div className="col-md-6">
                        <label htmlFor="">Date of birth</label>
                        <p>01 Jan 2002</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">Category</label>
                        <p>General</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">Address</label>
                        <p>#233 main road chandigarh, chandigarh</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">Zipcode</label>
                        <p>123456</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">City</label>
                        <p>Chandigarh</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">State</label>
                        <p>Punjab</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">Country</label>
                        <p>India</p>
                      </div>
                    </div>
                 </div>
                </div>
              </div>
              <div className="modal PersonalDetailModal " id="PersonalDetailModal" tabIndex="-1" aria-labelledby="PersonalDetailModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content p-3 p-sm-4">
                  <div className="modal-header border-0 pb-0">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body ">
                    <div className="">
                     <h1 className="modal-title fs-5 m-0" id="PersonalDetailModalLabel">Personal details</h1>
                     <h6 className='text-muted'>This informations help recuiter to know you better</h6>
                    </div>
                    <form action="" className=''>
                    <div className='mt-4 mb-4'>
                        <label htmlFor="">Gender</label>
                        <select className="form-select" aria-label="Default select example">
                          <option selected>Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Transgender">Transgender</option>
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="">Maritial Status</label>
                        <select className="form-select" aria-label="Default select example">
                          <option selected>Select status</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Widowed">Widowed</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Seperated">Seperated</option>
                          <option value="Other">Other</option>
                        </select>
                    </div>
                      <div className='mb-4'>
                        <label htmlFor="">Date of birth</label>
                       <div className="row flex-column flex-md-row align-items-center">
                        <div className="col-md-4 col-12 mb-2">
                          <input type="text" className='form-control' maxLength={2} placeholder='Enter Date' />
                        </div>
                        <div className="col-md-4 col-12 mb-2">
                          <input type="text" className='form-control' maxLength={2} placeholder='Enter Month' />
                        </div>
                        <div className="col-md-4 col-12 mb-2">
                          <input type="text" className='form-control' maxLength={4} placeholder='Enter Year' />
                        </div>
                       </div>
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Category</label>
                        <select className="form-select" aria-label="Default select example">
                          <option value="General">General</option>
                          <option value="SC">SC</option>
                          <option value="ST">ST</option>
                          <option value="OBC">OBC</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                  <div className='abled_section'>
                    <div className="mb-4">
                      <label htmlFor="">Are you differently abled?</label>
                      <div className="d-flex mt-2">
                        <div className="form-check me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="AbledYesNo"
                            id="AbledYes"
                            value="Yes"
                            onChange={(e) => setIsDifferentlyAbled(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="AbledYes">
                            Yes
                          </label>
                        </div>
                        <div className="form-check locationRadio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="AbledYesNo"
                            id="AbledNo"
                            value="No"
                            onChange={(e) => setIsDifferentlyAbled(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="AbledNo">
                            No
                          </label>
                        </div>
                      </div>
                    </div>

                    {isDifferentlyAbled === "Yes" && (
                      <>
                        <div className="mb-4 abled_type">
                          <label htmlFor="">Type</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={abledType}
                            onChange={(e) => setAbledType(e.target.value)}
                          >
                            <option value="Blindness">Blindness</option>
                            <option value="Low Vision">Low Vision</option>
                            <option value="Hearing Impairment">Hearing Impairment</option>
                            <option value="Speech and Language Disability">Speech and Language Disability</option>
                            <option value="Dwarfism">Dwarfism</option>
                            <option value="Acid Attack Victim">Acid Attack Victim</option>
                            <option value="Mental Illness">Mental Illness</option>
                            <option value="Multiple Disabilities">Multiple Disabilities</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>

                        {abledType === "Others" && (
                          <div className="mb-4 describe_abled">
                            <label htmlFor="">Describe</label>
                            <textarea
                              name=""
                              id=""
                              placeholder="Specify about your differently abled condition"
                              className="form-control"
                            ></textarea>
                          </div>
                        )}

                        <div className="mb-4 assistance">
                          <label htmlFor="">Do you need assistance at your workplace?</label>
                          <textarea
                            name=""
                            id=""
                            rows={3}
                            placeholder="Type here (ex: wheelchair)"
                            className="form-control"
                          ></textarea>
                        </div>
                      </>
                    )}
                  </div>

                    <div className="mb-4">
                      <label htmlFor="">Permanent Address</label>
                       <input type="text" className='form-control' placeholder='Enter your permanent address' />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="">Hometown</label>
                       <input type="text" className='form-control' placeholder='Enter your hometown' />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="">Pincode</label>
                       <input type="text" className='form-control' maxLength={6} placeholder='Enter your pincode' />
                    </div>

                  <div className="language_section mb-4">
                    <label htmlFor="">Language Proficiency</label>

                    { languages.length === 0 ? (
                      <p className='mt-2 fw-semibold' style={{ cursor: "pointer", color: "green" }}  
                       onClick={addLanguageRow} >
                       Add another language 
                      </p>
                     ) : (languages.map((row, index) => (
                          <div className="row mt-3" key={index}>
                            <div className="col-md-6 mb-2 mb-md-0">
                              <label htmlFor="">Language</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter language"
                                value={row.language}
                                onChange={(e) => handleLanguageChange(index, e.target.value)}
                              />
                            </div>
                            <div className="col-md-6 mb-2 mb-md-0">
                              <label htmlFor="">Proficiency</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                value={row.proficiency}
                                onChange={(e) => handleProficiencyChange(index, e.target.value)}
                              >
                                <option value="Beginner">Beginner</option>
                                <option value="Proficient">Proficient</option>
                                <option value="Expert">Expert</option>
                              </select>
                            </div>
                            <div className="d-flex mt-1 fw-semibold justify-content-between text-green">
                              <span
                                style={{ cursor: "pointer", color: "green" }}
                                onClick={addLanguageRow}
                              >  Add another language
                              </span>
                              <span style={{ cursor: "pointer" }}
                                onClick={() => deleteLanguageRow(index)}
                              > Delete
                              </span>
                              
                            </div>
                          </div>
                         ))
                       )
                     }
                  </div>
                     
                    </form>
                
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary rounded-pill">Save</button>
                  </div>
                </div>
              </div>
             </div>

               {/* Certification Section */}     
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                   <h5>Certification</h5>
                   <Link className="text-green" data-bs-toggle="modal" data-bs-target="#CertificateModal">Add </Link>
                 </div>

                 <div className="mt-4 certification_details">
                   <p>Add details of certifications you have completed</p>
                 </div>
                </div>
              </div>

              <div className="modal CertificateModal" id="CertificateModal" tabIndex="-1" aria-labelledby="CertificateModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content p-3 p-sm-4">
                <div className="modal-header border-0 pb-0">
                    <h1 className="modal-title fs-5" >Certifications</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body ">
                    <h6 className='text-muted'>Add details of Certifications you have achieved/completed</h6>
                    <form action="" className=''>
                    
                      <div className=' mt-4 mb-4'>
                        <label htmlFor="">Certification Name</label>
                        <input type="text" className='form-control' placeholder='Enter your certification name' />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Certification URL</label>
                        <input type="url" className='form-control' placeholder='Enter your certification url' />
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Certification validity</label>
                        <div className="row align-items-center">
                          <div className="col">
                            <div className="row">
                              <div className="col-lg-6 mb-2">
                                <input type="text" className='form-control' placeholder='Enter Start month' />
                              </div>
                              <div className="col-lg-6 mb-2">
                                <input type="text" className='form-control' placeholder='Enter Start Year' />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-1 py-2 py-lg-0 text-center">
                            <span>To</span>
                          </div>
                          <div className="col">
                            <div className="row">
                              <div className="col-lg-6 mb-2">
                                <input type="text" className='form-control' placeholder='Enter End month' />
                              </div>
                              <div className="col-lg-6 mb-2">
                                <input type="text" className='form-control' placeholder='Enter End Year' />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="d-flex align-items-center text-muted">
                          <input type="checkbox" className='' name="" id="" />
                          <span className='ms-2 '>This certificate does not expire</span>
                        </div>
                      </div>
                   
                     
                    </form>
                
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary rounded-pill">Save</button>
                  </div>
                </div>
              </div>
             </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyAccount;
