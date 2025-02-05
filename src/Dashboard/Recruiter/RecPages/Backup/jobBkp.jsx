import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import DashNav from '../Dashnav'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateJob = () => {

    const [benefits, setBenefits] = useState([]); 
    const [benefitInput, setBenefitInput] = useState(""); 
  
    // Add a new benefit
    const handleAddBenefit = () => {
      if (benefitInput.trim() !== "") {
        setBenefits([...benefits, benefitInput]);
        setBenefitInput(""); 
      }
    };
  
    // Remove a benefit
    const handleRemoveBenefit = (index) => {
        const updatedBenefits = [...benefits]; 
        updatedBenefits.splice(index, 1); 
        setBenefits(updatedBenefits); 
      };


      const modules = {
        toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image','video'],
        ['clean']
        ],
    };
    
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image','video',
    ];
      
  return (
    <>
     <div className="main_wrapper">
        <Sidebar  />

        <div className="main_content">
          <DashNav />
          <div className="container">
            <div className="col-lg-11 mx-auto">
            <h4 className=" py-2 mt-4">Post a job </h4>
                <div className="card border rounded-4  create_job_form">
                    <div className="card-body p-md-4">
                        <form action="">
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="">Job Title</label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="col-md-3 mb-4">
                                    <label htmlFor="">Job Category</label>
                                    <select className="form-select" aria-label="Default select example">
                                    <option value="1">Technology</option>
                                    <option value="2">Marketing</option>
                                    <option value="3">Finance</option>
                                    <option value="4">Education</option>
                                    <option value="5">Sales</option>
                                    <option value="6">Design</option>
                                    <option value="7">Human Resources</option>
                                    <option value="8">Hospitality</option>
                                    </select>
                                </div>
                                <div className="col-md-3 mb-4">
                                    <label htmlFor="">Sub Category</label>
                                    <select className="form-select" aria-label="Default select example">
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="d-flex align-items-start">
                                <h5 className='pb-4 me-4'>Salary</h5>
                                <div className="col-md-3">
                                        <select className="salary-select" aria-label="Default select example">
                                        <option value="1">USD</option>
                                        <option value="2">INR</option>
                                        </select>
                                        </div>
                                </div>
                                
                                <div className="col-md-4 mb-4">
                                    <label htmlFor="">Minimum Salary</label>
                                    <div className="input-group"><span className="input-group-text" id="min1">$</span>
                                    <input type="number" placeholder="Min" className="form-control" aria-describedby="min1" />
                                     </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <label htmlFor="">Maximum Salary</label>
                                    <div className="input-group"><span className="input-group-text" id="max1">$</span>
                                    <input type="number" placeholder="Max" className="form-control" aria-describedby="max1" />
                                     </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <label htmlFor="">Salary Type</label>
                                    <select className="form-select" aria-label="Default select example">
                                    <option value="1">Project Basis</option>
                                    <option value="2">Monthly</option>
                                    <option value="3">Hourly</option>
                                    <option value="4">Yearly</option>
                                    </select>
                                </div>

                                <h5 className='py-4'>Advance Information</h5>
                                <div className="col-md-4 mb-4">
                                    <label htmlFor="">Education</label>
                                    <select className="form-select" aria-label="Default select example">
                                    <option value="1">High School</option>
                                    <option value="2">Intermediate</option>
                                    <option value="3">Bachelor Degree</option>
                                    <option value="4">Master Degree</option>
                                    <option value="5">PHD</option>
                                    <option value="6">Any</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <label htmlFor="">Experience</label>
                                    <select className="form-select" aria-label="Default select example">
                                    <option value="1">Fresher</option>
                                    <option value="2">1 Year</option>
                                    <option value="3">2 Year</option>
                                    <option value="4">3+ Years</option>
                                    <option value="5">5+ Years</option>
                                    <option value="6">8+ Years</option>
                                    <option value="7">10+ Years</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <label htmlFor="">Job Type</label>
                                    <select className="form-select" aria-label="Default select example">
                                    <option value="1">Full Time</option>
                                    <option value="2">Part Time</option>
                                    <option value="3">Contractual</option>
                                    <option value="4">Intern</option>
                                    <option value="5">Freelance</option>
                                    <option value="5">Remote</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <label htmlFor="">Total Vacancies</label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="">Deadline Expired</label>
                                    <input type="date" className='form-control' />
                                </div>

                                <h5 className='py-4'>Location</h5>
                                <div className="col-md-4 mb-4">
                                    <label htmlFor="">City</label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="col-md-4 mb-4">
                                    <label htmlFor="">State</label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="col-md-4 mb-4">
                                    <label htmlFor="">Zipcode</label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="col-12 mb-4">
                                    <label htmlFor="">Address</label>
                                    <input type="text" className='form-control' />
                                </div>

                                <h5 className='py-4'>Additional Benefits</h5>
                                <div className="d-flex mb-4 flex-wrap">
                                    {benefits.map((benefit, index) => (
                                    <div key={index} className="benefits-tag me-2">
                                        <label>
                                        <span>{benefit}</span>
                                        <i
                                            className="fa-solid fa-xmark ms-2"
                                            onClick={() => handleRemoveBenefit(index)}
                                        ></i>
                                        </label>
                                    </div>
                                    ))}
                                </div>

                                <div className="row mb-4">
                                    <div className="col-10">
                                    <input
                                        type="text"
                                        className="form-control benefit_head"
                                        value={benefitInput}
                                        onChange={(e) => setBenefitInput(e.target.value)} // Update input state
                                        placeholder="Enter a benefit"
                                    />
                                    </div>
                                    <div className="col-2">
                                    <button type='button' className="btn btn-primary" onClick={handleAddBenefit}>
                                        Create +
                                    </button>
                                    </div>
                                </div>
                                <h5 className='py-4'>Skills</h5>
                                <div className="col-12 mb-4">
                                    <label htmlFor="">Skills</label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="col-12 mb-4">
                                    <label htmlFor="">Job Description</label>
                                    <ReactQuill theme="snow"  modules={modules} formats={formats}  />
                                </div>

                                <h5 className='py-4'>Contact Details</h5>
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="">Email</label>
                                    <input type="text" className='form-control' placeholder='example@123.com' />
                                </div>
                               
                                                        
                                <div className="col-12 text-center ">
                                <button className='btn btn-success w-auto rounded-0'>Publish</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateJob