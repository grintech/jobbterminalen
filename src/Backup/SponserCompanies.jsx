import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import recruitersData from '../API/recruiters.json';

const SponsorCompanies = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [likedCompanies, setLikedCompanies] = useState({}); // Track liked status for each recruiter

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const toggleLike = (id) => {
        setLikedCompanies((prev) => ({
            ...prev,
            [id]: !prev[id], 
        }));
    };

    const AllTypes = ['All', 'Software Development', 'Healthcare & Life Sciences', 'IT Services', 'Consulting', 'Startup'];

    // Ensure recruitersData is an object with a recruiters array
    const recruiters = recruitersData.recruiters || [];

    // Filter recruiters based on the active tab
    const filteredRecruiters = activeTab === 'All'
        ? recruiters.slice(0, 8)
        : recruiters.filter(recruiter => recruiter.company.type === activeTab);

    return (
        <>
            <div  className="sponsor_companies container py-5">
                <h4 className='text-center'>Sponsored Companies</h4>

                <ul className="d-flex justify-content-center flex-wrap p-0 mt-3 all_comp_tabs">
                    {AllTypes.map((tabName) => (
                        <li
                            key={tabName}
                            className={`btn ${activeTab === tabName ? 'active' : ''}`}
                            onClick={() => handleTabClick(tabName)}
                        >
                            {tabName}
                        </li>
                    ))}
                </ul>

                <div className="row justify-content-center mt-5">
                    {filteredRecruiters.map((elem) => (
                        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={elem.id}>
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <img src="/images/company3.gif" alt="company-logo" />
                                    <div className="py-3 my-3 job_desc">
                                        <h5 className="mb-2">{elem.company.name}</h5>
                                        <p className="m-0 d-flex align-items-center justify-content-center sml_text">
                                            <span className="border-end d-inline-flex align-items-center me-2 pe-2">
                                                <i className="fa-solid fa-star me-1"></i> 3.7
                                            </span>
                                            <span>3.3K+ reviews</span>
                                        </p>
                                    </div>
                                    <p className="main_desc">{elem.company.type} company based in {elem.company.headquarters}.</p>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Link to='/job-detail' className="btn btn-login mx-2">Apply Now</Link>
                                        <div
                                            className="save_post mx-2"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => toggleLike(elem.id)}
                                        >
                                            <i
                                             className={`fa-heart ${likedCompanies[elem.id] ? 'fa-solid' : 'fa-regular'}`}
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-center">
                    <Link to='/companies' className='btn btn-login px-4'>View all companies</Link>
                </div>
            </div>
        </>
    );
};

export default SponsorCompanies;
