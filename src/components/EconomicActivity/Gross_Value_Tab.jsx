import React from 'react'
import '../../assets/css/Gross.css'
import {HashLink as Link} from 'react-router-hash-link';
function Consumer_Price_Index() {
  return (
    <div>
        <div className='grosscontainer'>
       
       <div className='grossflexer'>
         <h1 className='gross gross1'><b>Gross Value Added By Economic Activity Constant Price </b></h1>
        <Link smooth className='link' to="#gvasection">
        <img className='grossarrowimg' src="https://www.pngmart.com/files/3/Up-Arrow-PNG-Transparent-Image.png"/>
        </Link>
        </div> 
        </div>
       
    </div>
  )
}

export default Consumer_Price_Index