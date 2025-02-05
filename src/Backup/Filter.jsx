import React from 'react'

const Filter = () => {
  return (
   <>
     <div className="card_sticky">
        <div className="card all_cat_filters">
    <div className="card-body">
        <h5>All Filters</h5>
        <hr />
        <div>
        <div className="accordion border-0" id="accordionExample1">
            <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
                >
                <b>Job Type</b>
                </button>
            </h2>
            <div
                id="collapseOne"
                className="accordion-collapse collapse show "
                data-bs-parent="#accordionExample1"
            >
                <div className="accordion-body">
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="check1" />
                <label className="form-check-label" htmlFor="check1">
                    Work from office
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="check2" />
                <label className="form-check-label" htmlFor="check2">
                    Hybrid
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="check3" />
                <label className="form-check-label" htmlFor="check3">
                    Remote
                </label>
                </div>
                {/* <div className="text-primary pt-2"><small className="fw-bold mt-3">View more</small></div> */}
                </div>
            </div>
            </div>
            
        </div>

        <div className="accordion border-0" id="accordionExample2">
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
                >
                <b>Salary</b>
                </button>
            </h2>
            <div
                id="collapseTwo"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample2"
            >
                <div className="accordion-body">
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="Salarycheck1" />
                <label className="form-check-label" htmlFor="Salarycheck1">
                    0-3 Lakhs
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="Salarycheck2" />
                <label className="form-check-label" htmlFor="Salarycheck2">
                    3-6 Lakhs
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="Salarycheck3" />
                <label className="form-check-label" htmlFor="Salarycheck3">
                    6-9 Lakhs
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="Salarycheck4" />
                <label className="form-check-label" htmlFor="Salarycheck4">
                    9-12 Lakhs
                </label>
                </div>
                <div className="text-primary pt-2"><small className="fw-bold mt-3">View more</small></div>
                </div>
            </div>
            </div>
        </div>
        <div className="accordion border-0" id="accordionExample3">
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="true"
                aria-controls="collapseThree"
                >
                <b>Experience</b>
                </button>
            </h2>
            <div
                id="collapseThree"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample3"
            >
                <div className="accordion-body">
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="exp1" />
                <label className="form-check-label" htmlFor="exp1">
                    0-1 Years
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="exp2" />
                <label className="form-check-label" htmlFor="exp2">
                    1-2 Years
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="exp3" />
                <label className="form-check-label" htmlFor="exp3">
                3-5 Years
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="Salarycheck4" />
                <label className="form-check-label" htmlFor="Salarycheck4">
                    More than 5 Years
                </label>
                </div>
                <div className="text-primary pt-2"><small className="fw-bold mt-3">View more</small></div>
                </div>
            </div>
            </div>
        </div>
        <div className="accordion border-0" id="accordionExample4">
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="true"
                aria-controls="collapseFour"
                >
                <b>Location</b>
                </button>
            </h2>
            <div
                id="collapseFour"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample4"
            >
                <div className="accordion-body">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="location1" />
                    <label className="form-check-label" htmlFor="location1">
                    Bengaluru
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="location2" />
                    <label className="form-check-label" htmlFor="location2">
                    Delhi/NCR
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="location3" />
                    <label className="form-check-label" htmlFor="location3">
                    Chennai
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="location4" />
                    <label className="form-check-label" htmlFor="location4">
                    Mumbai
                    </label>
                </div>
                <div className="text-primary pt-2"><small className="fw-bold mt-3">View more</small></div>
                </div>
            </div>
            </div>
        </div>
        <div className="accordion border-0" id="accordionExample5">
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
                >
                <b>Company Type</b>
                </button>
            </h2>
            <div
                id="collapseFive"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample5"
            >
                <div className="accordion-body">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="com_type1" />
                    <label className="form-check-label" htmlFor="com_type1">
                    Corporate
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="com_type2" />
                    <label className="form-check-label" htmlFor="com_type2">
                    Foreign MNC
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="com_type3" />
                    <label className="form-check-label" htmlFor="com_type3">
                    Indian MNC
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="com_type4" />
                    <label className="form-check-label" htmlFor="com_type4">
                    Startup
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="com_type5" />
                    <label className="form-check-label" htmlFor="com_type5">
                    Others
                    </label>
                </div>
                <div className="text-primary pt-2"><small className="fw-bold mt-3">View more</small></div>
                </div>
            </div>
            </div>
        </div>
        <div className="accordion border-0" id="accordionExample6">
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="true"
                aria-controls="collapseSix"
                >
                <b>Industry</b>
                </button>
            </h2>
            <div
                id="collapseSix"
                className="accordion-collapse collapse show "
                data-bs-parent="#accordionExample6"
            >
                <div className="accordion-body">
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="industry1" />
                <label className="form-check-label" htmlFor="industry1">
                IT Services & Consultancy
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="industry2" />
                <label className="form-check-label" htmlFor="industry2">
                BPO / Call Centre
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="industry3" />
                <label className="form-check-label" htmlFor="industry3">
                Education / Training
                </label>
                </div>
                <div className="text-primary pt-2"><small className="fw-bold mt-3">View more</small></div>
                </div>
            </div>
            </div>
        </div>


        </div>
    </div>
        </div>
    </div>         
   </>
  )
}

export default Filter