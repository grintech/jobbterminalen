import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <>
        <div className="page_not_found d-flex align-items-center justify-content-center">
         <div className="container section d-flex text-center flex-column align-items-center justify-content-center">
           <h1 className="error mb-4">404</h1>
           <div className="message mb-4">Oops! The page you are looking for is not found. </div>
           <Link className="btn btn-register" to='/'>Back to home</Link>
         </div>
        </div>
    </>
  )
}

export default PageNotFound
