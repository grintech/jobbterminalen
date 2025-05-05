import React from 'react'

const Maintenance = () => {
  return (
    <div className="maintainance vh-100">
        <div className="maintainance_wrapper vh-100  d-flex flex-column align-items-center justify-content-center">
        <img src="/images/foot_logo.png" style={{width:"200px"}} alt="logo" />
         <h1 className='mt-4 text-center'> Site Under Maintenance</h1>
         <p className='m-0 text-center'>We are currently performing scheduled maintenance. Please try again later !</p>
        </div>
    </div>
  )
}

export default Maintenance