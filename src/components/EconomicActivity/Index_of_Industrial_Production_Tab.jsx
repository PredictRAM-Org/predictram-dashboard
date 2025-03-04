import React from 'react'
import '../../assets/css/IOIP.css'
import {HashLink as Link} from 'react-router-hash-link';

function Consumer_Price_Index() {
  return (
    <div>
        <div className='ioipcontainer'>
       
       <div className='ioipflexer'>
         <h1 className='ioip ioip1'><b>Index of Industrial Production Indices IIP2011-2012</b></h1>
        <Link smooth className='link' to="#ioipsection">
        <img className='ioiparrowimg' src="https://www.pngmart.com/files/3/Up-Arrow-PNG-Transparent-Image.png"/>
        </Link>
        </div> 
        </div>
       
    </div>
  )
}

export default Consumer_Price_Index